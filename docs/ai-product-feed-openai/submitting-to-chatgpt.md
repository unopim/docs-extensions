# Submitting to ChatGPT

Once your feed builds successfully, you need to get it to OpenAI. There are two ways, and you can use both at once.

| Method | How it works | Use it when |
|---|---|---|
| **Feed URL** | OpenAI downloads the feed from your UnoPim server whenever it wants. | OpenAI's onboarding asks you for a feed URL. |
| **SFTP upload** | UnoPim pushes every new feed to OpenAI's SFTP server. | OpenAI's onboarding gives you SFTP credentials. |

---

## Option A: Share the feed URL

1. Make sure a **Feed Security Token** is set ([Configuration › General](./general-settings.md)).
2. Copy the URL from the dashboard's **Public Feed URL** box with **Copy URL**, or print it in a terminal:

   ```bash
   php artisan openai-feed:generate --show-url
   ```

   It looks like this:

   ```
   https://pim.example.com/openai-feed/products?token=3f9c2a7e5b8d41c6a0e9f7b2d5c8a1e4b7f0c3d6a9e2b5c8
   ```

3. Sign in at [chatgpt.com/merchants](https://chatgpt.com/merchants) and paste the URL where OpenAI asks for your product feed.
4. OpenAI fetches and indexes the feed. The first indexing can take a while.

What OpenAI (or anyone) gets back from the URL:

| Situation | Response |
|---|---|
| Correct token, feed built | **200 OK**: the feed file, with `Last-Modified` and a one-hour `Cache-Control` header. |
| Token missing or wrong | **403 Forbidden**: *"Invalid feed token."* |
| Feed disabled, or not configured | **404 Not Found** |
| Feed enabled but never generated yet | **503 Service Unavailable**: *"The feed is not available yet."* Generate it once. |

The URL is rate-limited to 120 requests per minute per IP address. Opening the URL never triggers a generation; it only serves the last file that was built.

> [!WARNING]
> Anyone who has the full URL, token included, can download your feed. Share it only with OpenAI. If it leaks, click **Generate Token**, save, and update the URL in the OpenAI merchant portal.

---

## Option B: Upload over SFTP

If OpenAI gave you SFTP credentials, UnoPim can upload every new feed for you. Follow [SFTP Delivery](./sftp-delivery.md).

---

## Checking the feed status

A small JSON endpoint reports whether the feed is ready, which is handy for uptime monitoring:

```
GET /openai-feed/status?token=<your-token>
```

```json
{
  "status": "ok",
  "exists": true,
  "last_updated": "2026-10-27 07:08:44",
  "size": "54.12 KB",
  "feed_url": "https://pim.example.com/openai-feed/products",
  "enabled": true,
  "channel": "default",
  "locale": "en_US",
  "format": "tsv"
}
```

When a token is set, this endpoint needs the token too (otherwise **403**). The `feed_url` it returns **never** contains the token.

---

## What's inside the feed

See [Feed Fields Reference](./feed-fields.md) for every column and where its value comes from.
