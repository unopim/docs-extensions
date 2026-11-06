# Installation

Follow the steps below to manually install the UnoPim Public Image URL extension.

## Step 1 - Add the Package Files

Download and unzip the extension. Inside, you'll find the package folder that should be placed in your UnoPim project at:

```text
packages/Webkul/PublicUrl
```

## Step 2 - Register the Service Provider

Open `bootstrap/providers.php` and import the service provider:

```php
use Webkul\PublicUrl\Providers\PublicUrlServiceProvider;

return [
    // ...existing providers...
    PublicUrlServiceProvider::class,
];
```

> [!NOTE]
> This registers `PublicUrlServiceProvider` in Laravel, allowing the package to bootstrap and load its bindings, configuration, and related services.

## Step 3 - Update Composer Autoload

Open `composer.json` and add the following line under the `autoload > psr-4` section:

```json
"Webkul\\PublicUrl\\": "packages/Webkul/PublicUrl/src/"
```

> [!TIP]
> This configures PSR-4 autoloading so PHP can automatically resolve classes under the `Webkul\PublicUrl` namespace from the package directory.

## Step 4 - Run the Required Commands

Run the following commands in order:

```bash
composer dump-autoload
php artisan optimize:clear
```

| Command | Purpose |
| --- | --- |
| `composer dump-autoload` | Regenerates Composer's autoloader mapping to include the newly added namespace. |
| `php artisan optimize:clear` | Clears all cached files (bootstrap, configuration, routes, and views) to load the new changes. |

## Step 5 - Optional: Allow Private-Network URLs

By default, imports only download media from public internet addresses. To import from a server on your own network, add this to `.env` and clear the cache again:

```dotenv
PUBLIC_URL_ALLOW_PRIVATE_NETWORK=true
```

## Step 6 - Start a Queue Worker

Imports and exports run as background jobs. Make sure a queue worker is running:

```bash
php artisan queue:work --queue=system,default
```

## Installation Complete

Once all steps are complete, the UnoPim Public Image URL extension will be installed and ready to use.

If the module does not appear or behaves unexpectedly after installation, clear the cache again and verify that the package path, service provider, and Composer autoload entry were added correctly.
