# Installation

Follow the steps below to install the **History Preview & Restore** extension in your UnoPim project.

## Steps

### 1. Place the package

Download and unzip the extension. Rename the folder to `HistoryPreviewRestore` and place it at:

```
packages/Webkul/HistoryPreviewRestore/
```

### 2. Register the service provider

Add to `bootstrap/providers.php`:

```php
use Webkul\HistoryPreviewRestore\Providers\HistoryPreviewRestoreServiceProvider;

return [
    // ...existing providers...
    HistoryPreviewRestoreServiceProvider::class,
];
```

> [!NOTE]
> This registers `HistoryPreviewRestoreServiceProvider` in the Laravel application's service container so the extension can load its routes, views, and configuration on startup.

### 3. Update Composer autoload

In your project's root `composer.json`, add under `autoload.psr-4`:

```json
"autoload": {
    "psr-4": {
        "Webkul\\HistoryPreviewRestore\\": "packages/Webkul/HistoryPreviewRestore/src"
    }
}
```

### 4. Run the install commands

Run these commands in order:

```bash
composer dump-autoload
php artisan migrate
php artisan optimize:clear
```

| Command | Purpose |
|---|---|
| `composer dump-autoload` | Regenerates Composer's autoloader mapping to include the newly added namespace. |
| `php artisan migrate` | Adds a `metadata` JSON column to the `audits` table required by the extension. |
| `php artisan optimize:clear` | Clears all cached files (bootstrap, configuration, routes, and views) to load the new changes. |

### 5. Give roles the correct permissions

Open **Settings → Roles**, edit the relevant role, and enable the History permissions:

- **History** — view the History tab on any record.
- **History → Restore** — click the Restore button.

See [Permissions](./permissions) for full details.

## Check it worked

1. Open any product (or category, attribute, etc.) and navigate to its **History** tab.
2. If the record has audit rows, each row should now show a **Restore** button and inline file thumbnails where applicable.
3. Click **Restore** on any row — a confirmation dialog should appear.

If the History tab is missing or the Restore button does not appear, see that the service provider is registered and that the role has the correct permissions.
