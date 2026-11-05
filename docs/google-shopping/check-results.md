---
editLink: false
---

# Check Results

After an export, check two places: UnoPim (did the job send the products?) and Merchant Center (did Google accept them?).

## 1 · In UnoPim

Open **Data Transfer → Job Tracker** and click your export.

| You see | Meaning |
|---|---|
| **Pending** for a long time | No queue worker is running. Start `php artisan google-shopping:queue:work`. |
| **Processing** | The export is running. |
| **Completed** | The export finished. Check the counts. |
| **Failed** | Open the log for the error. See [Troubleshooting](./troubleshooting). |

When the job completes, it shows how many products were **created**, **updated**, **skipped** and **failed** (and **deleted**, for delete jobs). Download the job's **log file** to see the reason for each skipped or failed product. Common reasons:

- **SKU too long**: the SKU is over Google's 50-character limit.
- **Duplicate**: the same SKU appeared twice in one batch.
- **Category warning**: the product's categories aren't mapped. It still exported, using the default Google category.
- **Google error**: Google rejected the product. The message explains why.

## 2 · In Merchant Center

1. Open [merchants.google.com](https://merchants.google.com/) and go to **Products → All products**.
2. Your products should appear within a few minutes. The data source is named **UnoPim (…)**.
3. Google then reviews each product, which can take **up to 3 business days** for a new account. Products move through **Pending**, then **Approved** or **Not approved**.

### Products marked "Not approved" or "Limited"

Click a product to see Google's reason. The most common ones, and where to fix them:

| Google's issue | Fix in UnoPim |
|---|---|
| Missing or invalid **link** / **landing page** | Set the **Storefront Base URL** to your verified website ([step 6](./required-settings#how-the-product-link-is-built)), and make sure the product page exists. |
| **Unverified website** or **unclaimed website** | Verify and claim the site in Merchant Center ([step 1.6](./google-merchant-center#_1-6-verify-and-claim-your-website)). |
| Missing **GTIN** / **brand** | Map **GTIN** and **Brand**, or set **Identifier Exist** to `no` ([step 7](./attribute-mapping)). |
| **Image** couldn't be crawled | The image URL must be public. Check that your UnoPim (or DAM / S3) images open in a private browser window. |
| **Price** mismatch / wrong currency | Export with the currency of the target country. |

After you fix the data in UnoPim, run the export again. Google re-reviews the updated products.
