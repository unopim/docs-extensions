# UnoPim ERPNext Connector

Store Link: [View on Webkul Store](https://store.webkul.com/unopim-erpnext-connector.html)

The **UnoPim ERPNext Connector** bridges your **ERPNext / Frappe** instance and **UnoPim** - letting you manage your entire product catalog from one place and keep it in sync with ERPNext in both directions.

Instead of maintaining products in two systems separately, you enrich everything in UnoPim - categories, products, attributes, brands, and images - and the connector takes care of pushing it into ERPNext (and pulling existing ERPNext data back) accurately and efficiently.

## What Can It Do?

The connector works in two directions:

- **Export** - push your catalog data from UnoPim into ERPNext
- **Import** - pull existing data from ERPNext back into UnoPim

Everything runs on UnoPim's existing **Data Transfer** pipeline, so every export and import is a tracked job with logs, batches, and progress.

## Features

### Export

Everything you build in UnoPim can be exported to ERPNext:

- **Categories** - export UnoPim categories as ERPNext **Item Groups**.
- **Attributes and Options** - export UnoPim attributes and their selectable options as ERPNext **Item Attributes**.
- **Brands** - export the options of your brand attribute as ERPNext **Brand** records.
- **Products** - export your full product catalog, including simple and variant products, with attributes, images, and pricing, as ERPNext **Items**.
- **Targeted Export** - need to export just a few products? Use their **SKU** in the product filter to export specific items without running a full catalog export.
- **Update Existing Records** - re-run an export job at any time. Sync mappings keep identity across runs, so re-syncs update existing records instead of creating duplicates.

### Mapping & Configuration

Before exporting, you can set up mappings so data lands in the right ERPNext fields:

- **Attribute Mapping** - map UnoPim attributes to ERPNext Item fields, with optional **fixed values** for export-only fields.
- **Custom Attribute Mapping** - map UnoPim attributes to ERPNext **custom fields**, auto-created on the ERPNext Item doctype during export.
- **Brand Mapping** - pick which UnoPim select-type attribute represents the brand.
- **Media Mapping** - map UnoPim media attributes to ERPNext file fields for product image sync.

### Import

You can also bring data from ERPNext into UnoPim using the following import job types:

- Item Groups → Categories
- Item Attributes → Attributes
- Brands → Brand options
- Items → Products

### Job Tracking

Every export and import is a tracked Data Transfer job. The **Job Tracker** surfaces live **Created / Updated / Skipped** counts and a full log for every run, so you always know exactly what happened.

### Conflict Resolution

- **Skip unchanged records** - a product export skips an Item when the UnoPim product has not changed since its last sync; a product import skips an Item when its ERPNext `modified` timestamp has not changed since the last import.
- There is no two-way merge. When a record changed on both sides, the job you run wins: an export overwrites the mapped ERPNext fields, an import overwrites the UnoPim values.
- Sync mappings persist identity across runs, so re-syncs update existing records instead of creating duplicates.

## Requirements

| Requirement | Version |
|---|---|
| **UnoPim** | 3.x (3.0.0 or later) |
| **PHP** | 8.4.1 or later |
| **ERPNext / Frappe** | Any instance reachable over HTTPS with API access |

> **Please Note:**
> - The connector authenticates with ERPNext using an **API Key** and **API Secret** (token-based auth).
> - Brand sync requires a UnoPim **select / multiselect** attribute chosen in Brand Mapping.
> - The `HSN/SAC Code` (`gst_hsn_code`) field is mandatory on India-localized ERPNext instances and is a required field in attribute mapping.

## REST API

The connector also registers REST endpoints under `/api/erpnext`, authenticated with a UnoPim API (OAuth) access token:

| Method | Endpoint | Purpose |
|---|---|---|
| `GET`, `POST` | `/api/erpnext/credentials` | List or create credentials. |
| `GET`, `PUT`, `DELETE` | `/api/erpnext/credentials/{id}` | Show, update, or delete a credential. |
| `POST` | `/api/erpnext/credentials/{id}/test` | Test the connection. |
| `GET`, `POST` | `/api/erpnext/attribute-mappings` | List or create attribute mappings. |
| `PUT`, `DELETE` | `/api/erpnext/attribute-mappings/{id}` | Update or delete an attribute mapping. |
| `GET`, `POST` | `/api/erpnext/custom-attribute-mappings` | List or create custom attribute mappings. |
| `DELETE` | `/api/erpnext/custom-attribute-mappings/{id}` | Delete a custom attribute mapping. |
| `GET`, `POST` | `/api/erpnext/brand-mappings` | List or create brand mappings. |
| `PUT`, `DELETE` | `/api/erpnext/brand-mappings/{id}` | Update or delete a brand mapping. |
| `POST` | `/api/erpnext/sync/{entity}` | Start an export job. `{entity}` is `categories`, `attributes`, `brands`, or `products`. |
| `POST` | `/api/erpnext/import/{entity}` | Start an import job for the same entities. |
| `GET` | `/api/erpnext/jobs/{jobId}` | Job status. |
| `GET` | `/api/erpnext/sync/products/{sku}/status` | Sync status of one product. |
| `GET` | `/api/erpnext/logs/products` | Product sync logs. |
