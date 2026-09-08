# Import Attribute Mapping

To bring product data from Shopify into UnoPim, you need to map each Shopify product field to the corresponding UnoPim attribute. This tells the connector exactly where each piece of data should land when an import runs.

---

## How to Access Import Mappings

Click the **Shopify icon** in the left sidebar of your UnoPim dashboard, then click the **Import Mappings** tab.

![Import Mappings Tab](./images/import-mapping.png)

On the left side of the screen, you'll see all available Shopify product fields. Use the dropdown on the right of each field to select the UnoPim attribute you want it mapped to.

---

## Available Field Mappings

| Shopify Field | Field Code | What it does | Supported attribute types |
|---|---|---|---|
| **Name** | `title` | The product title shown on your Shopify storefront | text |
| **Description** | `descriptionHtml` | Full product description — supports HTML formatting | text, textarea |
| **Price** | `price` | The selling price of the product | price |
| **Weight** | `weight` | Product weight used for shipping calculations | number, metric |
| **Inventory Tracked** | `inventoryTracked` | Indicates whether inventory tracking is enabled | boolean |
| **Allow Purchase Out of Stock** | `inventoryPolicy` | Allows customers to buy the product even when stock is zero | yes/no |
| **Vendor** | `vendor` | The brand or supplier name | text, simple select |
| **Product Type** | `productType` | The category or type the product belongs to | text, simple select |
| **Tags** | `tags` | Keywords used for search and filtering in Shopify | textarea, text, select, multiselect |
| **Barcode** | `barcode` | Product barcode or unique identifier for inventory scanning | text |
| **Compare Price** | `compareAtPrice` | The original price shown as a strikethrough to highlight a discount | price |
| **SEO Title** | `metafields_global_title_tag` | Custom page title used by search engines | text |
| **SEO Description** | `metafields_global_description_tag` | Meta description shown in search engine results | text, textarea |
| **Handle** | `handle` | The URL-friendly slug for the product page (e.g. `blue-running-shoes`) | text |
| **Taxable** | `taxable` | Marks whether tax should be applied to this product | yes/no |
| **Cost per Item** | `cost` | Cost of goods sold (COGS) — used for profit reporting | price |

---

## Unit Price

Below the field mappings you'll find the **Unit Price** section. This maps the attributes that Shopify uses to show a price per standard unit of measure — like "€2.50 per litre".

| Field | What it does | What to choose |
|---|---|---|
| **Total amount** | The total quantity contained in the product | A number or decimal type attribute |
| **Total amount unit** | The unit that the total amount is measured in | A text or select type attribute |

> **Important:** The value of **Total amount unit** must match a valid Shopify unit — for example `ML`, `CL`, or `L`. Any other value is skipped.

---

## Other Mapping — Family Mapping

Below the field mappings, you'll find an **Other Mapping** section. This is an important setting for importing products that have variants.

![Other Mapping Section](./images/other-mapping.png)

### Family Mapping (Required for Products with Variants)

When importing products from Shopify into UnoPim, you must select a **product family** that the imported products will be assigned to — for example, `Accessories`, `Clothing`, or `Electronics`.

This ensures that products and their variants are imported correctly and placed under the right family structure in UnoPim.

> **Important:** If no family is selected here, variant products may not import correctly. Always make sure a valid product family is chosen before running a product import job.

