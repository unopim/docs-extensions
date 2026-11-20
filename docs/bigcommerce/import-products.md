# Import products

Pull BigCommerce products into UnoPim - both **simple products** and **configurable products** (variable products in BigCommerce terminology) come in through the same job.

> **Before you start.** Add a [BigCommerce credential](./credentials) and run [Import categories](./import-categories) so the products land with all of their category links intact.

**Open it from:** *Data Transfer → Import*

![Create import profile page](./assets/import/data-transfer.png)

## Steps

### 1. Create the profile

1. Open **Data Transfer → Import → + Create Import**.

![Create import profile form](./assets/import/create-import.png)

2. **Type** - pick **Import Products from BigCommerce**, **Code** - any short identifier, e.g. `bigcommerce_products_import`.

![Import profile form filled](./assets/import/product-import.png)

3. **Set the import filters**

Pick the store in the **Settings** panel on the right of the form:

| Filter | Required | What it does |
|--|--|--|
| **BigCommerce Credential** | ✓ | Which BigCommerce store to pull from. Only **active** credentials appear in the dropdown. |

![Import profile filters](./assets/import/product-imprt-filter.png)

The **Filter** card below the general fields adds:

| Filter | Default | What it does |
|--|--|--|
| **BigCommerce Categories** | empty | Import only products BigCommerce files under the selected categories. Empty imports every product. |
| **Include Sub-categories** | off | Also import products filed under any category beneath the selected ones. |
| **Import with Media** | on | Download product images. Off leaves images out. |

![Import Filter card](./assets/import/import-filters.png)

> [!NOTE]
> The category picker shows UnoPim categories. Each selected category is matched to its BigCommerce category through the category already imported or exported, or by name. A category that cannot be matched is named in the job log and ignored. There are no field, status, or date filters; both **simple** and **configurable** (variable) products come in through this one job.

Click **Save Import**.

4. **Run it**

Open the profile and click **Start Import**.

![Start import button](./assets/import/product-import-now.png)

The job is queued. Watch progress in the Data Transfer Tracker.


![Tracker import progress](./assets/import/product-import-progress.png)
