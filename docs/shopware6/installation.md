# Installation

Follow the steps below to install the UnoPim Shopware 6 Connector. You will need terminal (SSH) access to your UnoPim server.

> **Note:** UnoPim 3.x uses the **Laravel 13 bootstrap architecture**. Service providers are registered in `bootstrap/providers.php`, not `config/app.php`.

---

## Step 1 — Add the Package Files

Unzip the connector package. Inside, you will find a `packages` folder — merge it into the **root directory** of your UnoPim project so that the path `packages/Webkul/Shopware` exists.

---

## Step 2 — Register the Service Provider

Open `bootstrap/providers.php` and add the Shopware service provider:

```php
use Webkul\Shopware\Providers\ShopwareServiceProvider;

return [
    // ...existing providers...
    ShopwareServiceProvider::class,
];
```

> [!NOTE]
> This registers `ShopwareServiceProvider` in Laravel so the connector can bootstrap its routes, database migrations, and configuration during application startup.

---

## Step 3 — Update Composer Autoload

Open `composer.json` and add the following entry under the `autoload > psr-4` section:

```json
"Webkul\\Shopware\\": "packages/Webkul/Shopware/src"
```

---

## Step 4 — Run the Setup Commands

Run each command in order and wait for it to finish before moving on.

**Refresh the Composer autoloader**
```bash
composer dump-autoload
```

**Install the connector**
```bash
php artisan shopware-package:install
```
This command runs the database migrations, creates the mapping sections each saved credential is missing, and publishes the package assets. Existing mappings are left untouched, so the command is safe to re-run.

> [!NOTE]
> When upgrading from a version with separate simple and configurable product exports, the migrations merge those profiles into the single **Shopware Products** job, with the original product type pre-selected in the **Product Type** filter. Review the migrated profiles once.
>
> The same upgrade copies your existing global mappings onto every saved credential, so each credential starts with its own copy. The migration stops with an error if mappings exist but no Shopware credential does; create a credential first, then run it again.

**Clear the application cache**
```bash
php artisan optimize:clear
```

**Start the queue worker**

Export jobs run in the background via Laravel queues. Make sure a queue worker is running:
```bash
php artisan queue:work
```

| Command | Purpose |
|---|---|
| `composer dump-autoload` | Regenerates Composer's autoloader so the new `Webkul\Shopware` namespace is recognised. |
| `php artisan shopware-package:install` | Runs database migrations, creates missing mapping sections per credential, and publishes package assets. |
| `php artisan optimize:clear` | Clears all cached files (bootstrap, config, routes, views) so the new connector loads correctly. |
| `php artisan queue:work` | Starts a background worker that processes export jobs dispatched to the queue. |

---

## Verify the Installation

Log in to your UnoPim dashboard. You should see a **Shopware** option appear in the left sidebar — this confirms the connector is installed and ready to configure.


If the menu entry does not appear, run `php artisan optimize:clear` again and refresh the page.
