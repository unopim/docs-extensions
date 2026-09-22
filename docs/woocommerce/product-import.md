# Product Import

The UnoPim WooCommerce Connector allows users to import WooCommerce products into UnoPim by creating an import profile.

## Open the Import Section

To create an import job, go to:

`Import > Create Import Profile`

![Import Navigation](assets/jobs/data-transfer-import.png)

From there, click **Create Import** to open the import setup form.

![Create Import Job](assets/jobs/create-import.png)

## Create a Product Import Job

While creating the import job, the user needs to:

- Enter the **Code**.
- Select **WooCommerce Product Import** as the import type.

![Product Import Job](assets/jobs/product-import.png)

## Product Import Settings

Under **Settings**, configure the following:

- **WooCommerce Store URL**: Select the required WooCommerce store credentials.
- **Locale**: Select the locale to be used during import.
- **Channel**: Select the channel for importing products.
- **Currency**: Select the currency to be used during import.
- **Family**: Select the family to which the imported products should belong.
- **With Media**: Enable this option if product media should also be imported.
- **WooCommerce Product SKUs (comma separated)**: Optionally limit the import to specific products by entering their SKUs.

![Product Import Settings](assets/jobs/product-import-filter.png)

After entering the required values, click **Save Import** to save the import profile.

Once the job is executed, the imported products will be available in UnoPim.

![Product Import Complete](assets/jobs/product-import-complete.png)
