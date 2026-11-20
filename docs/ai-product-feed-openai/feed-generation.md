# Generating & Submitting the Feed

## Dashboard

Navigate to **Admin Panel → OpenAI Feed → General** to open the feed dashboard.

![OpenAI Product Feed dashboard showing status cards and generation history](./images/dashboard.png)

The dashboard shows:

- **Feed Status** — whether the feed is currently enabled or disabled.
- **Last Generated** — timestamp of the most recent successful generation.
- **File Size** — size of the currently live feed file.
- **Last Run** — timestamp of the last generation attempt (success or failure).
- **Recent Generation History** — the last 5 generation runs with status, rows exported, duration, file size, and trigger source.
- **Public Feed URL** — with **Copy URL**, **Open** (the public link OpenAI reads) and **Download** (saves the file through the admin panel).

The status updates automatically via polling — you can watch a generation in progress without refreshing the page.

---

## Generating the feed

### Manual generation

Click **Generate Now** on the dashboard. The job is dispatched to the queue and the history table updates in real time as it runs.

Only one generation runs at a time: **Generate Now** is refused while a run started in the last 35 minutes is still running.

### Stopping a generation

Click **Stop** on the dashboard to end a running or queued generation. The run is marked as failed with a "stopped" message, the half-written file is discarded and the last good feed is kept. A running job stops at the next batch boundary. Requires the **Generate Feed** permission.

> [!NOTE]
> Make sure a queue worker is running before triggering a manual generation (see [Installation → Step 6](./installation#step-6-start-the-queue-worker)). If the queue driver is set to `sync`, the generation runs inline and may time out on large catalogs.

---

### Automated generation (cron)

The extension registers a scheduled task automatically. To enable it, add the following line to your server's crontab:

```bash
* * * * * cd /path-to-your-unopim && php artisan schedule:run >> /dev/null 2>&1
```

The extension's task is checked hourly and regenerates the feed when the last successful generation is older than the interval configured in **Feed Settings → Auto-Update Interval (Hours)**. The task is only registered while **Feed Enabled** is on. The cron task uses `withoutOverlapping()` so a slow generation on a large catalog will never trigger a second run before the first finishes.

---

### CLI generation

Trigger generation directly from the command line:

```bash
# Run inline (no queue required)
php artisan openai-feed:generate

# Dispatch to the background queue
php artisan openai-feed:generate --queue

# Preview 5 rows without writing a file
php artisan openai-feed:generate --dry-run

# Generate and print the public feed URL
php artisan openai-feed:generate --show-url

# Record the run with a different trigger source
php artisan openai-feed:generate --source=api
```

| Option | Description |
|---|---|
| *(none)* | Runs feed generation synchronously in the terminal. |
| `--queue` | Dispatches the generation job to the queue and returns immediately. |
| `--dry-run` | Prints a 5-row preview table without writing the feed file. Useful for verifying attribute mapping before a full run. |
| `--show-url` | After an inline generation, prints the full public feed URL with your security token. Ignored with `--queue` and `--dry-run`. |
| `--source=` | Trigger source recorded in the generation history: `manual` (default), `cron` or `api`. |

If the feed is disabled, the command prints a warning and exits without generating.

---

## Feed preview

Navigate to **Admin Panel → OpenAI Feed → General → Preview Feed** to browse the products that will be included in the feed.

![Feed Preview showing product rows with ID, title, brand, price, availability, and variant attributes](./images/preview.png)

The preview datagrid shows each product row with its mapped values — Item ID, Product Title, Brand, Price, Availability, Category, GTIN, and Variant Attributes. Click the eye icon on any row to see the full field-by-field mapping for that product or variant.

Use the preview to verify your attribute mapping is correct before submitting the feed URL to ChatGPT.

> [!TIP]
> If products are missing from the preview, check **Configuration → Product Filters**. Products with no price (or a zero price) in any selected currency are silently excluded, as are disabled products when **Only Enabled Products** is turned on.

---

## Generation history

Navigate to **Admin Panel → OpenAI Feed → General → View All** to see the full generation history.

![Generation History page showing all feed runs with status, rows, duration, and trigger source](./images/logs.png)

| Column | What to look for |
|---|---|
| **Status** | Green = success; red = failed. Expand a failed row to see the error message. |
| **Rows** | A sudden drop in rows may indicate a filter change or products being disabled. |
| **Duration** | Steady growth over time = catalog is growing. A spike = database slowdown. |
| **File Size** | Useful to confirm the feed file was not truncated. |
| **Triggered By** | `manual`, `cron`, or `api`. |

A failed SFTP upload is shown as a failed run even though the local feed file was written.

---

## Submitting to ChatGPT

Once the feed has been generated successfully:

1. Run the following to get your public feed URL:
   ```bash
   php artisan openai-feed:generate --show-url
   ```
   The URL will look like:
   ```
   https://your-domain.com/openai-feed/products?token=<your-token>
   ```

2. Go to [chatgpt.com/merchants](https://chatgpt.com/merchants) and sign in.
3. Add a new product feed and paste the URL.
4. ChatGPT will fetch and index your products. Indexing may take some time after the initial submission.

> [!NOTE]
> The token in the URL is the same token shown in **Feed Settings → Feed Security Token**. If you regenerate the token in settings, update the URL in the ChatGPT Merchant Portal immediately — the old URL will stop working.

---

## Feed status endpoint

A lightweight status endpoint is available for uptime monitoring or integration checks:

```
GET /openai-feed/status
```

Returns JSON with the feed's enabled state, last generation time, file size, format, channel, and locale. When a feed token is set, this endpoint requires the same token as the feed URL.

Both `/openai-feed/products` and `/openai-feed/status` accept the token either as `?token=<token>` or as an `Authorization: Bearer <token>` header. The header keeps the token out of web server and proxy access logs. Both endpoints are rate-limited to 120 requests per minute.

---

## Troubleshooting

**Generate Now button does nothing / generation stays in "Running" indefinitely**
Check that a queue worker is running: `php artisan queue:work --queue=system,completeness,default`. Check the Laravel log at `storage/logs/laravel.log` for job errors. Use **Stop** to clear a run that is stuck in "Running".

**Generation runs twice or restarts on large catalogs**
The job allows up to 30 minutes and retries 3 times on failure. The queue connection's `retry_after` (`DB_QUEUE_RETRY_AFTER` / `REDIS_QUEUE_RETRY_AFTER`, default 90 seconds) must be longer than the generation time, otherwise the worker starts the same job again while it is still running. After changing it, run `php artisan config:cache` (if config is cached) and `php artisan queue:restart`.

**Feed URL returns 403**
The token in the URL does not match the one saved in **Feed Settings → Feed Security Token**.

**Feed URL returns 404 or 503**
404: the feed is disabled in settings. 503: the feed is enabled but no file has been generated yet.

**Products are missing from the feed or preview**
Check **Feed Settings → Product Filters**: disabled products are excluded when *Only Enabled Products* is on; products without a price in any selected currency are always excluded; the *Product Limit* may be cutting the catalog short.

**Attribute values are empty in the preview**
Open **Feed Settings → Attribute Mapping** and confirm each field points to an attribute that has data for your products. Use the **dry-run** CLI option to inspect a small sample without generating the full file.

**Memory errors during generation on large catalogs**
Lower the **Batch Size** in **Feed Settings → Performance & Schedule**. Try 100–200 for catalogs over 50,000 SKUs, and make sure the job runs via `--queue` with a worker that has a sufficient `--memory` limit.
