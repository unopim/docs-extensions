# UnoPim Commercetools Connector

## What is the UnoPim Commercetools Connector?

The **UnoPim Commercetools Connector** connects your **commercetools project** with **UnoPim**, an open-source Product Information Management (PIM) system.

You keep your product information in one place (UnoPim) and send it to commercetools whenever you're ready. You can also bring existing commercetools data back into UnoPim, so you don't have to enter it again by hand.

It works in both directions: products, categories and attribute families go from UnoPim to commercetools, and product types, categories and products come back from commercetools into UnoPim.

---

## What can it do?

- **Export** products, categories and attribute families from UnoPim to commercetools.
- **Import** product types, categories and products from commercetools into UnoPim.
- Send product names, slugs, descriptions, SEO fields, search keywords, prices, images and custom attributes.
- Keep commercetools up to date by re-running an export job whenever something changes in UnoPim.

---

## Features

### Export Products and Variants
Export simple products and configurable products. A configurable product is sent to commercetools as one product with its variants. When a new variant is added in UnoPim, the next export adds it to the product in commercetools.

### Export Categories
UnoPim categories are exported as commercetools categories. Parent categories are always created before their children, so the category tree is built correctly.

### Export Attribute Families as Product Types
Each UnoPim attribute family is exported as a commercetools **product type**, with its attributes.

### Import from commercetools
Bring your existing commercetools data into UnoPim:

| Import Type | What it does |
|---|---|
| **Commercetools Family Import** | Imports commercetools product types as UnoPim attribute families, with their attributes and options |
| **Commercetools Category Import** | Imports the commercetools category tree as UnoPim categories |
| **Commercetools Product Import** | Imports commercetools products and their variants, including product images |

### Attribute Mapping
Map each commercetools product field (SKU, key, name, slug, description, SEO fields, price, images) to the UnoPim attribute that holds its value. The mapping screen only lists attributes of a matching type, so a wrong type can't be picked by mistake.

### Custom Attributes by Code
Any other commercetools attribute is filled from the UnoPim attribute that has the **same code**. No extra mapping is needed.

### Product Export Filters
The product export uses the same filters as the standard UnoPim product export: channel, locales, currencies, attributes, attribute families, categories, completeness, time condition, status, SKUs and attribute conditions. You choose exactly which products and which values are sent.

### Multi-Language Support
Localized attributes are sent as localized values in commercetools, one value per selected locale.

### Product Images
Images from UnoPim image, gallery and DAM asset attributes are sent to commercetools as product images. You can turn image export on or off for each export job.

### Multiple commercetools Projects
Connect **more than one commercetools project** to the same UnoPim instance by creating a separate connection for each one. Each connection can be switched on or off on its own.

### Connection History
Every change to a connection is recorded in its **History** tab, showing who changed what and when. The client secret is never shown in history.

### Sync Updates Easily
Already exported your products? Just re-run the export job. The connector finds the product in commercetools and updates it instead of creating a duplicate.

---

## Requirements

| Requirement | Detail |
|---|---|
| **UnoPim Version** | v3.0.0 |
| **PHP Version** | 8.4 or higher |
| **commercetools** | A project with an API client (see [commercetools Setup](./commercetools-setup)) |
| **Queue Worker** | A running Laravel queue worker, because export and import jobs run in the background |
| **Terminal / Server Access** | Required to run the installation commands |
