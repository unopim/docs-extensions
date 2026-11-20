# Attribute Export

The **Shopware Attributes** export job pushes UnoPim attributes to Shopware as **property groups**. It exports only the attributes selected under **Attributes to be used as Product Properties** in the credential's [Other Mapping](./other-mapping), plus every attribute used as a variant (super) attribute by a configurable product. Other attributes are not exported.

Export attributes before exporting attribute options, and before running product export jobs that rely on property values.

---

## Open the Export Jobs Section

Go to:

`Data Transfer → Exports`

![Exports Navigation](./images/export/data-trasnfer.png)

Click **Create Export** in the top-right corner.

![Create Export Button](./images/export/create-export.png)

---

## Create an Attribute Export Job

While creating the export job:

1. Enter a unique **Export Job Code** to identify this job (e.g. `shopware-attributes`).
2. Select **Shopware Attributes** as the export job type.

![Attribute Export Job Type](./images/export/attribute-export.png)

---

## Configure Filters

After selecting the job type, configure the filters:

| Filter | Description |
|---|---|
| **Shopware Credential** | Required. Select the Shopware store connection to export to. Only active credentials appear in this list. |
| **Channel** / **Locale** | Shown on the form, but not used by this job in the current version. Translations are sent for every locale in the credential's Locale Mapping. |
| **Filter By Code** | Optional. Export only the listed attribute codes. |


---

## Save and Run

Click **Save Export** to create the job.

To run the job, open it from the exports list and click **Export Now**.

Once the job completes, you can monitor the result in the **Job Tracker** — it will show the number of attributes created or updated in Shopware.

![Attribute Export Complete](./images/export/run-save-export.png)

---

## What Gets Exported

Each UnoPim attribute is pushed to Shopware as a **property group** with:
- The attribute name (translated per each mapped locale)
- The attribute code used as the Shopware property-group identifier

> [!NOTE]
> After a successful attribute export, run the **Shopware Attribute Options** export to push the individual values (property-group options) for each attribute.
