---
editLink: false
---

# Attribute Mapping

Open **Google Shopping → Connections**, edit a connection and open its **Attribute Mapping** tab. This maps Google's product fields (title, description, link, image links, brand, gtin, mpn, condition, availability, price, salePrice, shipping, custom labels and more) to the UnoPim attributes that supply their values, for that connection.

## Mapping a field

For each Google field you want to send:

- **Pick a UnoPim attribute.** Only **Image Links**, **Additional Image Links** and **Color** accept more than one attribute; every other field takes one.
- **Or enter a static value** - type a constant in the value column and it is sent for every product (for example `condition = new` or `identifierExists = yes`). While a static value is filled in, the attribute picker for that field is disabled.

Leave a field unmapped to omit it from the feed. Values are coerced to the shape Google expects automatically - prices become `Money` objects, weights and dimensions become `{value, unit}`, booleans are normalised, and image URLs are made absolute.

The **Currency** select on this tab sets the currency used by [Quick Export](./quick-export). Leave it empty to use the channel's currency.

Click **Save**. Saving merges with the existing rules, so a field you do not touch keeps its current mapping. The mapping is read when an export runs, so changes apply to the next export only.

## Images

Google takes one main image and a set of additional images, and the connector fills them from two separate fields:

- **imageLink** - the main product image. Map it to your primary image attribute; the first resolved image is used.
- **additionalImageLinks** - the extra gallery images. This is a multi-value field, so map it to one or more gallery/image attributes and every image they hold is collected into the list. Duplicates are removed, and the main `imageLink` image is dropped from the additional list automatically so it is never sent twice.

Image URLs are made absolute and, when a source image is in a format Google does not accept (such as WebP), converted to a compatible format before being sent, including images served from the DAM.

## Category field

Do not map `googleProductCategory` here. It is sourced from the **Category Mapping** tab and the **Default Google Category** in Required Settings; any rule set for it on this tab is ignored at export time.