# Installation

## Requirements

- UnoPim **v1.0.0** or higher
- An active [Icecat](https://icecat.us/) account (username and password)
- A running Laravel queue worker (bulk enrichment jobs are dispatched to the queue)

## Steps

### 1. Extract the extension

Unzip the extension package and merge the `packages/` folder into your UnoPim project root.

```
/your-unopim-project
└── packages/
    └── Webkul/
        └── Icecat/
```

### 2. Register the service provider

Open `bootstrap/providers.php` and add the following entry:

```php
use Webkul\Icecat\Providers\IcecatServiceProvider;

return [
    // ... existing providers ...
    IcecatServiceProvider::class,
];
```

### 3. Register PSR-4 autoload

Open your project-level `composer.json` and add the following entry under `autoload.psr-4`:

```json
"Webkul\\Icecat\\": "packages/Webkul/Icecat/src"
```

### 4. Run setup commands

Run the following commands in order from the project root:

**Dump Composer autoload**

```bash
composer dump-autoload
```

**Run the Icecat installer**

```bash
php artisan icecat:install
```

This publishes migrations, config files, and any seeders required by the connector.

**Restart the queue worker**

```bash
php artisan queue:restart
```

## Verify

Open the UnoPim admin panel and confirm the following:

- An **Icecat** entry appears in the sidebar with sub-links for **Credentials**, **Attribute Mapping**, **Feature Mapping**, and **Locale Mapping**.
- **Data Transfer → Imports** lists the Icecat import job types (Feature Mapping Import, Attribute Import, Enrich Product).

If any menu entries are missing, run `php artisan optimize:clear` and reload the admin panel.

Continue to [Setup Credentials](./setup-credentials) once the menu items appear.
