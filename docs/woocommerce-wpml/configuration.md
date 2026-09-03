# Configuration

::: info WooCommerce Connector required
The base WooCommerce Connector must be installed and connected before configuring this add-on. See the [WooCommerce Connector docs](/woocommerce/) if you haven't done that yet.
:::

Configuration for the WPML add-on happens in two places:

## 1. WPML in WordPress

Before running any export from UnoPim, set up WPML in WordPress:

1. Install and activate **WPML Multilingual CMS** and **WooCommerce Multilingual & Multicurrency**.
2. Go to **WPML → Languages**, set your **default language**, and add all secondary languages you need.
3. Note the language code for each language (`en`, `de`, `fr`, etc.) — these are used when mapping locales.

::: warning
Add all secondary languages in WPML **before** running exports. Exporting to a language that doesn't exist in WPML will fail.
:::

## 2. WPML Settings in UnoPim

Inside the WooCommerce credential's **Attribute Mapping** tab, scroll to the **WPML Export Settings** section and enable WPML export and set your default locale. See [Attribute Mapping](./attribute-mapping) for the full walkthrough.

## 3. Permissions

The add-on uses the same permissions as the WooCommerce Connector. No extra ACL setup is needed.

| Action | Permission source |
|---|---|
| Manage credentials & mappings | WooCommerce module |
| Create / run export & import jobs | Data Transfer module |
