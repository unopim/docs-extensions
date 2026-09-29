# Creating an Export Job

Once your connection is set up and your attribute mapping is saved, you can export data to commercetools by creating an export job.

Go to **Data Transfer → Exports → Create Export**.

There are three types of export jobs available:

- **Commercetools Family Export** - exports UnoPim attribute families to commercetools as product types
- **Commercetools Category Export** - exports UnoPim categories to commercetools
- **Commercetools Product Export** - exports simple and configurable products to commercetools

> **Tip:** Run the exports in this order the first time: **families first, then categories, then products**. A product can only be exported when its attribute family already exists in commercetools as a product type.

---

## Export Attribute Families

Each UnoPim attribute family becomes a commercetools **product type** with the same code, together with its attributes.

1. Click **Create Export**.
2. Enter a unique **Code** (e.g., `commercetools-family-export`) and set the **Type** to `Commercetools Family Export`.
3. Fill in the filters:

| Filter | What to do |
|---|---|
| **Commercetools Connection** | Select the connection to export to. Only active connections are listed. |
| **Source Channel** | Select the channel whose values you want to export |
| **Locales to Export** | Select the locales for the attribute labels |

4. Click **Save Export**, then click **Export Now**.

---

## Export Categories

Exporting categories before products means products can be placed in the right categories as soon as they land in commercetools.

1. Click **Create Export**.
2. Enter a unique **Code** (e.g., `commercetools-category-export`) and set the **Type** to `Commercetools Category Export`.
3. Fill in the same filters as the family export: **Commercetools Connection**, **Source Channel** and **Locales to Export**.
4. Click **Save Export**, then click **Export Now**.

Parent categories are always created before their children, so the category tree in commercetools matches the one in UnoPim.

---

## Export Products

This job handles simple products and configurable products with their variants.

1. Click **Create Export**.
2. Enter a unique **Code** (e.g., `commercetools-product-export`) and set the **Type** to `Commercetools Product Export`.
3. On the right side, select your **Commercetools Connection**.
4. Set the filters you need. They are the same filters as the standard UnoPim product export:

| Filter | What it does |
|---|---|
| **With Media** | Tick to send product images. When it's off, new products are created without images, and images already in commercetools are left as they are. |
| **Channels** *(required)* | The channel whose values are exported. Only **one** channel can be selected, because commercetools has no per-channel product values. |
| **Locales** | The locales to export. Leave empty to export every locale of the selected channel. |
| **Currencies** | The currencies to export prices in. Leave empty to export every currency of the selected channel. Prices in other currencies that already exist in commercetools are kept. |
| **Attributes** | Only the selected attributes are sent. Leave empty to send every attribute. |
| **Attribute Families** | Export only products of the selected families. |
| **Categories** | Export only products in the selected categories. |
| **Completeness** | Export only products that are complete on at least one, or on all, selected locales. |
| **Time Condition** | Export only products updated in the last N days, between two dates, or since the last export. |
| **Status** | Export only enabled or only disabled products. |
| **Identifiers** | Paste one SKU per line (commas or spaces also work) to export only those products. |
| **Attribute Conditions** | Export only products that match every condition, e.g. `color` is `red`. |

5. Click **Save Export**, then click **Export Now**.

The export starts right away. You can watch the progress - once it's done, the status changes to **Completed** and you'll see how many products were created, updated and skipped.

Click **Download Log** to see exactly what was exported and why any product was skipped.

---

## How Configurable Products Are Exported

A configurable product and all of its variants are sent to commercetools as **one product**. Each variant becomes a commercetools variant with its own SKU, attributes, prices and images.

**Variant SKUs in the Identifiers filter**
If you enter the SKU of a variant, only that variant is added to (or updated in) its parent product in commercetools. The parent must already be exported. If it isn't, the variant is skipped and the log says:

*"Parent product {SKU} does not exist on Commercetools. Export the parent product first."*

**Attribute Conditions on variant attributes**
If a condition uses an attribute that belongs to the variants (for example `color`), the configurable product is exported with **only the variants that match**. Other variants already in commercetools are left untouched. If no variant matches, the product is skipped.

**Filters that check the parent**
Attribute Families, Categories, Status and Completeness are checked on the configurable (parent) product.

---

## Things to Know

- **Selected attributes and new products** - commercetools needs some fields to create a product, such as the name, the slug and any attribute the product type marks as required. If the **Attributes** filter leaves one of them out, existing products are still updated, but new products are not created. The log lists the missing attributes.
- **Families without a product type** - products whose attribute family has no matching product type in commercetools are skipped. Run the **Commercetools Family Export** (or the **Commercetools Family Import**) first.
- **Re-running an export** - products that already exist in commercetools are updated, not duplicated. New variants added in UnoPim are added to the existing product.

---

## Viewing Exported Products in commercetools

Once the export job completes, log in to the [commercetools Merchant Center](https://mc.commercetools.com) and go to **Products**. You'll find the exported products there, with their variants, prices, images and descriptions as they were set up in UnoPim.

If you exported **multi-language content**, switch the data locale in the Merchant Center to check that the translated values came through.
