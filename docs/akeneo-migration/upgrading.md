# What's New & Upgrading

Version **1.1.0** of the Akeneo to UnoPim Migration plugin is a release for **UnoPim 3.0.0**. Nothing was removed and no feature changed shape — but the module now runs on UnoPim 3.0's single-page admin, maps Akeneo product models onto real **variant structures**, and carries product **associations** across.

---

## Requirements Changed

| | Previous | 1.1.0 |
|---|---|---|
| **UnoPim** | 2.1.0 | **3.0.0** |
| **PHP** | 8.3+ | **8.4.1+** |
| **Laravel** | 12 | **13** |
| **`akeneo/api-php-client`** | unpinned | **`^11.4`** |
| **Database** | MySQL | **MySQL 8.0 or PostgreSQL 16** |
| **Elasticsearch** | — | 8.17, optional |

> [!IMPORTANT]
> 1.1.0 requires **UnoPim 3.0.0**. Upgrade your UnoPim instance to 3.0 first, then upgrade this plugin.

---

## Upgrade Steps

Run these from your **UnoPim project root**, after your instance is on UnoPim 3.0.0:

```bash
# 1. Replace the package code at packages/Webkul/AkeneoMigration

# 2. Correct the Akeneo client constraint
composer require akeneo/api-php-client:^11.4
composer dump-autoload

# 3. Re-run the install command — it is safe to run again
php artisan akeneo-migration:install
```

`akeneo-migration:install` runs any new migrations, republishes the sidebar icon, and clears the config, route, view, and application caches so the renamed routes and menu load.

Your existing connections, mappings, and migration history are preserved. **ACL permission keys are unchanged**, so roles keep the access you already granted them.

---

## What's New

### The whole module runs on the single-page admin

UnoPim 3.0's admin behaves like a **single-page application**, and every Akeneo Migration screen is built on it.

Clicking a link no longer reloads the browser — UnoPim fetches the destination over **AJAX**, swaps the page body in place, and leaves the header, sidebar, theme, and scroll position alone. The URL and history still update, so **Back**, **Forward**, and bookmarks behave normally.

- Moving between Connections, the connection editor, and the Job Tracker is instant — the interface is never re-downloaded.
- Saving a connection or changing the entity selection posts over AJAX and confirms with a flash message. No reload, nothing else on the page lost.
- The **Job Tracker** listing refreshes itself while a migration job is pending or processing, so progress updates without you pressing reload.

### A global save bar with Discard and Save

Editing a connection — or ticking a different set of entities to migrate — raises UnoPim's global save bar. It tells you how many fields changed and offers **Discard** and **Save changes**.

<br>

<div align="center">
  <img src="./assets/connection/discard-changes.png" alt="Discard changes confirmation on the connection editor" width="100%" style="border-radius:8px;" />
</div>

<br>

Navigating away with unsaved work asks for confirmation first, so a half-finished edit is never silently thrown away.

### Connection screens use core components

The connection listing and editor were rebuilt on UnoPim's own page header, breadcrumbs, and shared datagrid, and on the `primary-*` design tokens. They now follow your theme, including **dark mode**, and behave like every other listing in UnoPim — search, filters, pagination, and mass delete included.

Creating a connection is now a **modal** on the listing rather than a separate page.

### Akeneo product models become UnoPim variant structures

This is the largest functional addition. An Akeneo **family variant** is now translated into a UnoPim **variant structure**:

- A parentless product model becomes a `configurable` bound to that structure.
- A sub-model becomes the `variant_group` node UnoPim uses for the middle tier of a two-level tree.
- Products underneath attach as variants of the right node.

Because the configurable points at a structure, it opens in UnoPim 3.0's variant editor rather than the pre-structure fallback. See [Entity Mapping](./entity-mapping#configurable-products-akeneo-product-models) for the full detail, including what happens when an axis is not usable in UnoPim.

### Product associations come across

Akeneo product associations are mapped onto UnoPim relations — **related products**, **up-sells**, and **cross-sells** — for both products and product models.

### Entity selection is remembered

The entities you tick on a connection are stored on that connection. Reopen it a week later and your selection is still there, ready to run again.

---

## Fixes in 1.1.0

- **Migrations run again on 3.0.** UnoPim 3.0 refuses an import with no source file; an Akeneo job now streams straight from the REST API instead.
- **Long runs are no longer reaped as stalled.** The importer writes UnoPim 3.0's job heartbeat while it works.
- **Products index into Elasticsearch again.** Dates are stored as calendar dates and measurement values keep their unit, so the indexer accepts them.
- **Channels import into an empty catalog on PostgreSQL.** A missing root category used to be written as id `0`.
- **The Job Tracker filter reset works again** — the listing route was renamed from `data-transfer/tracker` to `data-transfer/job-tracker`.
- **Attribute types are preserved.** If an attribute already exists in UnoPim with a different type, the import keeps the existing type instead of rewriting it, and logs that it did — stored values stay valid.

---

## Route Changes

Connection routes were renamed. If you link to the module from your own code or bookmarks, update them:

| Previous | 1.1.0 |
|---|---|
| `akeneo_migration.credentials.*` | `akeneo_migration.connections.*` |
| `/akeneo-migration/credentials` | `/akeneo-migration/connections` |

> [!NOTE]
> **ACL permission keys did not change** — they are still `akeneo_migration.credentials.*` and `akeneo_migration.migration.*`. Existing roles keep working untouched. See [Permissions](./permissions).

---

## Repairing a Catalog Migrated by an Older Version

If you migrated with an earlier build, some records may carry data in the older shape. Three Artisan commands repair them in place — no re-import needed:

```bash
# Configurables that have axes but no variant structure
php artisan akeneo-migration:backfill-variant-structures --dry-run
php artisan akeneo-migration:backfill-variant-structures

# Measurement attributes whose type was rewritten to a scalar type
php artisan akeneo-migration:fix-attribute-types

# Multiselect arrays and ISO timestamps in stored product values
php artisan akeneo-migration:fix-product-values
```

Re-running the **Configurable Products** import also repairs structure bindings — the importer rewrites the structure link and the `super_attributes` pivot on every run, so a tree migrated before variant structures existed is fixed by importing it again rather than deleting it first.

Full detail on each command is in [Artisan Commands](./commands).

---

## Next Steps

- [Installation](./installation)
- [Entity Mapping](./entity-mapping)
- [Artisan Commands](./commands)
