# Running an XML Product Import

Once you have an active Mapping Template, you can create and run XML product import jobs through UnoPim's standard Data Transfer pipeline.

## Open the Imports Section

Go to:

`Data Transfer → Imports`

Click **Create Import** in the top-right corner.

## Create an XML Import Job

Fill in the following details:

**Import Job Code**

A unique code to identify this import job.

**Import Job Type**

Select **XML Product Import** from the dropdown.

## Import Filters

After selecting the job type, configure the following filters:

| Filter | Description |
|---|---|
| **Template** | Select the active Mapping Template that defines how the XML maps to UnoPim attributes. |
| **Channel** | Select the UnoPim channel to import products into. |
| **Locale** | Select the locale for localizable attribute values. |
| **Currency** | Select the currency for price attributes. |
| **Product Type** | Select the UnoPim product type (e.g. Simple, Configurable). |
| **Attribute Family** | Select the attribute family to assign to imported products. |
| **Attribute Group** | Select the attribute group within the chosen family. |

All filters are required — the import will not validate without all of them set.

> [!NOTE]
> The **Template** dropdown only shows templates that are currently **active**. If your template is not listed, go to **XML Connector → Mapping Templates** and activate it first.

## Upload the XML File

After configuring the filters, upload the XML file containing the full product data you want to import. This is the actual data file — it should follow the same XML structure as the sample file used when creating the Mapping Template.

## Save and Run

Click **Save Import** to create the job. Then click **Run** to start the import.

You can monitor the job's progress from the **Job Tracker** — navigate to `Data Transfer → Job Tracker` to see the status, number of processed records, and any errors.

## Error Report

If some records fail to import (e.g. missing required attributes, invalid values), the Job Tracker will provide a downloadable error report. The report is an XLSX file that includes all failed rows along with the specific error message for each row, making it easy to identify and fix issues before re-importing.

## Sample XML File

A sample XML file is available for reference inside the package at:

```
data-transfer/samples/products.xml
```

Use this as a starting point to understand the expected XML structure when building your Mapping Template.
