# Other Mappings

Beyond the core [Attribute Mapping](./attribute-mapping.md), the connector provides an **Other Mappings** screen that groups three additional, optional mappings into tabs.

Open it from **ERPNext → Other Mappings**. The screen has three tabs:

- **Custom Attribute**
- **Brand**
- **Media**

## Custom Attribute Mapping

Use this tab to push UnoPim attributes into **custom fields** on the ERPNext Item doctype - fields that don't exist in ERPNext out of the box. The connector **auto-creates the underlying custom fields** on the ERPNext side when you run the Export Attributes job.

### How it works

| Column | Purpose |
| --- | --- |
| **Name** | The UnoPim attribute you want to send to ERPNext as a custom field. |
| **Type** | The attribute's type in UnoPim. |
| **Code** | The field code that will be created on the ERPNext Item doctype. |

Tick the UnoPim attributes that should be created as custom fields on the ERPNext Item doctype during export, then click **Save**.

The custom fields are created in ERPNext by the [Export Attributes](./export-attributes.md) job, not when you save. Each field is named `custom_<attribute code>`. Media attributes (image, file, gallery, asset) cannot be used here and are dropped on save.

> [!WARNING]
> If you untick an attribute, the next **Export Attributes** run deletes its `custom_<attribute code>` field from the ERPNext Item doctype, together with the values stored in it.

### Create a Custom Tab in ERPNext (optional)

You can group the selected custom fields into a dedicated **tab** on the ERPNext Item form:

| Field | What to enter |
| --- | --- |
| **Tab Label** | The name of the new tab (e.g. `PIM Attributes`). |
| **Insert Tab After** | Pick an existing **Tab Break** on the Item form - the new tab is placed immediately after it. |

The screen shows the current **tab sync status** so you can confirm the tab was created in ERPNext.

## Brand Mapping

Use this tab to tell the connector which UnoPim attribute represents the **brand**. Its options are synced as ERPNext **Brand** records during brand export/import.

1. Pick a UnoPim **select** or **multiselect** attribute as the **UnoPim Brand Attribute**.
2. Click **Save**.

> **Note:** Brand export and import jobs both rely on this mapping. Set it before running the [Export Brands](./export-brands.md) or [Import Brands](./import-brands.md) jobs.

## Media Mapping

Use this tab to map UnoPim **media attributes** to ERPNext file fields, so product images sync correctly during export.

| Column | Purpose |
| --- | --- |
| **ERPNext Media Slot** | The ERPNext file field that receives the image. |
| **UnoPim Attribute** | The UnoPim media attribute that supplies the image. |

The available slots are:

| ERPNext Media Slot | Accepted UnoPim attribute types |
| --- | --- |
| **Primary Image** | Image, Asset |
| **Website Image** | Image, Asset |
| **Thumbnail** | Image, Asset |
| **Attachments / Gallery** | Image, Asset, Gallery, File (multiple attributes allowed). All files are attached to the Item. |

Choose the UnoPim attribute for each ERPNext media slot and click **Save**.

