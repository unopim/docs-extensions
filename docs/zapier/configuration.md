# Configuration

Everything lives in `config/zapier.php` and every value is overridable by environment variable. The defaults suit a normal installation - you only need to touch these when a specific problem calls for it.

## Keys

| Environment variable | Config key | Default | Purpose |
|---|---|---|---|
| `ZAPIER_QUEUE` | `zapier.queue` | `zapier` | The queue deliveries run on. |
| `ZAPIER_MAX_PAYLOAD_KEYS` | `zapier.max_payload_keys` | `250` | Caps the number of keys in a flattened delivery payload. |
| `ZAPIER_SAMPLE_SIZE` | `zapier.sample_size` | `3` | Records returned to Zapier's *Test trigger* step. |
| `ZAPIER_TIMEOUT` | `zapier.timeout` | `15` | Delivery timeout, in seconds. |
| `ZAPIER_LOGGING` | `zapier.logging.enabled` | `true` | Delivery logging on or off. |
| `ZAPIER_LOG_RETENTION_DAYS` | `zapier.logging.retention_days` | `30` | How long log rows are kept. `0` keeps them forever. |
| `ZAPIER_LOG_MAX_PAYLOAD_KEYS` | `zapier.logging.max_payload_keys` | `60` | Caps the payload copy stored on each log row. |

Example `.env` block:

```dotenv
ZAPIER_QUEUE=zapier
ZAPIER_MAX_PAYLOAD_KEYS=250
ZAPIER_SAMPLE_SIZE=3
ZAPIER_TIMEOUT=15
ZAPIER_LOGGING=true
ZAPIER_LOG_RETENTION_DAYS=30
ZAPIER_LOG_MAX_PAYLOAD_KEYS=60
```

Run `php artisan optimize:clear` after changing any of them, and restart the queue worker.

---

## `ZAPIER_QUEUE`

Deliveries run on their own queue so a slow or unresponsive Zap endpoint cannot starve product indexing, imports or core webhooks.

> [!CAUTION]
> If you change this, **change your worker command to match**. A worker on `--queue=zapier` will not pick up jobs from a queue you renamed, and the failure is silent - no trigger fires and nothing on screen says why.

Queue behaviour is fixed at **3 attempts** with a **30 second backoff**. Nothing is queued at all when no subscription exists for an event, so an instance with no Zaps connected pays nothing for having the package installed.

---

## `ZAPIER_MAX_PAYLOAD_KEYS`

A wide catalog - say 200 attributes across 12 locales and 3 channels - flattens to thousands of keys. Zapier's field mapper cannot render that, and its payload limit rejects it.

Beyond this cap the payload is truncated and carries `_truncated: true` so the receiving Zap can tell. The identity and metadata fields are always kept; the cap applies to the flattened attribute values.

If you are hitting the cap, the better fix is usually to set a **Channel** and **Locale** on the trigger rather than to raise this number - see [Triggers](./triggers).

---

## `ZAPIER_SAMPLE_SIZE`

How many real records the sample endpoint returns for Zapier's *Test trigger* step. Three is enough to show the field shape without pulling a page of products on every test.

The `catalog.any` sample returns at least four records, drawn from products first and then the other entity types, so it can exceed this value.

---

## `ZAPIER_TIMEOUT`

How long UnoPim waits for Zapier to acknowledge a delivery, in seconds. A timeout is recorded as **Failed** and the job retries.

Raising this is rarely the answer - `hooks.zapier.com` normally responds in a few hundred milliseconds. A consistently slow target usually means a network problem between your server and Zapier.

---

## `ZAPIER_LOGGING`

Turning logging off stops every log row being written. Deliveries still happen and subscriptions still self-clean, but you lose the record that answers *"why did my Zap not fire"*.

Turn it off only if the volume is genuinely a problem. Prefer a shorter `ZAPIER_LOG_RETENTION_DAYS` first.

---

## `ZAPIER_LOG_RETENTION_DAYS`

How long delivery log rows are kept. `php artisan zapier:logs:prune` runs daily on the scheduler and deletes anything older, in bounded chunks of 1,000 rows.

`0` disables pruning entirely and keeps rows forever.

---

## `ZAPIER_LOG_MAX_PAYLOAD_KEYS`

Caps the copy of the payload stored on each log row, so a wide catalog does not turn the log into the largest table in the schema. A capped row is marked with `_log_truncated`.

This affects only the stored copy. The delivery itself always carries the full payload, subject to `ZAPIER_MAX_PAYLOAD_KEYS`.

---

## What is not configurable

| Behaviour | Value |
|---|---|
| Retry attempts | 3 |
| Retry backoff | 30 seconds |
| Delivery body | A JSON array containing exactly one record |
| Signing | HMAC-SHA256, and only when a subscription carries a secret. The Zapier app never sends one. |
| SSRF guard | Always on, before storage and before every delivery |
| 410 handling | Always deletes the subscription and keeps the log |

The set of subscribable events and the repositories behind the structure entities are also declared in `config/zapier.php`, under `events` and `entities`. Adding an entity there plus a listener is all it takes to extend the connector; the dispatcher needs no change.
