# Author Guide

A **WordPress Admin** (the "author" role for this add-on) sets up the WPML side so that Unopim has somewhere meaningful to push translations to. There is no in-Unopim authoring step — this guide covers the WordPress preparation an Unopim Operator depends on before running any export.

## Preparing WPML in WordPress

### Step 1 — Install and activate WPML

1. In WordPress admin, install **WPML Multilingual CMS**.
2. Activate the following add-ons (order does not matter):
   - **WPML String Translation**
   - **WPML Media Translation** (only if you translate alt text or media)
   - **WooCommerce Multilingual & Multicurrency**
3. Confirm that **WooCommerce** itself is installed, activated, and connected to the same store the Unopim WooCommerce connector points at.

### Step 2 — Define languages

Open **WPML → Languages**:

1. Pick the **default language** — this is the "original" the storefront falls back to and matches the **Default locale for WPML export** on the UnoPim credential.
2. Add the **secondary languages** you intend to translate into. Each language entry has:
   - A **language code** (`en`, `de`, `fr`, …) — used in the WooCommerce API URLs.
   - A **language label** (`English`, `Deutsch`, `Français`, …) — recorded on every Unopim mapping row.
   - A **flag / display name** for the storefront language switcher.

::: warning
Once a language is in use, do not change its language code. The Unopim mapping table stores translations against the code that existed at export time — renaming `de` → `de-de` after the fact orphans every existing translation row.
:::

### Step 3 — Configure WPML for WooCommerce

Open **WPML → WooCommerce Multilingual** and:

1. Run the **WCML setup wizard** if it has not been completed — it walks through which entities are translatable (categories, attributes, product types, etc.).
2. Tick the entities you intend to translate via Unopim. At minimum: **Products**, **Categories**, **Global Attributes**.
3. If you use multi-currency, set the per-language currency rules so prices the Unopim connector pushes are not double-converted.

### Step 4 — Verify a manual translation works first

Before involving Unopim, sanity-check the WPML setup by translating one product manually inside WordPress:

1. Edit a product in WooCommerce.
2. Use the WPML language column / "+" button to add a translation in one of the secondary languages.
3. Save and view it on the storefront.

If that manual translation works end-to-end, the WPML side is ready for Unopim to drive automatically. If it fails (e.g., translation page blank, currency wrong), fix it on the WordPress side first — Unopim will hit the same error if WPML is misconfigured.

## What the author does not do in Unopim

- Does **not** create mapping templates inside Unopim — there is no WPML-specific UI in the admin panel.
- Does **not** edit `wk_wpml_data_mapping` directly — Unopim writes that table during job runs.
- Does **not** define ACL permissions for the add-on — the add-on inherits WooCommerce module permissions.

## Hand-off checklist for the Unopim Operator

Before the operator runs the first multilingual job, confirm with them:

- [ ] WPML default language matches the **Default locale for WPML export** on the UnoPim credential.
- [ ] Every Unopim locale that will be exported has a matching WPML language code — the part before `_` (e.g., `en_US` → `en`). Region codes such as `pt-br` are not supported.
- [ ] Each WPML language is **active** (not just configured but disabled).
- [ ] The WCML setup wizard has been completed.
- [ ] A manual product translation works on WordPress without errors.
- [ ] The WooCommerce REST API key on the Unopim credential has full permissions, including write access to translated entities.

## Best practices

1. Decide the language list **before** any production export — adding a new language later means re-running every entity through Unopim to seed the new translations.
2. Keep WPML language codes lowercase and stable (`en`, `de`, `fr`); Unopim mapping is case-sensitive.
3. Translate one entity manually first to flush out WPML configuration issues — debugging via Unopim's queue logs is slower than debugging in the WordPress admin.
4. Document which Unopim locales are exported to which WPML languages in your team's runbook; the Unopim Operator needs it on day one.
