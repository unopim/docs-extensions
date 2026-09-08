# Installation

## Requirements

- Unopim v3.0.0
- PHP 8.4+, Laravel 13.x, Concord ^1.16

## Steps

### 1. Merge the package files

Unzip the extension package, rename the folder to `PricingRuleModule`, and place it at `packages/Webkul/PricingRuleModule` inside your Unopim project.

### 2. Register the service provider

Add to `bootstrap/providers.php`:

```php
use Webkul\PricingRuleModule\Providers\PricingRuleModuleServiceProvider;

return [
    // ...existing providers...
    PricingRuleModuleServiceProvider::class,
];
```

### 3. Register the Concord module

Unopim 3.0 resolves models through Concord. Add the module provider to the `modules` array in `config/concord.php`:

```php
return [
    'modules' => [
        // ...existing modules...
        Webkul\PricingRuleModule\Providers\ModuleServiceProvider::class,
    ],
];
```

### 4. Update Composer autoload

In `composer.json`, add under `autoload.psr-4`:

```json
"Webkul\\PricingRuleModule\\": "packages/Webkul/PricingRuleModule/src"
```

### 5. Run installation commands

Run these in order:

```bash
composer dump-autoload
php artisan optimize:clear
php artisan migrate
```

### 6. Publish front-end assets

The module ships with pre-built assets — no `npm install` or build step is required:

```bash
php artisan vendor:publish --tag=pricingrulemodule --force
```

### 7. Start the queue worker

Rule execution is dispatched as queued jobs (`ApplyPriceRule`, `ApplyPriceRuleToProducts`). Keep a worker running:

```bash
php artisan queue:work
```

In production, run the worker under a process supervisor (Supervisor, systemd, etc.) so it restarts automatically.

### 8. Verify

Open the Unopim admin panel — a **Pricing Rule** entry should appear in the sidebar and clicking it should open the rule listing page.
