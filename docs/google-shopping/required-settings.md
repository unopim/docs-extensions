---
editLink: false
---

# Required Settings

Open **Google Shopping → Connections**, edit a connection and open its **Required Settings** tab. These values supply the per-connection defaults the exporter needs to build valid Google offers.

| Setting | Required | Use case |
|---|---|---|
| **Channel** | Yes | The Google destination for the offers - `online` for Shopping ads and free listings, or `local` for local inventory. It is part of each product's stable Google id, so keep it consistent across runs. |
| **Language** | Yes | The `contentLanguage` of the submitted offers - the language Google reads the title, description and other text in. Set it to the language your exported locale's content is written in. |
| **Country** | Yes | The `targetCountry` the products are sold and advertised in. It tells Google which market the feed targets and drives the currency and shipping expectations Google applies. |
| **Default Google Category** | No | The `googleProductCategory` used as a fallback whenever a product has no mapped UnoPim category. Picked from the bundled Google taxonomy. Set this so no product is ever sent without a category. |
| **Storefront Base URL** | No | Your public store's base URL. Each product's Google `link` is built from this base plus the product's URL key (or SKU), pointing shoppers to the product page on your verified domain. Leave it empty to omit the link. |

> [!WARNING]
> The `link` is built as `<Storefront Base URL>/<url_key>` (or the SKU when the product has no `url_key`). If your store's product pages use a path prefix, include it in the base, e.g. `https://www.yourstore.com/products`. The domain must be the homepage verified and claimed in Merchant Center, or Google disapproves the products. If the **Link** attribute mapping already returns a full `http(s)://` URL, that URL is used as is.

Click **Save Settings** to persist the values for that connection. The settings are read when an export runs, so changes apply to the next export; products already in Merchant Center keep their old values until they are exported again.