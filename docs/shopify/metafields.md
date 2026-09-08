# Add & Manage Shopify Metafield Definitions

Shopify **metafields** let you store custom product data that goes beyond the standard fields — things like material composition, warranty details, care instructions, or any other product-specific information your store needs.

With the UnoPim Shopify Connector, you can create and manage these metafield definitions directly from UnoPim and export them to Shopify — no need to set them up manually in Shopify admin.

---

## How to Add a Metafield Definition

1. Click the **Shopify icon** in the left sidebar.
2. Click on **Metafield Definitions**.

![Metafield Definitions Tab](./images/meta-filed.png)

3. Click the **Add Definition** button in the top-right corner.

![Add Definition Button](./images/add-defination.png)

Fill in the fields as described below.

---

## Field Descriptions

### Used For
Select the Shopify entity this metafield belongs to — either **Products** or **Variants**. This tells UnoPim where to apply the metafield during export.

---

### UnoPim Attribute
Choose the UnoPim attribute you want to link to this metafield. When a product is exported, the value from this attribute will be sent to Shopify as the metafield value.

---

### Type
Select the data type for the metafield value. Available options are:

| Type | Shopify type | When to use |
|---|---|---|
| **Single line text** | `single_line_text_field` | Short text values like a material name or colour code |
| **Multi-line text** | `multi_line_text_field` | Longer descriptions or notes |
| **Rich text** | `rich_text_field` | Formatted text such as a styled description with headings, lists, and links |
| **Color** | `color` | Hex colour values |
| **Rating** | `rating` | Numerical rating values |
| **URL** | `url` | Links or reference URLs |
| **JSON** | `json` | Structured or complex data |
| **ID** | `id` | A formatted identifier, optionally validated with a regex pattern |
| **Choice list** | `single_line_text_field` | A fixed set of allowed values (from a select or multi-select attribute), stored with a choices validation |
| **Weight** | `weight` | A weight value with its unit — for example `2.5 kg` |
| **Volume** | `volume` | A volume value with its unit — for example `750 ml` |
| **Dimension** | `dimension` | A length value with its unit — for example `30 cm` |
| **Boolean** | `boolean` | A true/false flag — for example "Machine washable" |
| **Date** | `date` | A calendar date — for example a release or expiry date |
| **Date & time** | `date_time` | A date together with a time — for example a launch timestamp |
| **Number** | `number_integer` / `number_decimal` | A numeric value, whole or decimal |
| **Image (file)** | `file_reference` | An image stored in Shopify's Files — for example a size chart or a care-label graphic |
| **File** | `file_reference` | Any non-image file — for example a PDF spec sheet or a safety datasheet |
| **Video (file)** | `file_reference` | A video stored in Shopify's Files |
| **Email** | `single_line_text_field` | An email address — for example a supplier or warranty contact |
| **Link** | `link` | A text-and-URL pair, so you can store the link label alongside the address |
| **Product reference** | `product_reference` | Points to another product — useful for "goes well with" or replacement-part relationships |
| **Product variant reference** | `variant_reference` | Points to a specific product variant rather than the whole product |
| **Collection reference** | `collection_reference` | Points to a Shopify collection |
| **Metaobject reference** | `metaobject_reference` | Points to a metaobject entry — links products to reusable structured data (see [Metaobject Definitions](./metaobjects.md)) |

> **Note on Image vs File:** Shopify stores both as the same underlying type (`file_reference`). The difference is a validation — **Image (file)** restricts uploads to images, while **File** accepts any file type.

> **Note on Email:** Shopify has no dedicated email metafield type. An email metafield is a `single_line_text_field` with a validation rule that checks the value looks like an email address.

---

### Definition Name
A user-friendly label for the metafield — for example, `Material`, `Warranty Info`, or `Color Code`. This is what appears in your UnoPim interface.

---

### Namespace and Key
This is the unique identifier Shopify uses to reference the metafield via its API.

Format: `namespace.key` — for example, `custom.color`

- The **namespace** groups related metafields together and prevents naming conflicts.
- The **key** is the specific identifier within that namespace.

> **Tip:** Use a consistent namespace like `custom` or your brand name across all your metafields to keep them organised.

---

### Description *(Optional)*
Add an internal note to describe what this metafield is for. This is only visible inside UnoPim — it helps your team understand the purpose of each definition at a glance.

---

### Minimum / Maximum Character Count *(Optional)*
Set length limits to enforce data consistency. For example, an SEO title field might have a maximum of 60 characters to avoid search engine truncation.

---

### Pin
When enabled, the metafield appears in the **Metafields** section of the Shopify product/variant edit screen — making it easy to view or manually edit in Shopify admin.

> If not pinned, the metafield will still sync correctly via the API — it just won't be visible in the Shopify UI by default.

---

### Filtering for Products
Enable this if you want the metafield to be available as a **filter on your Shopify storefront** — for example, letting customers filter products by material or colour.

> This option only works for product-type metafields.

---

### Smart Collections
When enabled, this metafield can be used as a **condition rule in Shopify Smart Collections** — allowing you to automatically group products based on the metafield's value.

**Example:** Create a Smart Collection that automatically includes all products where `custom.material` equals `Organic Cotton`.

---

### Storefront Access (Read)
Enables this metafield to be read via the **Shopify Storefront API**. This is required if you want to display the metafield's value on a custom Shopify theme or a headless storefront.

**Example:** If you want to display a `custom.fabricComposition` field on your product page, you must enable this option — otherwise the Storefront API will not return it.

![Storefront Access Example](./images/add-definition-fields.png)

---

### Taxonomy Category

Restrict the metafield to one or more **Shopify taxonomy categories**. When you pick categories here, only products that belong to those categories send this metafield on export — the rest skip it. Leave it empty to apply the metafield to every product.

This mirrors how Shopify scopes category-specific metafields, and helps keep products clean by attaching a metafield only where it's relevant.

> **Note:** The **Taxonomy Category** picker appears only when **Used For** is set to **Products** — variant metafields cannot be constrained by category.

---

## Saving and Exporting

Once all fields are filled in, click **Save**. Your metafield definition is now stored in UnoPim.
