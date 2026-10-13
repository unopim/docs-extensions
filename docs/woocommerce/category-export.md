# Category Export

The UnoPim WooCommerce Connector allows users to export category data from UnoPim to WooCommerce through dedicated export jobs.

## Open the Export Jobs Section

To create a category export job, go to:

`Data Transfer > Exports`

From the Exports page, click **Create Export** in the top-right corner.

![Exports Navigation](assets/jobs/create-Exports.png)

## Create a Category Export Job

While creating the export job, the user needs to:

- Enter the **Export Job Code**.
- Select **WooCommerce Category Export** as the export job type.

![Category Export Job](assets/jobs/Create-category-Export.png)

## Category Export Filters

After selecting the category export job type, configure the following options:

- **WooCommerce Store URL**: Select the required WooCommerce store credentials.
- **With Media**: Enable this option if category images should also be exported.
- **Locale**: Select the required locale.
- **Categories**: Optionally restrict the export to specific categories.

![Category Export Filters](assets/jobs/category-filter-2.png)

## Save and Run the Export Job

After filling in the required details, click **Save changes** to create and save the export job.

Once the job is run, the export progress can be viewed from the **Job Tracker**.

![Job Tracker](assets/jobs/after-category-export.png)

After the export completes successfully, the categories will be available in the connected WooCommerce store.
