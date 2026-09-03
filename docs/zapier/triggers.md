# Triggers

Seventeen triggers, all **instant REST Hooks**. UnoPim pushes the moment a record changes - nothing polls, so there is no interval to tune and no delay to explain.

A Zap subscribes itself when you switch it on and unsubscribes itself when you switch it off. There is nothing to register by hand.

## The twelve concrete events

| Trigger in Zapier | Event key | Fires when |
|---|---|---|
| **New Product** | `product.created` | A product is created. |
| **Updated Product** | `product.updated` | A product is saved with changes. |
| **Deleted Product** | `product.deleted` | A product is deleted. The payload is captured *before* the row is removed, so the full record is still available. |
| **New Category** | `category.created` | A category is created. |
| **Updated Category** | `category.updated` | A category is updated. |
| **Deleted Category** | `category.deleted` | A category is deleted. |
| **New Attribute** | `attribute.created` | An attribute is created. Useful for governance - new attributes are how a catalog schema drifts. |
| **Updated Attribute** | `attribute.updated` | An attribute is updated. |
| **Deleted Attribute** | `attribute.deleted` | An attribute is deleted. |
| **New Family** | `family.created` | An attribute family is created. |
| **Updated Family** | `family.updated` | An attribute family is updated. |
| **Deleted Family** | `family.deleted` | An attribute family is deleted. |

## The five wildcards

For a Zap that cares *something* changed rather than exactly what.

| Trigger in Zapier | Event key | Fires on |
|---|---|---|
| **Changed Product** | `product.any` | all three product events |
| **Changed Category** | `category.any` | all three category events |
| **Changed Attribute** | `attribute.any` | all three attribute events |
| **Changed Family** | `family.any` | all three family events |
| **Changed Catalog Record** | `catalog.any` | **all twelve** concrete events |

`catalog.any` is the one that saves real work. A single Zap can feed an audit trail, a data-warehouse table or a change log instead of twelve near-identical Zaps.

### Telling record types apart

Because one wildcard trigger carries four different record shapes, **every payload includes `entity` and `reference`**:

| Field | Product | Category / Attribute / Family |
|---|---|---|
| `entity` | `product` | `category`, `attribute` or `family` |
| `reference` | the SKU | the code |

Map on `entity` and `reference` in a wildcard Zap, not on `sku` or `code` - only one of those two is populated per run. The payload also always carries the **concrete** event name in `event` (`product.updated`), never the wildcard key, so a Filter step can branch on it.

## How fan-out works

One save matches each subscription row **once**. When UnoPim is about to deliver `product.updated`, it looks for active subscriptions whose event is any of:

```
product.updated      the concrete key
product.any          the entity wildcard
catalog.any          the catalog wildcard
```

Every matching subscription gets exactly one delivery. A Zap on `product.updated` and a separate Zap on `catalog.any` both fire; the same Zap never fires twice for one save.

Nothing is queued at all when no subscription exists for an event, so an installation with no Zaps connected pays no cost for having the package installed.

## Narrowing the payload

The product triggers (and **Changed Product**) expose two optional inputs:

| Input | Effect |
|---|---|
| **Channel** | Only values for that channel are included. Leave blank for every channel. |
| **Locale** | Only values for that locale are included. Leave blank for every locale. |

Both are dropdowns populated live from your instance. Category, attribute and family triggers do not offer them - those records have no channel dimension.

Narrowing is worth doing on a wide catalog: it keeps the payload small enough that Zapier's field mapper stays usable.

## Payload shape

UnoPim keys a value by `(attribute, locale, channel)`. Zapier's field mapper is a flat key/value list, so the four levels collapse onto one namespace joined by a double underscore:

```
values.common.name                                  ->  name
values.locale_specific.en_US.description            ->  description__en_US
values.channel_specific.default.cost                ->  cost__default
values.channel_locale_specific.default.en_US.price  ->  price__default__en_US
```

The key order is always **`attribute__channel__locale`**.

> [!NOTE]
> The **Test trigger** step in the Zap editor returns the identity fields only - `id`, `entity`, `reference`, `event` and the timestamps. Attribute values are left out there because a sample record and the record a live event carries rarely hold the same attributes, and Zapier rejects a sample that offers fields a real delivery may not have.
>
> A live delivery carries the full flattened set. To map an attribute the test step did not list, type the key by hand in the field - for example `description__en_US` - or run the Zap once and map from the real run.

Values that are one level deeper than the mapper can address - price maps, metric objects - arrive JSON-encoded as a string. Plain lists are joined with `, ` so option codes stay readable in the Zap editor.

### A product payload

| Field | Notes |
|---|---|
| `id` | The **Zapier dedupe id**. Do not map this - see below. |
| `entity` | Always `product`. |
| `reference` | The SKU. |
| `product_id` | The real numeric product id. **Map this**, not `id`. |
| `sku`, `type`, `status`, `family`, `parent` | Core fields. `status` is a boolean. |
| `categories` | List of category codes. |
| `event` | The concrete event key. |
| `created_at`, `updated_at` | ISO 8601. |
| `_truncated` | `true` when the payload hit the key cap - see [Configuration](./configuration). |
| `changes` | On updates: `added`, `changed`, `removed`. Each changed attribute carries its `old` and `new` value. |
| `<attribute>__<channel>__<locale>` | Every flattened value. |

### A category, attribute or family payload

These carry far fewer fields and have no channel dimension - only labels are expanded per locale, as `label__en_US`.

| Field | Notes |
|---|---|
| `id` | The Zapier dedupe id. |
| `entity` | `category`, `attribute` or `family`. |
| `reference` | The code. |
| `entity_id` | The real numeric id. **Map this**, not `id`. |
| `code`, `type`, `parent` | `type` is populated for attributes; `parent` is the parent code where one exists. |
| `event`, `created_at`, `updated_at` | As above. |
| `label__<locale>` | One key per translated label. |

## Deduplication - why `id` looks strange

Zapier caches every `id` it has ever seen for a trigger and **silently drops repeats**. An update trigger that reused the bare record id would fire exactly once and then go quiet forever, with nothing in the Zap history to explain it.

So the `id` field is a composite:

| Event | Product | Category / Attribute / Family |
|---|---|---|
| **created** | `42` | `category-7` |
| **updated** | `42-1754302800-9e06106605` | `category-7-1754302800-9e06106605` |
| **deleted** | `42-deleted` | `category-7-deleted` |

The update form is `{id}-{updated_timestamp}-{fingerprint}`, where the timestamp is a **UNIX timestamp** (`updated_ts`), not the ISO `updated_at` string.

The timestamp alone is not enough. `updated_at` is second-precision, so two edits inside the same second would produce the same id and Zapier would drop the second one. A short SHA-256 fingerprint of the changed content disambiguates them - and, as a bonus, a genuine no-op save keeps its id and is correctly deduplicated away.

> [!IMPORTANT]
> **Map `product_id` or `entity_id`, never `id`.** The `id` field exists for Zapier's deduplication and its shape changes between events. The stable identifier is `product_id` for products and `entity_id` for categories, attributes and families.

## Delivery mechanics

| Detail | Value |
|---|---|
| Method | `POST` to the Zap's hook URL |
| Body | A **JSON array containing exactly one record** |
| `X-Unopim-Event` | The concrete event key, e.g. `product.updated` |
| `X-Unopim-Subscription-Id` | The subscription row id |
| `X-Unopim-Signature` | `sha256=<hex>` - **only when the subscription carries a secret** |
| Timeout | 15 seconds by default |
| Retries | 3 attempts, 30 second backoff, on the dedicated `zapier` queue |

> [!NOTE]
> **Zap deliveries are not signed.** The Zapier app never sends a secret when it subscribes, so `X-Unopim-Signature` is absent from every delivery a Zap receives. This is by design - the hook URL Zapier issues is itself unguessable, and it is the only party holding it. The signature header exists for other clients that subscribe to the same endpoint with a secret of their own.

Every target URL passes an **SSRF guard** twice - once before the subscription is stored and again before each delivery. Loopback, private, link-local and cloud-metadata addresses are refused, and a delivery blocked this way is logged with the status **Blocked**.

## When a Zap is switched off

Zapier answers a webhook whose Zap is off with **HTTP 410 Gone**. That is the only cleanup signal the platform gives, so UnoPim treats it as an instruction rather than a failure:

- the subscription row is deleted, and the Zap disappears from **Connected Zaps**;
- the delivery is logged with the status **Zap Turned Off**;
- **the delivery history is kept**, which is exactly what you need afterwards to explain a record that never arrived.

## Known behaviour

**Bulk edits fire nothing.** A product saved through UnoPim's bulk-edit flow does **not** emit `product.updated`, so no Zap runs for it. This is deliberate - a bulk edit touching hundreds of rows would otherwise cost one Zap task per row. Use an exporter when you need those changes to leave UnoPim.

**One API product create emits two events.** UnoPim writes the product row and then saves its values, so a single create through the REST API fires **both** `product.created` and `product.updated`. With both triggers switched on you get two Zap runs for one new product. If that matters, keep one of the two triggers off, or add a Filter step on `event`.

**Subscriptions are scoped per API key.** Listing and deleting subscriptions through the API only ever sees rows created with the same API key. Two Zapier accounts connected with two different keys cannot see or remove each other's Zaps. The admin **Connected Zaps** page shows all of them.

## Test trigger data

Zapier's *Test trigger* step calls a sample endpoint that runs your **real records** through the **same transformer** as a live delivery, so the identity and metadata fields are exactly the ones that arrive at runtime. Three records by default - see `ZAPIER_SAMPLE_SIZE` in [Configuration](./configuration).

The integration then trims the sample down to the fields every delivery is guaranteed to carry, because Zapier rejects a sample that offers fields a real delivery may not have. Attribute values are therefore absent from the test step but present in a live delivery - see the note under [Payload shape](#payload-shape).

`catalog.any` returns at least four records so more than one entity shape is visible. Products are drawn first, so a catalogue with few recent category, attribute or family changes may show mostly products. Map on `entity` and `reference` rather than assuming a shape.

## Example Zaps

| Trigger | Action |
|---|---|
| Product created | Post to a Slack channel for review |
| Product updated | Append a row to a Google Sheet as an audit trail |
| Product updated, filtered on `changes` containing `price` | Update the matching Shopify variant |
| Product deleted | Set marketplace stock to 0 |
| Category created | Create the matching collection in the storefront |
| Attribute created | Notify the data-governance owner |
| Changed Catalog Record | Append to a BigQuery table for reporting |
