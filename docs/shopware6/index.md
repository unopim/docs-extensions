# UnoPim Shopware 6 Connector

Store Link: [View on Webkul Store](https://store.webkul.com/unopim-shopware-connector.html)

The **UnoPim Shopware 6 Connector** is an export-only integration that pushes your entire product catalog from UnoPim directly into a Shopware 6 store — categories, attributes, attribute options, simple products, configurable products, and product tags — without any manual re-entry.

<!-- <br>

<div align="center">
  <img src="./images/shopware-banner.png" alt="UnoPim Shopware 6 Connector" width="100%" style="max-height:330px; object-fit:cover; border-radius:8px;" />
</div>

<br> -->

Managing product data in two separate systems is time-consuming and error-prone. The UnoPim Shopware Connector solves that — you define your catalog once in UnoPim, then publish it to Shopware with a single export job. From categories and attribute definitions to product prices, images, and variant configurations, everything flows in one direction: UnoPim → Shopware.

---

## What it syncs

The connector ships **six dedicated export jobs**, one for each entity:

| Export Job | What it does |
|---|---|
| **Shopware Categories** | Exports your UnoPim category tree (names, descriptions, images, and parent/child structure) to Shopware. |
| **Shopware Attributes** | Exports UnoPim attributes to Shopware as **property groups**. |
| **Shopware Attribute Options** | Exports attribute options to Shopware as **property-group options**. |
| **Shopware Simple Products and Variants** | Exports standalone products and variant products to Shopware. |
| **Shopware Configurable Products** | Exports configurable (parent) products along with their variants and configurator settings. |
| **Shopware Product Tags** | Exports product attribute values, boolean flags, and attribute-family names as Shopware tags. |

---

## Features

### Flexible Attribute Mapping
Map any UnoPim attribute to the corresponding Shopware product field — name, product number, tax, pricing, stock, description, keywords, shipping flags, and more. Set default values for fields when no attribute is mapped.

### Multi-Locale Support
Each credential stores a **locale mapping** (UnoPim locale → Shopware language). Products and categories are pushed with translations for every mapped locale so your storefront speaks your customers' language.

### Multi-Currency Pricing
A **currency mapping** (UnoPim currency → Shopware currency) lets you export net and gross prices in every mapped currency. List price, purchase price, and regulation price are also supported.

### Configurable Products & Variants
Configurable products are exported as Shopware parent products with their **super-attributes** converted into Shopware configurator settings, and each variant linked to the correct parent with its option selections.

### Product Images & Media
Map one or more image attributes per product. Each image is uploaded to Shopware and attached as a product gallery image, with a separate mapping for the cover (main) image.

### Custom Fields
Map arbitrary UnoPim attributes to any Shopware custom field through the **Custom Fields Mapping** screen.

### Properties
Push UnoPim `select` and `multiselect` attribute values to Shopware as product properties (property-group options).

### Bulk Upsert
Products are written in bulk through Shopware's sync endpoint. Running a job a second time updates existing records — it does not create duplicates.

### Per-Record Resilience
A product missing a required field (such as product number or price) is skipped and logged individually, so the rest of the batch still exports successfully.

### Multiple Shopware Stores
Store more than one set of credentials, each pointing at a different Shopware URL, and export your catalog to each store independently.

### Secure OAuth2 Authentication
Connects using the Shopware integration **Access Key ID** and **Secret Access Key** with the OAuth2 client-credentials grant. Tokens refresh automatically. The secret key is never stored in audit history.

---

## Requirements

| Requirement | Version |
|---|---|
| **UnoPim** | 2.x and 3.0.x (verified on 3.0.0) |
| **PHP** | 8.3 or higher |
| **Laravel** | 12.x and 13.x |
| **Database** | MySQL 8.0 or PostgreSQL 16 |
| **Shopware** | 6.6 – 6.7 (Admin API v4), verified on 6.7.13 |
| **Shopware Bulk API Plugin** | Included in the connector package (required) |
| **Queue worker** | A running `php artisan queue:work` process for background export jobs |

---

## Recommended export order

Run jobs in this sequence so that dependencies (categories, attributes, options) already exist in Shopware before products reference them:

1. **Shopware Categories**
2. **Shopware Attributes**
3. **Shopware Attribute Options**
4. **Shopware Product Tags** *(if used)*
5. **Shopware Simple Products and Variants** or **Shopware Configurable Products**
