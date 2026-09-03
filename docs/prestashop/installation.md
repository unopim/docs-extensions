# Installation Guide — UnoPim PrestaShop Connector

---

## Introduction

The PrestaShop Connector for UnoPim enables seamless synchronization of product data between UnoPim and PrestaShop.

It allows businesses to centrally manage their product catalog in UnoPim and export it directly to their PrestaShop store. Using this connector, users can maintain product information within UnoPim and push categories, products, attributes, and variants to PrestaShop efficiently.

---

## Requirements

| Requirement | Version |
|---|---|
| UnoPim | 2.1.x |
| PHP | 8.3 or higher |
| Laravel | 12.x |

---


## Installation

Follow the steps below to install the PrestaShop Connector in UnoPim.

### Step 1 — Extract the Extension

Unzip the extension package and merge the `packages` folder into your project root directory:

```
/your-unopim-project
└── packages/webkul
```

---

### Step 2 — Register the Service Provider

Open `bootstrap/providers.php` and add the following under the providers array:

```php
use Webkul\Prestashop\Providers\PrestashopServiceProvider;

return [
    // ... existing providers ...
    PrestashopServiceProvider::class,
];
```

---

### Step 3 — Register PSR-4 Autoload

Open `composer.json` and add the following entry under the `psr-4` section:

```json
"Webkul\\Prestashop\\": "packages/Webkul/Prestashop/src"
```

---

### Step 4 — Run Setup Commands

Run the following commands from the project root directory.

**Dump Composer Autoload**

```bash
composer dump-autoload
```

**Install PrestaShop Package**

```bash
php artisan prestashop:install
```

**Clear Application Cache**

```bash
php artisan optimize:clear
```

**Restart Queue Worker**

```bash
php artisan queue:restart
```

---

## Usage

After successful installation:

1. Navigate to the **PrestaShop Connector** section in the UnoPim admin panel.
2. Add your PrestaShop credentials.
3. Export categories, attributes, products, and variants to PrestaShop.
