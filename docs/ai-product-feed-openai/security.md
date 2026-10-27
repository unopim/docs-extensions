# Security

Your product feed is public-facing by design, because OpenAI must be able to fetch it. This page explains how the extension keeps it from being reachable by anyone else, and what you should do to keep it that way.

---

## The feed token

- When a **Feed Security Token** is set, both `/openai-feed/products` and `/openai-feed/status` refuse any request without the matching `?token=` (**403 Forbidden**).
- Tokens are compared in constant time, so they can't be guessed one character at a time.
- **Generate Token** creates 48 random hexadecimal characters (192 bits) using a cryptographically secure generator.
- The status endpoint never includes the token in its response.

**Rotate the token** whenever someone who knew it leaves your team, or if the URL appears somewhere it shouldn't: click **Generate Token**, save, and update the URL in the OpenAI merchant portal. The old URL stops working immediately.

> [!CAUTION]
> Leaving the token empty makes the feed downloadable by anyone who knows the URL. Only do this if the feed contains nothing you'd mind competitors seeing.

---

## Where the feed file is stored

The feed is written to UnoPim's **private** storage (`storage/app/openai-feed/`), which the web server never exposes. The only ways to get the file are:

1. the feed URL, with the token; or
2. the **Download** button on the dashboard, which requires an admin login with the *OpenAI Feed › General* permission.

While being built, the feed goes to a temporary file. It replaces the live file only when the build succeeds, so a failed or stopped run never exposes a half-written feed.

---

## SFTP credentials

- The SFTP password and private key are stored **encrypted** using your application key (`APP_KEY`).
- They are never sent back to the browser. The form fields stay blank, and leaving them blank keeps the saved value.
- They are excluded from the settings history and never written to the logs.

> [!IMPORTANT]
> Because the secrets are encrypted with `APP_KEY`, changing `APP_KEY` makes them unreadable. If you rotate the key, re-enter the SFTP password or key afterwards.

---

## Abuse protection

- The public feed and status URLs are rate-limited to **120 requests per minute** per IP address.
- Opening the feed URL never starts a generation. It only serves the file that already exists, so heavy traffic can't overload your database.
- Only one generation runs at a time, whether it was started manually, by the scheduler or from the command line.

---

## Checklist

- [ ] A feed token is set, and the URL has been shared only with OpenAI.
- [ ] Only trusted roles have the *Configuration* permission ([Roles & Permissions](./permissions.md)).
- [ ] `APP_URL` is your real HTTPS domain, so feed and image links use HTTPS.
- [ ] Your server's `storage/` folder is not served by the web server (the UnoPim default).
