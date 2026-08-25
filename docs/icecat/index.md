# UnoPim Icecat Connector

The **UnoPim Icecat Connector** enriches your product catalog by pulling structured data directly from the [Icecat Open Catalog](https://icecat.us/). It imports specifications, descriptions, images, and other product details to help you maintain accurate and consistent product information at scale.

Products can be enriched in bulk via the **Icecat Import Enrich Product** job, or individually from the product edit page via **More → Icecat Fetch**.

The connector is designed for **simple products** and matches Icecat content using unique identifiers such as EAN, Brand, or Product Code.

## How it works

```
  Icecat Credentials
         │
         ▼
  Common Attribute Mapping
  (EAN, Brand, Name, Images…)
         │
         ▼
  Icecat Feature Mapping Import job
  (import all Icecat specification fields)
         │
         ▼
  Feature Mapping & Attribute Type Setup
  (select features, assign UnoPim types)
         │
         ▼
  Icecat Attribute Import job
  (create UnoPim attributes from features)
         │
         ▼
  ┌──────────────────────────────────────┐
  │         Product Enrichment           │
  │                                      │
  │  Bulk: Icecat Import Enrich Product  │
  │  Single: More → Icecat Fetch         │
  └──────────────────────────────────────┘
```

## Key features

- **Product matching via identifiers** — match products using EAN, Product Code, and Brand for accurate data enrichment.
- **Common attribute mapping** — map core Icecat fields (EAN, Product Code, Vendor/Brand, Name, Title, Description, Short Description, Summary Description, Short Summary Description, Pictures) to UnoPim attributes.
- **Bulk feature mapping import** — import a large set of Icecat feature attributes via the Icecat Feature Mapping Import job.
- **Feature mapping & attribute setup** — select required Icecat feature attributes and assign UnoPim attribute types (text, select, textarea, etc.) to structure specification data.
- **Attribute import & mapping** — auto-create UnoPim attributes from selected Icecat features via the Icecat Attribute Import job, then map them for synchronization.
- **Bulk and single enrichment** — enrich products in bulk through a dedicated import job, or fetch data for a single product directly from its edit page.
- **Locale mapping** — map Icecat locales to UnoPim locales for multilingual product data enrichment.
- **Simple product support** — focused, reliable enrichment for simple product types.

## Requirements

- UnoPim **v1.0.0** or higher
- An active [Icecat](https://icecat.us/) account (username and password)
- A running Laravel queue worker (bulk enrichment jobs are dispatched to the queue)

## In this guide

- [Installation](./installation)
- [Configuration](./configuration)
- [Usage](./usage)
