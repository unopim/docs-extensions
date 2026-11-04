# UnoPim Commercetools Connector

The **UnoPim Commercetools Connector** connects your [commercetools](https://commercetools.com/) project with UnoPim. You keep your product information in UnoPim and send it to commercetools whenever you are ready, or bring existing commercetools data back into UnoPim so you don't have to enter it again by hand.

The connector works in both directions. Attribute families, categories and products go from UnoPim to commercetools, and product types, categories and products come back from commercetools into UnoPim. Every sync runs as a standard UnoPim **Data Transfer** job.

## How it works

```
  commercetools API Client
  (project key, client ID, secret, region, scopes)
         │
         ▼
  Commercetools Connection
  (checked live against commercetools on save)
         │
         ▼
  Attribute Mapping & Category Mapping
  (SKU, Key, Name, Slug, Price, Inventory, Images…)
         │
         ▼
  ┌──────────────────────────────────────────┐
  │              Data Transfer               │
  │                                          │
  │  Export: Families → Categories → Products│
  │  Import: Families → Categories → Products│
  └──────────────────────────────────────────┘
```

## Key features

- **Two-way sync** — export families, categories and products to commercetools, and import product types, categories and products back.
- **Simple and configurable products** — a configurable product is sent as one commercetools product with its variants. New variants added in UnoPim are added on the next export.
- **Attribute families as product types** — each UnoPim attribute family is exported as a commercetools product type, with its attributes and option labels.
- **Category tree sync** — parent categories are always created before their children, so the tree matches on both sides.
- **Attribute mapping with fixed values** — map each commercetools product field (SKU, key, name, slug, description, SEO fields, search keywords, price, inventory, images) to a UnoPim attribute, or send a fixed value instead.
- **Category mapping and custom fields** — choose which UnoPim category fields feed the commercetools name, slug and description, and send other category fields as commercetools custom fields.
- **Inventory quantity** — send a stock quantity from a UnoPim attribute to commercetools inventory entries, and read it back on import.
- **Images, galleries and DAM assets** — send images from image, gallery and (with UnoPim DAM installed) asset attributes. Image export can be switched on or off per job.
- **Same filters as the UnoPim product export** — channel, locales, currencies, attributes, families, categories, completeness, time condition, status, SKUs and attribute conditions.
- **Multi-language** — each record is created once in commercetools, with its values stored in every selected locale.
- **Update instead of duplicate** — re-running an export or import updates the records it already synced.
- **Multiple commercetools projects** — create one connection per project and switch each one on or off on its own.
- **Change history** — every change to a connection and its mappings is recorded in the connection's **History** tab. The client secret is never stored there.
- **Role-based access** — separate permissions for connections, testing and mappings.

## Requirements

| Requirement | Version |
|---|---|
| **UnoPim** | 3.1.x (compatible with 3.0.x) |
| **PHP** | 8.4.1 or higher |
| **Laravel** | 13.x |
| **commercetools** | A project with an API client. See [commercetools API Client](./commercetools-setup). |
| **UnoPim DAM** | Optional, only needed to map product images to a DAM asset attribute |

A running queue worker is required, because export and import jobs are dispatched to the queue.

## In this guide

- [commercetools API Client](./commercetools-setup)
- [Installation](./installation)
- [Setup Commercetools Connection](./setup)
- [Attribute Mapping](./attribute-mapping)
- [Category Mapping](./category-mapping)
- [Connector Settings](./configuration)
- [Export: Families](./export-families)
- [Export: Categories](./export-categories)
- [Export: Products](./export-products)
- [Import: Families](./import-families)
- [Import: Categories](./import-categories)
- [Import: Products](./import-products)
