# Shopify Pro

**Shopify Pro** is a paid add-on for the UnoPim Shopify Connector. The connector on its own already exports and imports products, categories, metafields and metaobjects. Pro sits on top of it and adds the parts a larger catalog usually needs - market-specific pricing, automation, and richer mapping.

Pro does not replace the connector. It is installed **alongside** it and quietly takes over the screens it extends, so nothing you already configured has to change.

> [!NOTE]
> Pro requires the UnoPim Shopify Connector to be installed and working first. See [Installation](./installation) for the connector, then [Pro Installation](./pro-installation) for this package.

---

## What Pro adds

| Feature | What it does | Guide |
|---|---|---|
| **Catalogs & catalog prices** | Sell the same product at a different price per market or per B2B company location, using Shopify catalogs and price lists. | [Catalogs](./pro-catalogs) |
| **Scheduled exports** | Run an export automatically - every 15 minutes, hourly, daily, or on your own cron expression. | [Scheduled Exports](./pro-scheduled-exports) |
| **Real-time sync** | Push a product to Shopify within seconds of it being saved in UnoPim, without running an export. | [Real-Time Sync](./pro-realtime-sync) |
| **Advanced export filters** | Narrow an export by locale, attribute, family, category, completeness, time window, or attribute conditions. | [Export Filters](./pro-export-filters) |
| **Advanced mapping** | Money and measurement metafield types, association mapping, and external image/video URL attributes. | [Advanced Mapping](./pro-mapping) |

---

## Community Edition vs Pro

The connector shows a shorter version of this table inside UnoPim under **Shopify → Upgrade to Pro**.

### Import & Export

| Feature | Community | Pro |
|---|:---:|:---:|
| Product export and import | ✅ | ✅ |
| Category and collection sync | ✅ | ✅ |
| Metafield definitions and values | ✅ | ✅ |
| Metaobject definitions and entries | ✅ | ✅ |
| Attribute and family import | ✅ | ✅ |
| **Shopify Catalog** export job | ❌ | ✅ |
| **Shopify Catalog** and **Shopify Catalog Price** import jobs | ❌ | ✅ |

### Export Filters

| Feature | Community | Pro |
|---|:---:|:---:|
| Filter an export by channel, currency, SKU and status | ✅ | ✅ |
| Advanced export filters | ❌ | ✅ |
| Attribute conditions | ❌ | ✅ |

### Mapping

| Feature | Community | Pro |
|---|:---:|:---:|
| Attribute to Shopify field mapping | ✅ | ✅ |
| Money and measurement metafield types | ❌ | ✅ |
| Association mapping | ❌ | ✅ |
| External media mapping | ❌ | ✅ |

### Automation

| Feature | Community | Pro |
|---|:---:|:---:|
| Run an export or import on demand | ✅ | ✅ |
| Scheduled exports | ❌ | ✅ |
| Real-time sync | ❌ | ✅ |

### Pricing

| Feature | Community | Pro |
|---|:---:|:---:|
| Product price from the export mapping | ✅ | ✅ |
| Catalogs and catalog prices | ❌ | ✅ |

---

## How you can tell Pro is active

Once Pro is installed, three things change in the admin panel:

1. The **Upgrade to Pro** entry disappears from the Shopify sidebar - the features it advertised are now installed.
2. The **Pro** badges and the greyed-out "available in Shopify Pro" notices on the mapping, filter and schedule screens turn into working fields.
3. A **Catalogs** tab appears on every Shopify credential.

---

## Requirements

| Requirement | Detail |
|---|---|
| **UnoPim Version** | v3.0.0 or later |
| **Shopify Connector** | Installed and connected to at least one store |
| **Shopify API Version** | 2026-07 |
| **Credential type** | **Manual** (custom app) or **SaaS** credentials for catalogs and price lists |
| **Queue worker** | Required - every export, import and real-time push runs as a background job |
| **Server scheduler** | Required for scheduled exports (`php artisan schedule:run` every minute) |

---

## Access scopes for catalogs and prices

Set these additional scopes on the Shopify custom app used by the credential. Open **Settings -> Apps -> Develop apps**, select the app, then open **Configuration -> Admin API integration**.

<ScopeTable :scopes="[
  { name: 'Markets', permissions: ['read_markets'] },
  { name: 'Catalogs and price lists', permissions: ['write_products', 'read_products'] }
]" />

`write_products` is required to create or update catalogs, price lists, and fixed catalog prices. Shopify does not provide a separate price-list access scope. `read_markets` lets Pro load the markets available for a catalog.

> [!IMPORTANT]
> The Shopify user who creates or edits catalogs also needs Shopify permissions to view markets and create or edit catalogs. API scopes alone are not enough.
