# Zapier Connector

The **UnoPim Zapier Connector** puts your catalog on [Zapier](https://zapier.com/apps/unopim/integrations). A product, category, attribute or family change in UnoPim starts a workflow in any of the thousands of apps Zapier integrates with - Slack, Google Sheets, Shopify, Asana, Mailchimp, HubSpot, Airtable - without writing an integration per tool.

Every trigger is an **instant REST Hook**. UnoPim pushes the moment a record changes, so there is no polling interval to tune and no delay to explain.

<br>

<div align="center">
  <img src="./assets/intro-banner.png" alt="UnoPim Zapier Connector: a Zap whose trigger is a Product Updated event from UnoPim, fanning out to Slack, Google Sheets, Shopify and Asana" width="100%" style="max-height:330px; object-fit:cover; border-radius:18px;" />
</div>

<br>

## What you can do

- **Trigger a Zap on any catalog change** - 17 instant triggers covering creates, updates and deletes for **products**, **categories**, **attributes** and **families**.
- **Watch everything with one Zap** - five wildcard triggers, including *Changed Catalog Record*, so you do not build twelve near-identical Zaps.
- **Write back into UnoPim** - Create Product, Update Product and Find Product actions, driven by any other app in your stack.
- **Map fields without nesting** - product values are flattened onto one namespace, so a delivered payload carries `description__en_US` and `price__default__en_US` as plain top-level fields.
- **Narrow the payload** - pick a locale and channel per connection when you only care about one storefront.
- **Filter on what changed** - update payloads carry a `changes` object, so a Zap can react to a price change rather than to any change at all.
- **See every delivery** - the [Delivery Logs](./delivery-logs) page records status, HTTP code, duration, target host, the payload as sent and the response that came back.
- **Zero admin upkeep** - Zaps register themselves when switched on and disconnect themselves when switched off.

## The 17 triggers at a glance

Twelve concrete events:

| Entity | Events |
|---|---|
| **Product** | `product.created` · `product.updated` · `product.deleted` |
| **Category** | `category.created` · `category.updated` · `category.deleted` |
| **Attribute** | `attribute.created` · `attribute.updated` · `attribute.deleted` |
| **Family** | `family.created` · `family.updated` · `family.deleted` |

Plus five wildcards, for a Zap that cares *something* changed rather than exactly what:

| Key | Fires on |
|---|---|
| `product.any` | all three product events |
| `category.any` | all three category events |
| `attribute.any` | all three attribute events |
| `family.any` | all three family events |
| `catalog.any` | all twelve concrete events |

Every wildcard payload carries `entity` and `reference`, so one Zap listening on `catalog.any` can still tell a product from a family. See [Triggers](./triggers) for the full detail.

## The 3 write operations

| Operation | Type | Endpoint |
|---|---|---|
| **Create Product** | Action | `POST /api/v1/rest/products` |
| **Update Product** | Action | `PATCH /api/v1/rest/products/{sku}` |
| **Find Product** | Search | `GET /api/v1/rest/products/{sku}` |

These call UnoPim's existing REST API, so the connector package adds no code for them. See [Actions](./actions).

## This is not a bulk sync engine

Zapier bills per task. A 50,000-SKU catalog on a three-step Zap is **150,000 tasks per run**, which no plan makes affordable.

Use this connector for **per-record, event-driven side effects**: notify a channel, log a change, open a task, update one storefront record. Use UnoPim's own **importers and exporters** for volume - they batch, they retry, and they have a mapping UI.

Both tools work well when used for the job they fit.

## Before you start

You need:

1. A working **UnoPim** installation reachable over **public HTTPS**. Zapier's servers call your instance directly, so `localhost` and private addresses will not work.
2. The **Zapier Connector** package installed - see [Installation](./installation).
3. A **queue worker on the `zapier` queue**. Deliveries are queued; without a worker **no trigger ever fires**.
4. An **API key** under *Configuration → Integrations* - see [Connect UnoPim in Zapier](./credentials).
5. A **Zapier account**. The free plan is enough to build and test.

## Requirements

| Requirement | Details |
|---|---|
| **UnoPim** | 3.0+ (Laravel 13) |
| **PHP** | 8.4.1+ |
| **Node** | 22+ and npm 10+, only if you deploy the Zapier app yourself |
| **Network** | UnoPim reachable at a public `https://` address; plain HTTP is refused |
| **Queue** | A worker running `php artisan queue:work --queue=zapier` |
