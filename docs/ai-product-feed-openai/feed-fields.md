# Feed Fields Reference

Each row is one product, or one variant of a configurable product. These are the columns, in file order:

| Column | Where the value comes from |
|---|---|
| `is_eligible_search`, `is_eligible_checkout` | OpenAI Commerce Flags |
| `item_id` | The UnoPim product ID (the variant's ID for variants) |
| `title`, `description`, `brand`, `gtin`, `mpn`, `material`, `color`, `size` | Attribute Mapping |
| `url` | Product URL Template, or `<Seller URL>/products/<sku>` |
| `condition` | Mapped value, or `new` |
| `product_category` | The product's first category as a path in the feed locale, e.g. `Audio & Electronics > Headphones > Over-ear` |
| `length`, `width`, `height`, `dimensions_unit` | Dimension mappings |
| `weight`, `item_weight_unit` | Weight mapping |
| `age_group`, `gender` | Mapped and normalised values |
| `image_url`, `additional_image_urls` | Image mapping (first image, then the rest) |
| `price`, `sale_price`, `shipping_price` | Price mappings with currency, e.g. `309.00 EUR` |
| `availability` | `in_stock` if the product or variant is enabled, otherwise `out_of_stock` |
| `group_id`, `listing_has_variations`, `variant_dict` | Filled for variants: `grp_<parent id>`, `true`, and the variant's super-attribute values |
| `is_digital` | Always `false` |
| `seller_name`, `seller_url`, `seller_privacy_policy`, `seller_tos` | Store / Brand Information |
| `accepts_returns`, `return_deadline_in_days`, `return_policy`, `accepts_exchanges` | Return Policy |
| `review_count`, `star_rating` | Review mappings |
| `target_countries`, `store_country` | Geography & Targeting |

**Format differences.** TSV has a header row and text values (`true`/`false`, `["US","CA"]`). JSONL and JSON use real types: booleans, whole numbers, arrays for `target_countries` and `additional_image_urls`, and an object for `variant_dict`. They also leave out empty fields.

A product is **left out** of the feed when it has no usable price in any selected currency, when it is disabled and *Only Enabled Products* is on, or when it falls beyond the *Product Limit*. Disabled variants of a configurable product are skipped.
