# Artisan Commands

DAM ships a set of Artisan commands for installation, maintenance, and migration. Run them from your UnoPim project root.

| Command | What it does |
|---|---|
| [`dam-package:install`](#dam-packageinstall) | Installs DAM — migrations, seed data, published assets |
| [`dam:demo-data`](#damdemo-data) | Seeds sample directories and assets |
| [`dam:backfill-thumbnails`](#dambackfill-thumbnails) | Generates thumbnails for existing PDFs and videos |
| [`dam:version`](#damversion) | Prints the installed DAM version |
| [`dam:update`](#damupdate) | Runs the post-upgrade migration with a backup |
| [`dam:update:restore`](#damupdaterestore) | Restores from a backup taken by `dam:update` |
| [`unopim:dam:move-asset-to-s3`](#unopimdammove-asset-to-s3) | Migrates local asset files to AWS S3 |
| [`dam:generate-scale-data`](#damgenerate-scale-data) | Seeds large-scale test data for performance testing |

---

## `dam-package:install`

Installs DAM. This is the command you run once, right after `composer require`.

```bash
php artisan dam-package:install
```

It walks through three steps:

1. **Migrations** — prompts *"run the migrations now?"* (default **yes**), then runs `migrate` and seeds the root directory structure.
2. **Publishing** — publishes DAM's config and default assets.
3. **Demo data** — prompts *"seed demo data?"* (default **no**). Say yes on a fresh evaluation install to get a populated library immediately; say no on production.

---

## `dam:demo-data`

Seeds a sample library — **Accessories**, **Audio and Video**, **Clothes**, and **Documents** directories, each with assets — so you can explore DAM without uploading real files first.

```bash
php artisan dam:demo-data
```

The command is idempotent: running it again will not duplicate the demo content.

| Option | Effect |
|---|---|
| `--force` | Wipes existing assets and re-seeds from scratch. |

> [!DANGER]
> `--force` deletes **all** assets under `assets/Root/` — not just the demo ones. On a library with real content this destroys your assets. The command asks for explicit confirmation (defaulting to **No**) before it proceeds. Never run it on production.

---

## `dam:backfill-thumbnails`

Generates real thumbnails — first page for PDFs, first frame for videos — for assets that were uploaded before thumbnail generation existed, or while `ffmpeg`/`poppler-utils` were missing.

```bash
php artisan dam:backfill-thumbnails
```

It finds every video and PDF asset with no stored thumbnail and dispatches a generation job for each.

The difference is easy to see in the gallery — generic file-type icons before, real first-page and first-frame previews after:

| Option | Effect |
|---|---|
| `--sync` | Generates thumbnails immediately, in-process, instead of queueing them. |

By default the work is **queued**, so a queue worker must be running for anything to happen:

```bash
php artisan queue:work
```

Use `--sync` if you have no queue worker available — but be aware it will block until every thumbnail is generated, which can take a long time on a large library.

> [!NOTE]
> Requires `ffmpeg` (video) and `poppler-utils` / `pdftoppm` (PDF) on the server. Without them, assets fall back to generic file-type icons.

---

## `dam:version`

Prints the installed DAM version.

```bash
php artisan dam:version
```

---

## `dam:update`

Runs the post-upgrade routine after you have replaced the DAM package code with a newer version. This is what [`upgrade-dam.sh`](./upgrading.md) calls at the end, and what you run manually if you upgraded via Composer.

```bash
php artisan dam:update
```

It performs the following, in order:

1. Counts the rows in every DAM table, to compare against later.
2. **Backs up** the DAM database tables and asset files to `storage/dam-backups/<timestamp>`.
3. Runs the new migrations.
4. Publishes updated assets.
5. Clears caches.
6. **Verifies** no rows were lost. If the row count regressed, it fails and prints the restore command.

| Option | Effect |
|---|---|
| `--dry-run` | Shows what would happen without changing anything. |
| `--skip-backup` | Skips the backup step. Asks for confirmation first. |

> [!WARNING]
> Do not use `--skip-backup` unless you have your own database and file backup. The backup is what makes the upgrade reversible.

---

## `dam:update:restore`

Restores DAM from a backup created by `dam:update`.

List the available backups:

```bash
php artisan dam:update:restore
```

Restore a specific one, using the folder name from `storage/dam-backups`:

```bash
php artisan dam:update:restore 2026-07-13-104500
```

It asks for confirmation, then overwrites the DAM tables and asset files with the backup's contents.

---

## `unopim:dam:move-asset-to-s3`

Migrates DAM asset files from local storage to AWS S3. Configure your S3 credentials first — see [DAM Asset Migration to AWS S3](./dam-asset-migration-to-aws-s3.md).

```bash
php artisan unopim:dam:move-asset-to-s3
```

The command is interactive and will ask you for:

| Prompt | Notes |
|---|---|
| **Email** and **password** | Your admin credentials, to authorise the migration. |
| *Migrate only new uploaded files?* | **Yes** moves only files not already on S3 — use this to resume or top up an earlier migration. **No** re-processes everything. |
| *Delete files from local once uploaded?* | **Yes** frees local disk space after each file transfers successfully. Say **no** on the first run so you keep a local copy until you have verified S3 is serving correctly. |

Files are transferred in batches of 1,000.

---

## `dam:generate-scale-data`

Seeds a large synthetic library so you can see how DAM behaves at scale — how the directory tree, the asset gallery, filters, and permission checks hold up with a million assets rather than the fifty on your dev box.

```bash
php artisan dam:generate-scale-data
```

> [!DANGER]
> This is a **development and testing tool**. It writes an enormous amount of data directly into your DAM tables. Never run it against production, or against any database whose contents you care about. Start with `--dry-run`.

### Options

| Option | Default | What it does |
|---|---|---|
| `--assets=` | `1000000` | How many assets to generate. |
| `--directories=` | `50000` | How many directories to create, on top of the ones you already have. Pass `0` to skip directory creation and spread the assets across your existing folders. |
| `--chunk=` | `10000` | Database insert batch size. Lower it if you hit memory or packet-size limits. |
| `--dry-run` | — | Reports what would be written and exits without touching the database. |
| `--repair-pivots` | — | Backfills the directory link for any assets that ended up with none, rather than generating new data. |

### Typical use

Preview the plan without writing anything:

```bash
php artisan dam:generate-scale-data --dry-run
```

Generate a smaller, faster set — 50,000 assets across 2,000 directories:

```bash
php artisan dam:generate-scale-data --assets=50000 --directories=2000
```

Generate assets into your existing folder structure instead of creating new folders:

```bash
php artisan dam:generate-scale-data --assets=100000 --directories=0
```

If a run is interrupted and leaves assets with no directory link, repair them:

```bash
php artisan dam:generate-scale-data --repair-pivots
```

> [!TIP]
> This command is the honest way to test the settings that only matter at scale — [**Show Assets in Directory Tree**](./configuration.md#show-assets-in-directory-tree) and the lazy tree's 100-item batching. Both feel instant on a small library and quite different on a large one.

---

## Related

- [Installation](./installation.md)
- [Upgrading DAM](./upgrading.md)
- [DAM Asset Migration to AWS S3](./dam-asset-migration-to-aws-s3.md)
