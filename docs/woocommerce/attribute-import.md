# Attribute Import

The UnoPim WooCommerce Connector allows users to import WooCommerce attributes into UnoPim by creating an import profile.

## Open the Import Section

To create an import job, go to:

`Data Transfer > Imports`

From there, click **Create Import** in the top-right corner to open the import setup form.

![Imports Navigation](assets/jobs/create-Imports.png)

## Create an Attribute Import Job

While creating the import job, the user needs to:

- Enter the **Code**.
- Select **WooCommerce Attribute Import** as the import type.

![Attribute Import Job Type](assets/jobs/Fiters-attribute-import.png)

## Attribute Import Settings

Under **Settings**, configure the following:

- **WooCommerce Store URL**: Select the required WooCommerce store credentials.
- **Locale**: Select the locale to be used during import.

![Attribute Import Settings](assets/jobs/attribute-import-and-settings.png)

After entering the required values, click **Save changes** to save the import profile.

Once the job is executed, the imported attributes will be available in UnoPim.

![Attribute Import Complete](assets/jobs/attribute-import-complition.png)

## Brand Import

The **WooCommerce Brand Import** type imports WooCommerce product brands into UnoPim as options of a select or multiselect attribute. Its settings are:

- **WooCommerce Store URL**: Select the required WooCommerce store credentials.
- **Locale**: The locale for the option labels.
- **Brand Name (comma separated)**: Optionally enter the names of specific brands to import.
- **Brand Attribute**: Required. The UnoPim select or multiselect attribute that receives the brands as options.
