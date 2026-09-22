# Attribute Export

The UnoPim WooCommerce Connector allows users to export attribute data from UnoPim to WooCommerce through dedicated export jobs.

## Open the Export Jobs Section

To create an attribute export job, go to:

`Data Transfer > Exports`

![Exports Navigation](assets/jobs/Data-trnsfer.png)

From the Exports page, click **Create Export** in the top-right corner.

![Create Export Job](assets/jobs/create-export.png)

## Create an Attribute Export Job

While creating the export job, the user needs to:

- Enter the **Export Job Code**.
- Select **WooCommerce Attribute Export** as the export job type.

![Attribute Export Job](assets/jobs/attribute-export.png)

## Attribute Export Filters

After selecting the attribute export job type, configure the following filters as needed:

- **WooCommerce Store URL**: Select the required WooCommerce store credentials.
- **Additional Attribute for Mapping**: Select the additional attribute that should be used for mapping during export.

![Attribute Export Filters](assets/jobs/attribute-fields.png)

## Save and Run the Export Job

After completing the required fields, click **Save Export** to create and save the export job.

Once the job is run, the export progress can be tracked from the **Job Tracker**.

![Job Tracker](assets/jobs/attribute-complete.png)

After the export completes successfully, the selected attributes will be available in the connected WooCommerce store.
