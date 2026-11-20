# Exporting Data

The UnoPim Bagisto Connector provides comprehensive export functionality, allowing users to seamlessly export mapped data from UnoPim to their Bagisto store through dedicated export jobs.

## Available Export Types

The connector supports the following export job types:
- **Bagisto Product Export** - Export products with advanced filtering options
- **Bagisto Attribute Export** - Export attribute configurations
- **Bagisto Attribute Family Export** - Export attribute family structures
- **Bagisto Category Export** - Export category hierarchies and meta information
## Setting Up Export Jobs

To configure an export job:

1. Navigate to **Data Transfer > Exports**

![Exports Navigation](assets/Data-Transfer/data-transfer.png)

2. Click on the **Create Export** button
3. You'll be redirected to the export job creation page

![Create Export Job](assets/Data-Transfer/create-export-job.png)

## Export Job Configuration

### Basic Information

- **Export Job Code** - Enter a unique identifier for your export job
- **Type of Export Job** - Select the export type from the dropdown menu

### Bagisto Product Export

The Bagisto Product export allows you to export products from UnoPim to your Bagisto store with advanced filtering options.

![Product Export Job](assets/Data-Transfer/export-fields.png)

#### Available Filters

Configure the following filters to customize your product export:

- **Bagisto Credentials** - Select the Bagisto store credential to export to
- **Select Mapping Template** - Choose the mapping template for attribute mapping
- **Channel** - Select one or more UnoPim channels. Only channels mapped on the credential's [Channel Mapping](./credentials-setup#step-4-map-channels-locales-and-filterable-attributes) are exported
- **Locale** - Select one or more UnoPim locales. Only locales mapped on the credential are exported
- **Family** - Select the product family or leave blank for all families
- **Product Type** - Specify the type of products to export
- **Product Status** - **All**, **Enabled (True)** or **Disabled (False)**
- **With Media** - Enable or disable media export (images, attachments, etc.)
- **Filter By SKU** - Comma-separated list of SKUs to export
- **Start Page** - Specify the starting page number for pagination
- **End Page** - Specify the ending page number for pagination

![Product Export Filters](assets/Data-Transfer/filters.png)

> [!WARNING]
> The credential, channel/locale filters and mapping template of the last run are cached. When you switch store or mapping template between runs, re-save the export job and run `php artisan cache:clear` first. See [Multiple Store Support](./credentials-setup#multiple-store-support).

## Saving and Running the Export Job

1. Click the **Save Export** button to save the export job configuration

![Save Export Job](assets/Data-Transfer/save-export.png)

2. Run the export job by clicking the **Run** button

![Run Export Job](assets/Data-Transfer/export-now.png)

3. Monitor the export progress in the **Job Tracker**

![Job Tracker](assets/Data-Transfer/monitor-jobs.png)

The Job Tracker provides real-time visibility into the export process, including progress percentage, status updates, and any errors encountered during execution.
