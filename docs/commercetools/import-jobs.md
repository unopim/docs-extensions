# Creating an Import Job

Import jobs bring your existing commercetools data into UnoPim, so you don't have to enter it again by hand.

Go to **Data Transfer → Imports → Create Import**.

There are three types of import jobs available:

| Import Type | What it does |
|---|---|
| **Commercetools Family Import** | Imports commercetools product types as UnoPim attribute families, with their attribute groups, attributes and options |
| **Commercetools Category Import** | Imports the commercetools category tree as UnoPim categories |
| **Commercetools Product Import** | Imports commercetools products and their variants, including product images |

> **Tip:** Run the imports in this order the first time: **families first, then categories, then products**. Products need their attribute family and categories to exist in UnoPim.

---

## Create an Import Job

1. Click **Create Import**.
2. Enter a unique **Code** (e.g., `commercetools-product-import`) and select the **Type**.
3. Fill in the filters:

| Filter | What to do |
|---|---|
| **Commercetools Connection** | Select the connection to import from. Only active connections are listed. |
| **Source Channel** | *(Product import only)* Select the UnoPim channel the imported product values are saved to |
| **Locales to Import** | Select the locales whose values you want to bring in |
| **Only changed since last sync** | *(Product import only)* Tick to import only products changed since the last successful import |

4. Click **Save Import**, then click **Import Now**.

The import runs in the background. When it's done, the status changes to **Completed** and you'll see how many records were created, updated and skipped.

---

## Things to Know

- **Re-running an import** - records that were imported before are matched again, so they are updated instead of duplicated.
- **Categories** - parent categories are imported before their children. A category whose parent can't be found is skipped.
- **Product images** - images are downloaded from commercetools and saved to your UnoPim storage as part of the product import.
