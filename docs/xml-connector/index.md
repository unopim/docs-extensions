# UnoPim XML Connector

The **UnoPim XML Connector** lets you import products into UnoPim from any XML file. You define how the XML maps to your UnoPim catalog once — using a reusable **Mapping Template** — and then run import jobs using that template whenever you have new data.

## How It Works

```
Upload an XML file  →  Specify the product tag name
        ↓
Map each XML field to a UnoPim attribute
        ↓
Activate the Mapping Template
        ↓
Go to Data Transfer → Imports → Create Import
        ↓
Select "XML Product Import" and choose your template
        ↓
Run the job — products are created or updated in UnoPim
```

## Features

- **Mapping Templates** — upload a sample XML file and map its tags to UnoPim attributes. Templates are reusable across multiple import jobs.
- **Flexible XML structure** — configure the product tag name and the parent wrapper tag to match any XML schema.
- **Full attribute mapping** — map XML tags to any UnoPim attribute (text, select, multiselect, boolean, price, etc.).
- **Category mapping** — map an XML field to the UnoPim category tree.
- **Image support** — designate an XML field as the product image source.
- **Multi-value delimiter** — choose comma, semicolon, pipe, or tab as the separator for multi-value fields.
- **Template activation control** — templates must be activated before they can be used in import jobs. Inactive templates are excluded from job dropdowns.
- **Mass actions** — mass activate/deactivate and mass delete templates from the listing grid.
- **Change history** — full audit trail of template mapping changes.
- **Role-based access control** — granular permissions for view, create, edit, delete, mass update, mass delete, and toggle status.

## Requirements

| Requirement | Version |
|---|---|
| **UnoPim** | 2.0.0 or higher |
| **PHP** | 8.3 or higher (< 8.5) |
| **Laravel** | 12.x |

## In This Guide

- [Installation](./installation)
- [Mapping Templates](./mapping-templates)
- [Running an Import Job](./import-job)
- [Support](./support)
