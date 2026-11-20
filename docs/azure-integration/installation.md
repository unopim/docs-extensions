# Installation

Follow the steps below to install the UnoPim Azure Blob Integration. Make sure you have terminal access to your server before getting started.

---

## Step 1 - Extract the Extension

Unzip the extension package you downloaded. Inside, you'll find a `packages` folder - merge it into the **root directory** of your UnoPim project. Your project structure should look like this:

```
/your-unopim-project
└── packages/
    └── Webkul/
        └── AzureBlob/
```

---

## Step 2 - Register the Service Provider

Open the `bootstrap/providers.php` file and add the following:

```php
use Webkul\AzureBlob\Providers\AzureBlobServiceProvider;

return [
    // ...existing providers...
    AzureBlobServiceProvider::class,
];
```

> [!NOTE]
> This registers the `AzureBlobServiceProvider` in the Laravel service container, allowing it to load routes, configurations, and services required by the Azure Blob integration.

---

## Step 3 - Update Composer Autoload

Open `composer.json` and add the following line under the `autoload > psr-4` section:

```json
"Webkul\\AzureBlob\\": "packages/Webkul/AzureBlob/src"
```

> [!TIP]
> This configures PSR-4 autoloading so PHP can automatically resolve classes under the `Webkul\AzureBlob` namespace from the package directory.

---

## Step 4 - Run the Setup Commands

Run the following commands one by one from your project root directory:

```bash
composer dump-autoload
php artisan azure-blob-package:install
php artisan optimize:clear
```

| Command | Purpose |
|---|---|
| `composer dump-autoload` | Regenerates Composer's autoloader mapping to include the newly added namespace. |
| `php artisan azure-blob-package:install` | Runs `composer require` for `league/flysystem-azure-blob-storage` and `microsoft/azure-storage-blob`, runs database migrations, and publishes the admin assets to `public/themes/azure`. |
| `php artisan optimize:clear` | Clears all cached files (bootstrap, configuration, routes, and views) to load the new changes. |

---

## Verify the Installation

Once all commands have completed successfully, log in to your UnoPim dashboard. If the integration is installed correctly, an **Azure Integration** item appears in the left sidebar, with **Documentation** and **Credential** pages.

If something doesn't look right, run `php artisan optimize:clear` again and refresh the page.

---

Next, you'll need to set up your Azure Blob Storage account and retrieve your credentials. Head over to [Azure Blob Storage Setup](./setup.md) to continue.