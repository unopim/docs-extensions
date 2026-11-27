# Unopim Extension Docs

Centralized VitePress documentation site for all Unopim extensions, deployed at [docs-extensions.unopim.com](https://docs-extensions.unopim.com).

This repo holds only the VitePress shell, theme, and nav config. Each extension's content lives in its own repo and is pulled into `docs/{slug}/` at build time by the GitHub Action.

## Local Development

```bash
npm install
npm run docs:dev      # starts at http://localhost:5173
npm run docs:build    # outputs to docs/.vitepress/dist
npm run docs:preview  # preview the production build locally
```

## Project Structure

```
docs/
  .vitepress/
    config.ts       # nav, sidebar, base URL
  public/
    CNAME           # custom domain for GitHub Pages
  {slug}/
    index.md        # placeholder only — real content pulled at build time
```

## Contributing

- **Extension content** — edit docs in the extension's own repo (`docs/` folder there), not here.
- **Site shell** — branch from `main`, change `docs/.vitepress/`, verify with `docs:dev` + `docs:build`, open a PR.

## Adding a New Module

Follow these steps when a new Unopim extension needs a documentation section.

### 1. Write docs in the module's own repo

Create a `docs/` folder in the extension repo with your markdown files and a `sidebar.json`:

```json
[
  {
    "text": "My Module",
    "items": [
      { "text": "Overview",      "link": "/my-module/" },
      { "text": "Installation",  "link": "/my-module/installation" },
      { "text": "Configuration", "link": "/my-module/configuration" }
    ]
  }
]
```

Use **relative links** in markdown (`./installation`, not `/installation`).

### 2. Add a placeholder in this repo

Create `docs/{slug}/index.md`:

```markdown
# My Module

Placeholder — real docs are pulled from `unopim/unopim-my-module` at build time.
```

### 3. Register in config

Add one line to the `projects` array in `docs/.vitepress/config.ts`:

```ts
{ slug: 'my-module', label: 'My Module' },
```

This wires up the nav dropdown, sidebar, and edit links automatically.

### 4. Wire the GitHub Action

In `.github/workflows/deploy.yml`, add a step to checkout the module repo and copy its `docs/` into `docs/{slug}/` before the build. Follow the pattern of existing modules.

### 5. Verify and open a PR

Run `npm run docs:dev` (confirm the route loads) and `npm run docs:build` (no errors), then submit a PR with the placeholder, `config.ts` change, and workflow change.

## License

The UnoPim extensions documentation is open-source software licensed under the [MIT License](LICENSE).
