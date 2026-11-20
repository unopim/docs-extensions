---
editLink: false
---

# Package Configuration

The connector works out of the box with sensible defaults. The behaviour below is the only part you normally think about.

## API

The connector talks to the **Google Merchant API**. Requests use conservative connection and read timeouts with automatic retries on failure, and delete exports remove products concurrently so large clear-outs finish quickly.

### Environment variables

These optional `.env` values tune the API client (defaults shown):

| Variable | Default | What it does |
|---|---|---|
| `GOOGLE_SHOPPING_API_VERSION` | `merchant` | `merchant` uses Merchant API v1. Set `content` to stay on Content API for Shopping v2.1 until Google retires it on 18 August 2026. |
| `GOOGLE_SHOPPING_API_CONNECT_TIMEOUT` | `10` | Connection timeout in seconds. |
| `GOOGLE_SHOPPING_API_TIMEOUT` | `20` | Request timeout in seconds. |
| `GOOGLE_SHOPPING_API_RETRY_ATTEMPTS` | `3` | Retries for connection errors and `429` / `5xx` responses. |
| `GOOGLE_SHOPPING_API_RETRY_DELAY_MS` | `1000` | Base delay between retries, in milliseconds. |
| `GOOGLE_SHOPPING_API_DELETE_CONCURRENCY` | `50` | Parallel requests used by delete exports. |

> [!NOTE]
> After changing any of these values, run `php artisan optimize:clear` and then `php artisan queue:restart`. Running workers keep the old values until they restart.

> [!WARNING]
> `GOOGLE_SHOPPING_STOREFRONT_BASE_URL` and `GOOGLE_SHOPPING_MEDIA_BASE_URL` are no longer read. Set the storefront URL in each connection's [Required Settings](./required-settings) and remove both variables from `.env`.

## Throttle

Per-admin rate limits (Laravel `throttle:<max>,<minutes>` syntax) guard the routes that reach Google or trigger heavy work:

| Action | Limit |
|---|---|
| Quick Export | 30 / minute |
| Starting an OAuth authorization | 20 / minute |

## Queues

Exports run on the default queue and AI category mapping runs on its own queue. Both are processed together by the connector's worker command - see [Queue Worker](./queue-worker).

## Google taxonomy

Category Mapping resolves against Google's product taxonomy, bundled with the package (~5,500 entries) so no network call is needed at mapping time. From a connection's **Category Mapping** tab you can refresh the bundled list from Google's published taxonomy; the refreshed copy is cached on the configured storage disk.

## AI category mapping

AI category mapping reuses the default **Magic AI** platform configured in UnoPim - the connector stores no AI credentials of its own. Its tuning lives in **Configuration → System Settings → Google Shopping → AI**.