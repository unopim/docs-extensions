# Troubleshooting & FAQ

Find your symptom below. Most problems come down to the queue worker, the scheduler, or the attribute mapping. When a run fails, the generation history shows a short reason, and the full technical details are in `storage/logs/laravel.log` (search for `[OpenAIFeed]`).

---

## Generation

### "Generate Now" says the job is queued, but nothing happens

The run stays **Running** because no queue worker is picking it up. Start one:

```bash
php artisan queue:work --queue=system,completeness,default
```

On production, keep it alive with Supervisor. If you just deployed new code, run `php artisan queue:restart` so workers load it.

### "A feed generation job is already running"

Only one generation runs at a time. Wait for it to finish, or click **Stop** on the dashboard. A run that has been stuck as *Running* for more than 35 minutes no longer blocks a new one.

### The run failed with "Feed generation failed. Check the application log"

Open `storage/logs/laravel.log` and look for `[OpenAIFeed] Job failed:`. Common causes are a disk the server can't write to (`storage/app` must be writable by the web and queue user) and running out of memory (lower **Batch Size**).

### The run failed with "The feed was generated but the SFTP upload to OpenAI failed"

The feed file was built correctly, but the upload didn't work. Check, in this order:

1. The **SFTP Host**, **Port** and **Username** match what OpenAI gave you.
2. The password or private key is correct. To replace a saved one, type the new value and save.
3. The server can reach the SFTP host. Outbound port 22 is often blocked by firewalls; try `nc -vz <host> 22`.
4. The `league/flysystem-sftp-v3` package is installed.

### The feed doesn't update automatically

1. Check that the crontab entry exists: `crontab -l` should list `php artisan schedule:run`.
2. Run `php artisan schedule:list` and look for `openai-feed:generate --source=cron`. If it's missing, **Feed Enabled** is off.
3. Remember the scheduler rebuilds only when the last **successful** run is older than your interval. A recent manual run delays the next scheduled one.

### Generation runs out of memory or times out

Lower **Batch Size** (try 100–200 for catalogs over 50,000 products), use a real queue driver instead of `sync`, and give the worker enough memory: `php artisan queue:work --memory=1024`.

---

## Feed content

### Some products are missing

A product is left out when:

- it has **no price** in any of the selected currencies (the most common reason);
- it is **disabled** and *Only Enabled Products* is on;
- it falls beyond the **Product Limit** (check it isn't still set to a test value);
- it is a **disabled variant** of a configurable product.

Open **Preview Feed**. If the product isn't there, it won't be in the feed either.

### A field is empty in the feed

Open the product's row in **Preview Feed** and click the eye icon. Then check:

- the field is mapped in **Attribute Mapping**;
- the product actually has a value for that attribute **in the selected channel and locale**;
- the value passes validation. Invalid GTINs, a sale price that isn't lower than the price, negative review counts and ratings outside 0–5 are left blank on purpose.

### Dimensions or weight are missing

Dimensions need values for at least **two** of length, width and height, plus a unit (from the attribute or **Dimensions Unit**). Weight must be above 0 and have a unit of `g`, `kg`, `oz` or `lb`.

### Select values show codes instead of labels

Make sure the attribute options have a label translated into the feed **Locale**. Options without a translation fall back to their default label, then to their code.

### Images point to the wrong address

Set **Image Base URL** to the public address of your images, for example your CDN. If empty, `APP_URL` from `.env` is used, so make sure it is your real public domain, not `localhost`.

---

## Feed URL & security

### OpenAI (or my browser) gets 403 Forbidden

The `token` in the URL doesn't match the saved **Feed Security Token**, usually because someone clicked **Generate Token** after the URL was submitted. Copy the current URL from the dashboard and update it with OpenAI.

### The feed URL returns 404

**Feed Enabled** is off, or the configuration has never been saved.

### The feed URL returns 503

The feed is enabled but hasn't been generated yet. Click **Generate Now** once.

### Can I still download the feed from `/storage/openai-feed/…`?

No. The feed is kept in private storage (`storage/app/openai-feed/`), so the token can't be bypassed. Use the feed URL, or the **Download** button on the dashboard.

### Is my SFTP password safe?

Yes. Passwords and private keys are stored encrypted with your application key, are never shown in the form or the settings history, and are never written to logs.

---

## Still stuck?

See [Contact Support](./contact-support.md). It helps us if you include the failing row from the generation history, the matching `[OpenAIFeed]` lines from `storage/logs/laravel.log`, and your UnoPim and PHP versions.
