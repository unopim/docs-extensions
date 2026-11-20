# Configuration

::: info WooCommerce Connector required
The base WooCommerce Connector must be installed and connected before configuring this add-on. See the [WooCommerce Connector docs](../woocommerce/) if you haven't done that yet.
:::

Configuration for the WPML add-on happens in two places:

## 1. WPML in WordPress

Before running any export from UnoPim, set up WPML in WordPress:

1. Install and activate **WPML Multilingual CMS** and **WooCommerce Multilingual & Multicurrency**.
2. Go to **WPML → Languages**, set your **default language**, and add all secondary languages you need.
3. Note the language code for each language (`en`, `de`, `fr`, etc.).

::: warning WPML language codes
The add-on does not have a locale-to-language mapping screen. It derives the WPML language code from the UnoPim locale code by taking the part before `_`: `de_DE` → `de`, `fr_FR` → `fr`, `pt_BR` → `pt`. Each WPML language code must therefore be exactly that two-letter code. Two UnoPim locales with the same language (for example `en_US` and `en_GB`, or `zh_CN` and `zh_TW`) map to the same WPML language, so select only one of them in a job. WPML codes such as `pt-br` or `zh-hans` cannot be reached.
:::

::: warning
Add all secondary languages in WPML **before** running exports. Exporting to a language that doesn't exist in WPML will fail.
:::

## 2. WPML Settings in UnoPim

Inside the WooCommerce credential's **Attribute Mapping** tab, scroll to the **Enable Export in WPML** section, turn on **Enable WPML Export** and set **Default locale for WPML export**. See [Attribute Mapping](./attribute-mapping) for the full walkthrough.

## 3. Permissions

The add-on uses the same permissions as the WooCommerce Connector. No extra ACL setup is needed.

| Action | Permission source |
|---|---|
| Manage credentials & mappings | WooCommerce module |
| Create / run export & import jobs | Data Transfer module |
