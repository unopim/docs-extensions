/**
 * Documentation integrity tests.
 *
 * Run with `npm test`. Uses the Node built-in test runner - no new dependencies.
 *
 * These guard the failure modes that are easy to introduce when editing docs in
 * bulk: image references that point at nothing, image files nothing points at,
 * sidebar entries for pages that do not exist, and scripted edits that quietly
 * delete prose instead of the single line they were aimed at.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS = resolve(__dirname, '../docs');

/**
 * Image files that already existed unreferenced before these tests were written.
 *
 * This is deliberately an explicit list rather than a relaxed rule: a NEW orphan
 * fails the suite immediately, while the pre-existing ones stay visible here
 * instead of being silently tolerated. Delete an entry once you either wire the
 * image into a page or remove the file.
 */
const LEGACY_ORPHANS = new Set([
  'auto-sku-generator/assets/genral.png',
  'azure-integration/assets/verify/job-scheduler-history-details.webp',
  'azure-integration/assets/verify/job-scheduler-history.webp',
  'bigcommerce/assets/cred/unopim-cred.png',
  'cs-cart/assets/attribute-mapping/other-mapping.png',
  'cs-cart/assets/attribute-mapping/quick-export-settings.png',
  'cs-cart/assets/cred-page/cred-settings.png',
  'cs-cart/assets/export/category-filter.png',
  'magento2/assets/import/attribute-import-now.png',
  'magento2/assets/import/import-category.png',
  'maker-checker-workflow/assets/approval/approval-requests-section-1.png',
  'maker-checker-workflow/assets/workflow/user.png',
  'pdf-generator/assets/generate-pdf/productlist.webp',
  'supplier-data-portal/assets/admin/save-role.png',
  'woocommerce/assets/jobs/product-fields-import.png',
]);

/** Every project folder under docs/ that has a sidebar.json. */
function projects() {
  return readdirSync(DOCS, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.') && d.name !== 'public')
    .map((d) => d.name)
    .filter((slug) => existsSync(join(DOCS, slug, 'sidebar.json')));
}

function markdownFiles(slug) {
  return readdirSync(join(DOCS, slug))
    .filter((f) => f.endsWith('.md'))
    .map((f) => join(DOCS, slug, f));
}

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]
  );
}

/** Local (non-http, non-anchor) targets of markdown images and HTML <img src>. */
function imageRefs(file) {
  const src = readFileSync(file, 'utf-8');
  const refs = [];
  for (const m of src.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g)) refs.push(m[1]);
  for (const m of src.matchAll(/<img[^>]+src=["']([^"']+)["']/g)) refs.push(m[1]);
  return refs
    .filter((r) => !/^(https?:)?\/\//.test(r) && !r.startsWith('#') && !r.startsWith('data:'))
    // a filename with spaces is legitimately written %20-encoded in markdown
    .map((r) => {
      try {
        return decodeURIComponent(r);
      } catch {
        return r;
      }
    });
}

describe('documentation integrity', () => {
  const slugs = projects();

  test('there is at least one documented project', () => {
    assert.ok(slugs.length > 0, 'no docs/<project>/sidebar.json found');
  });

  for (const slug of slugs) {
    describe(slug, () => {
      const files = markdownFiles(slug);

      test('every image reference resolves to a file on disk', () => {
        const broken = [];
        for (const file of files) {
          for (const ref of imageRefs(file)) {
            const target = resolve(dirname(file), ref);
            if (!existsSync(target)) {
              broken.push(`${relative(DOCS, file)} -> ${ref}`);
            }
          }
        }
        assert.deepEqual(broken, [], `broken image references:\n  ${broken.join('\n  ')}`);
      });

      test('every image file on disk is referenced by a page', () => {
        const assetsDir = join(DOCS, slug, 'assets');
        if (!existsSync(assetsDir)) return;

        const referenced = new Set();
        for (const file of files) {
          for (const ref of imageRefs(file)) {
            referenced.add(resolve(dirname(file), ref));
          }
        }
        // placeholder.png is the shared seed image - referenced indirectly by copies
        const orphans = walk(assetsDir)
          .filter((f) => /\.(png|jpe?g|webp|gif|svg)$/i.test(f))
          .filter((f) => !f.endsWith('placeholder.png'))
          .filter((f) => !referenced.has(f))
          .map((f) => relative(DOCS, f))
          .filter((f) => !LEGACY_ORPHANS.has(f));

        assert.deepEqual(orphans, [], `image files nothing references:\n  ${orphans.join('\n  ')}`);
      });

      test('every sidebar link points at a page that exists', () => {
        const sidebar = JSON.parse(readFileSync(join(DOCS, slug, 'sidebar.json'), 'utf-8'));
        const missing = [];

        const check = (items) => {
          for (const item of items ?? []) {
            if (item.link) {
              // "/dam/installation" -> docs/dam/installation.md ; "/dam/" -> docs/dam/index.md
              const rel = item.link.replace(/^\//, '').replace(/\/$/, '/index');
              const target = join(DOCS, `${rel}.md`);
              if (!existsSync(target)) missing.push(`${item.text} -> ${item.link}`);
            }
            check(item.items);
          }
        };
        check(sidebar);

        assert.deepEqual(missing, [], `sidebar links with no page:\n  ${missing.join('\n  ')}`);
      });

      test('no page uses the shared placeholder directly', () => {
        // Each unshot image should have its own descriptive filename (seeded with a
        // copy of placeholder.png) so it can be replaced in place, and so two
        // unrelated screenshots are never the same path.
        const offenders = files
          .filter((f) => readFileSync(f, 'utf-8').includes('assets/placeholder.png'))
          .map((f) => relative(DOCS, f));

        assert.deepEqual(offenders, [], `pages referencing assets/placeholder.png directly:\n  ${offenders.join('\n  ')}`);
      });

      test('no image has empty alt text', () => {
        const bad = [];
        for (const file of files) {
          const src = readFileSync(file, 'utf-8');
          for (const m of src.matchAll(/!\[\s*\]\(([^)\s]+)\)/g)) {
            bad.push(`${relative(DOCS, file)} -> ${m[1]}`);
          }
        }
        assert.deepEqual(bad, [], `images with no alt text:\n  ${bad.join('\n  ')}`);
      });

      test('no page is more pictures than prose', () => {
        // A scripted bulk edit that over-matches can strip prose and leave a page
        // that is little more than a heading and some pictures. A short page is
        // fine (contact-support.md is legitimately two lines), and so is a
        // screenshot-per-step walkthrough; a page with literally more image lines
        // than content lines has almost certainly lost text.
        const thin = [];
        for (const file of files) {
          const lines = readFileSync(file, 'utf-8').split('\n');
          const images = lines.filter((l) => l.trimStart().startsWith('![')).length;
          const content = lines.filter((l) => l.trim() && !l.trimStart().startsWith('![')).length;
          if (images > 0 && content < images) {
            thin.push(`${relative(DOCS, file)} (${images} images vs ${content} content lines)`);
          }
        }
        assert.deepEqual(thin, [], `pages that look stripped of prose:\n  ${thin.join('\n  ')}`);
      });

      test('relative links stay relative (survive being nested under /<project>/)', () => {
        const absolute = [];
        for (const file of files) {
          const src = readFileSync(file, 'utf-8');
          for (const m of src.matchAll(/(?<!!)\[[^\]]*\]\((\/[^)\s]*)\)/g)) {
            absolute.push(`${relative(DOCS, file)} -> ${m[1]}`);
          }
        }
        assert.deepEqual(absolute, [], `absolute internal links (use ./page.md instead):\n  ${absolute.join('\n  ')}`);
      });
    });
  }
});

describe('build output', () => {
  const dist = resolve(__dirname, '../docs/.vitepress/dist');

  test('dist exists (run `npm run docs:build` first)', { skip: !existsSync(dist) }, () => {
    assert.ok(statSync(dist).isDirectory());
  });

  test('CNAME is published to the site root', { skip: !existsSync(dist) }, () => {
    assert.ok(existsSync(join(dist, 'CNAME')), 'docs/public/CNAME did not reach dist/');
  });

  test('every project renders an index page', { skip: !existsSync(dist) }, () => {
    const missing = projects().filter((slug) => !existsSync(join(dist, slug, 'index.html')));
    assert.deepEqual(missing, [], `projects with no built index.html: ${missing.join(', ')}`);
  });
});
