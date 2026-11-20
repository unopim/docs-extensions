# Product Export

The **Shopware Products** export job pushes simple products, configurable (parent) products and their variants from UnoPim to Shopware in one run. Configurable parents are sent before the variants that reference them. Use the **Product Type** filter to limit a job to simple or configurable products.

> [!NOTE]
> Earlier versions had separate **Shopware Simple Products and Variants** and **Shopware Configurable Products** jobs. Both are replaced by **Shopware Products**; existing profiles are migrated automatically.

---

## Prerequisites

Before running a product export:

- [Attribute Mapping](./attribute-mapping) must be configured — **Product Number** must be mapped to an attribute, and **Name**, **Tax ID**, **Net Price**, **Gross Price**, and **Stock Quantity** must each have a mapped attribute or default value.
- Run [Shopware Categories](./category-export), [Shopware Attributes](./attribute-export), and [Shopware Attribute Options](./attribute-options-export) first if products reference categories or properties.
- Run [Shopware Product Tags](./product-tags-export) first if the product mapping uses tags.
- At least one active [credential](./credentials) must exist with locale and currency mappings configured.

---

## Open the Export Jobs Section

Go to:

`Data Transfer → Exports`

![Exports Navigation](./images/export/data-trasnfer.png)

Click **Create Export** in the top-right corner.

![Create Export Button](./images/export/create-export.png)

---

## Create a Product Export Job

While creating the export job:

1. Enter a unique **Export Job Code** (e.g. `shopware-products`).
2. Select **Shopware Products** as the export job type.

![Simple Product Export Job Type](./images/export/export-simple-product.png)

---

## Configure Filters

| Filter | Description |
|---|---|
| **Shopware Credential** | Required. Select the Shopware store connection to export to. Only active credentials appear in this list. Pick it first: Currency and Attributes depend on it. |
| **Channel** | The UnoPim channel whose product values are read. Defaults to the default channel. |
| **Locale** | Optional. Limits the export to the selected locales of the channel. |
| **Currency** | Optional. Lists only the currencies mapped on the credential. A chosen currency is used for prices in place of the credential's default. |
| **Attributes** | Optional. Lists only attributes mapped on the credential. Narrows the export to the chosen attributes; leave empty to send all mapped attributes. |
| **Attribute Families**, **Status**, **Completeness**, **Time Condition**, **Categories**, **Filter By SKU**, attribute conditions | Standard UnoPim product filters that narrow which products are exported. |
| **Product Type** | Optional. **Simple** (includes variants) and/or **Configurable**. Leave empty to export both. |
| **Indexing Behaviour** | Required. Controls how Shopware indexes the imported products after the bulk write. |
| **With Media** | Off by default. When on, sends the images mapped under the credential's [Other Mapping](./other-mapping). When off, no images are sent. |
| **With Association** | Off by default. When on, sends related, up-sell and cross-sell products as Shopware cross-selling, one entry per section. Referenced products not yet in Shopware are left out and named in the job log. |

### Indexing Behaviour Options

| Option | Description |
|---|---|
| **Data will be indexed synchronously** | Shopware indexes products immediately after each bulk write (default). Suitable for smaller catalogs. |
| **Data will be indexed asynchronously** | Shopware queues the indexing to run in the background. Faster bulk write, but products may not be immediately searchable. |
| **Data indexing is completely disabled** | Shopware skips indexing entirely. Use only if you plan to trigger indexing manually afterward. |


---

## Save and Run

Click **Save Export** to create the job, then click **Export Now** to run it.

Monitor progress in the **Job Tracker**. The tracker reports:

- **Created** — new products added to Shopware.
- **Updated** — existing products whose data was refreshed.
- **Skipped** — products that could not be exported (e.g. missing required fields). Each skipped product is logged with a reason.

![Simple Product Export Complete](./images/export/save-run-simple.png)

---

## What Gets Exported

For each eligible product, the connector sends:

- All fields configured in [Attribute Mapping](./attribute-mapping) (name, product number, tax, prices, stock, description, etc.).
- **Images** — uploaded to Shopware and attached as a media gallery (only with **With Media** on).
- **Cover image** — set as the product's main thumbnail (only with **With Media** on).
- **Properties** — attribute values for mapped `select` / `multiselect` attributes.
- **Custom fields** — values for any pairs configured in [Custom Fields Mapping](./custom-mapping).
- **Translations** — field values in every mapped locale.
- **Multi-currency prices** — price entries for every currency pair in the credential.

---

## Re-Running the Job

Running the same job again performs an **upsert** — existing products in Shopware are updated, not duplicated. The connector uses a stored ID mapping table to match UnoPim products to their Shopware counterparts.

> [!WARNING]
> A product missing a **required field** (Product Number, Tax ID, Net Price, Gross Price, or Stock) is **skipped** rather than failing the entire batch. Check the Job Tracker log for skipped products and their error messages.
