---
editLink: false
---

# Advanced Settings

The connector works with its defaults. You only need this page to fine-tune AI mapping, or if your server needs different API limits.

## AI Category Mapping settings

**Where:** **Configuration → System Settings → Google Shopping → AI Category Mapping**

| Setting | Default | What it does |
|---|---|---|
| **Categories per request** | 10 | How many categories go to the AI in one request. Lower it if your AI provider rejects large requests. |
| **Attempts per request** | 4 | Retries when the provider rate-limits a request. |
| **First retry delay (seconds)** | 5 | Wait before the first retry. Each later retry waits twice as long. |
| **Pause between requests (seconds)** | 2 | Raise it if you hit your provider's per-minute limit. |
| **Passes over unmapped categories** | 3 | Extra passes for categories still unmapped. A pass that maps nothing stops the run early. |

AI mapping uses UnoPim's default **Magic AI** platform, so the connector doesn't need its own AI key.

## Server settings (`.env`)

| Variable | Default | What it does |
|---|---|---|
| `GOOGLE_SHOPPING_API_VERSION` | `merchant` | Which Google API to use. Set it to `content` only if your Cloud project still has the old Content API (retiring 18 August 2026). |
| `GOOGLE_SHOPPING_API_CONNECT_TIMEOUT` | `10` | Seconds to wait for a connection to Google. |
| `GOOGLE_SHOPPING_API_TIMEOUT` | `20` | Seconds to wait for Google's answer. |
| `GOOGLE_SHOPPING_API_RETRY_ATTEMPTS` | `3` | Retries on temporary Google errors (429 / 5xx). |
| `GOOGLE_SHOPPING_API_RETRY_DELAY_MS` | `1000` | Delay between retries, in milliseconds. |
| `GOOGLE_SHOPPING_API_DELETE_CONCURRENCY` | `50` | Parallel requests during delete exports. |

Run `php artisan optimize:clear` after changing `.env`.

## Rate limits

To protect Google's API, each admin user is limited to:

| Action | Limit |
|---|---|
| Quick Export Now | 30 per minute |
| Authenticate with Google | 20 per minute |

## Defaults sent to Google

If a product has no value for these fields, the connector sends:

| Field | Default |
|---|---|
| Condition | `new` |
| Availability | `in stock` |

To change them per connection, map the fields in [Attribute Mapping](./attribute-mapping).

## Merchant Center data source

Products are written into a Merchant Center **data source**. The connector reuses an API data source that matches the connection's **Country** and **Language**, or creates one called **UnoPim (…)**. A data source you create by hand is reused only if its country matches.

## REST API

The connector adds REST endpoints under `/api/v1/rest/google-shopping/` for connections, mappings, exports and lookups. A Postman collection (`google-shopping-api.postman_collection.json`) ships with the package.
