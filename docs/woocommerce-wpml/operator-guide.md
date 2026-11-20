# Operator Guide

A **Unopim Operator** runs the import and export jobs that move multilingual data between Unopim and a WPML-enabled WooCommerce store. The add-on does not introduce a separate UI — operators use the standard **Data Transfer** module, with the WooCommerce job types now exposing **multi-locale** filters.

## Exporting categories, attributes, and products in multiple languages

### Step 1 — Open the export job creation page

Navigate to **Data Transfer → Exports → Create**.

### Step 2 — Pick the job type

Choose one of the WooCommerce export types:

| Type | Source | Notes |
|---|---|---|
| **WooCommerce Categories** | Category repository | Pushes category trees per language. |
| **WooCommerce Attributes** | Attribute repository | Pushes global attributes & option values in the WPML default locale only. Optional **Additional Attributes from mapping** filter to scope to a subset. |
| **WooCommerce Product** | Product repository | Pushes products and variations. Includes **Currencies**, **Identifiers** (SKUs) and **With Media** filters. |

### Step 3 — Fill the filters

The add-on overrides the standard WooCommerce filter set so **Locale** is a multiselect on the category and product exports. The attribute export has no locale filter. Common filters:

| Filter | Type | Notes |
|---|---|---|
| **Credential** | select (async) | The WooCommerce credential pointing at the WPML-enabled store. |
| **Channel** | select (async) | Drives which Unopim locales appear in the locale dropdown. |
| **Locale** | **multiselect** (async) | **Key WPML feature** — pick every language you want this run to push. |
| **Currency** *(product export)* | select (async) | Required for product exports. |
| **Additional Attributes from mapping** *(attribute export)* | multiselect, optional | Limit the export to selected attributes. |
| **Identifiers** *(product export)* | tags, optional | Limit to specific product SKUs. |
| **with_media** *(product export)* | boolean | Include images/files in the push. |

### Step 4 — Save and run

Save the job and click **Run**. The queue worker processes the data and, for each entity, makes one WooCommerce API call per selected locale. Each successful call writes a row into `wk_wpml_data_mapping` recording the WPML language and the WooCommerce ID, so re-runs update existing translations instead of creating duplicates.

### Step 5 — Verify on the storefront

Open the WordPress admin → switch the front-end language → confirm the translated category, attribute, or product appears. Use the WCML / WPML language switcher to compare values across languages.

## Importing categories, attributes, and products

The add-on provides matching importers:

| Type | Notes |
|---|---|
| **WooCommerce Categories Import** | Pulls categories from WooCommerce into Unopim per locale. |
| **WooCommerce Attributes Import** | Pulls attributes and option values. |
| **WooCommerce Product Import** | Pulls products. Includes `family`, `currency`, `with_media`. |

### Steps

1. **Data Transfer → Imports → Create**.
2. Pick the import type.
3. Fill **Credential** and the **Locale multiselect** with every language you want pulled in this run.
4. For products: also set **Channel**, **Currency**, **Family**, and **with_media** as needed.
5. Save and click **Run**.

The importer pulls each entity in every selected language and updates the matching Unopim entity's locale-specific values.

## What happens during a run

```
Operator clicks Run
        ↓
Job dispatched to the queue
        ↓
For each selected Unopim locale:
  - locale → WPML language code (the part before `_`, e.g. de_DE → de)
  - one WooCommerce API call per entity per language
  - response IDs saved to wk_wpml_data_mapping
        ↓
Job history records totals + any failures per row
```

## Monitoring

- **Job history** — `Data Transfer → Imports / Exports` lists each run with row-level counts and errors.
- **`wk_wpml_data_mapping`** — query directly to confirm translations were written for every (entity, language) pair you expected:

```sql
SELECT entityType, code, relatedLanguage, langLabel, externalId
FROM wk_wpml_data_mapping
WHERE jobInstanceId = ?
ORDER BY entityType, code, relatedLanguage;
```

- **`storage/logs/laravel.log`** — queue worker errors land here.

## Troubleshooting

### Locale dropdown is single-select, not multiselect

The add-on did not load. Check:

1. Provider registered in `bootstrap/providers.php` (or `config/app.php` providers on older builds).
2. `composer dump-autoload` was run after install.
3. `php artisan optimize:clear` was run.
4. The WooCommerce base connector itself is loaded — the add-on extends those filters, so if WooCommerce is missing, nothing changes.

### Export succeeds but only the default language appears in WordPress

Check, in order:

1. Each Unopim locale you selected matches a WPML language code (the part before `_`, e.g. `de_DE` → `de`).
2. The WPML languages exist and are **active** in WordPress.
3. The WCML setup wizard has been completed for the entities being pushed.
4. The credential's API key has write permission to translated entities.
5. `wk_wpml_data_mapping` has a row per (entity, language) — if not, the export did not even attempt the secondary language API call (usually the locale was not selected in the job, or **Enable WPML Export** is off on the credential).

### Translation is created but values look wrong

- Confirm Unopim has values **in that locale** for the attributes you are pushing — exporting an empty locale just creates a translation with empty fields.
- Check WPML String Translation for the attribute labels; the add-on writes labels but translations of generic UI strings still come from String Translation.

### Re-running the export creates duplicates

- The add-on uses `wk_wpml_data_mapping` to detect existing translations. If the table was truncated or the `externalId` was changed manually on the WooCommerce side, the re-run treats the entity as new.
- Restore the mapping or run a fresh full sync to rebuild it.

### Job stuck in Pending

- Verify a queue worker is running.
- Verify it has been **restarted** after the add-on was installed (`php artisan queue:restart`); long-running workers cache class definitions.
- Check `storage/logs/laravel.log` for queue exceptions.

## What operators cannot do

- Push to a language that is not configured in WPML — the WooCommerce API rejects the call.
- Use WPML language codes other than the two-letter prefix of the UnoPim locale (for example `pt-br`) — the add-on always sends the part of the locale before `_`.
- Roll back a translation push automatically — there is no undo. Either run a corrective export with the right values, or remove the translation manually in WordPress.

## Best practices

1. Run a small test export (one product, two languages) before the first big run.
2. Always restart queue workers after upgrading the add-on (`php artisan queue:restart`).
3. Keep an eye on `wk_wpml_data_mapping` after the first production export — confirm a row exists for every (entity, language) pair you expected.
4. Pair every locale you select on a job with a confirmed WPML language code — drift between Unopim locales and WPML languages is the most common cause of silent failures.
5. Do not delete the WooCommerce add-on connector while WPML jobs are in flight — the add-on extends WooCommerce filters at runtime; removing one breaks both.
