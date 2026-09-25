# Pro Installation

This page installs the **Shopify Pro** add-on. Install the [UnoPim Shopify Connector](./installation) first - Pro depends on it and will not boot without it.

Install Shopify Pro manually from the package files provided with your extension.

---

## Installation

**Step 1 - Add the package files**

Unzip the package, rename the folder to `ShopifyPro`, and move it into your UnoPim project:

```
packages/Webkul/ShopifyPro/
```

**Step 2 - Update Composer autoload**

In your project's root `composer.json`, under `autoload > psr-4`:

```json
"autoload": {
    "psr-4": {
        "Webkul\\ShopifyPro\\": "packages/Webkul/ShopifyPro/src"
    }
}
```

**Step 3 - Register the service provider**

In `bootstrap/providers.php` (UnoPim 2.0+):

```php
use Webkul\ShopifyPro\Providers\ShopifyProServiceProvider;

return [
    // ...
    ShopifyProServiceProvider::class,
];
```

> [!NOTE]
> `ShopifyProServiceProvider` must be registered **after** `ShopifyServiceProvider`. Pro replaces several of the connector's own services, and it can only do that once the connector has registered them.

> [!TIP]
> **For UnoPim < 2.0**, add the provider to the `providers` array in `config/app.php` instead:
> ```php
> 'providers' => [
>     // ...
>     Webkul\ShopifyPro\Providers\ShopifyProServiceProvider::class,
> ],
> ```

**Step 4 - Run the setup commands**

```bash
composer dump-autoload
php artisan migrate
php artisan optimize:clear
php artisan queue:restart
```

| Command | Purpose |
|---|---|
| `composer dump-autoload` | Regenerates Composer's autoloader so the new namespace is found. |
| `php artisan migrate` | Creates the `wk_shopify_catalogs` table. |
| `php artisan optimize:clear` | Clears all cached files so the new screens load. |
| `php artisan queue:restart` | Reloads queue workers with the new code. |

---

## Keep a queue worker running

```bash
php artisan queue:work
```

Every export, import and real-time push runs as a background job. Without a worker, jobs are queued but nothing actually moves. In production use Supervisor, systemd, or Horizon.

---

## Enable the server scheduler

This step is only needed for [Scheduled Exports](./pro-scheduled-exports). Add one entry to your server's crontab:

```bash
* * * * * cd /path-to-your-unopim && php artisan schedule:run >> /dev/null 2>&1
```

Pro registers its own `shopify:exports:dispatch-scheduled` command to run every minute, which is what picks up a due schedule and queues the export. Without this cron entry the schedule is saved but never fires.

You can confirm the command is registered:

```bash
php artisan schedule:list
```

---

## Give your role permission

Open **Settings → Roles**, edit the role, and tick the Pro permissions you want it to have:

- **Create Catalog** - add a catalog to a Shopify credential.
- **Edit Catalog** - open and update an existing catalog.
- **Delete Catalog** - remove a catalog.

These sit directly under the connector's own **Catalogs** permission, which is what opens the tab in the first place. Without them the tab stays read-only or hidden.

---

## Verify the installation

Log in to the admin panel and check these four things:

1. **The upgrade entry is gone.** The **Upgrade to Pro** item no longer appears under the Shopify sidebar menu - that is Pro switching itself on.

2. **Catalogs tab appears.** Open **Shopify → Credentials**, edit a credential - a **Catalogs** tab now sits beside the credential form, with a **Create Catalog** button instead of the upgrade notice.

3. **Schedule fields are live.** Open **Data Transfer → Exports → Create Export**, pick a Shopify export type - the **Schedule** card now shows **Cron Expression**, **Timezone** and **Schedule Type** beside the preset dropdown, instead of the preset alone.

4. **New job types appear.** In the export type dropdown you now see **Shopify Catalog**, and in the import type dropdown **Shopify Catalog** and **Shopify Catalog Price**.

If any of these are missing, run `php artisan optimize:clear` again, confirm the provider is registered, and check that the package files are present in `packages/Webkul/ShopifyPro/`.
