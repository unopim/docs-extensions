# Actions and searches

Three write operations let another app in your stack push data **into** UnoPim. They call UnoPim's existing REST API directly, so the connector package adds no code for them - which also means they obey exactly the same validation and permissions as any other API client.

| Operation | Type | Endpoint |
|---|---|---|
| **Create Product** | Action | `POST /api/v1/rest/products` |
| **Update Product** | Action | `PATCH /api/v1/rest/products/{sku}` |
| **Find Product** | Search | `GET /api/v1/rest/products/{sku}` |

---

## Common Values vs Scoped Values

Both write actions split product values across two fields, and getting the split wrong is the most frequent configuration error with this connector.

UnoPim keys every value by `(attribute, locale, channel)`. An attribute flagged *value per locale* or *value per channel* must be written under `channel_locale_specific.<channel>.<locale>`; everything else lives in `common`. Putting a scoped attribute in `common` is rejected with **422 Unexpected Attribute**.

| Field | What goes in it |
|---|---|
| **Common Values** | Only attributes that are identical everywhere - typically `url_key`, `weight`, `image`. |
| **Scoped Values** | Attributes that vary by channel or locale - `name`, `description`, `short_description`, `price`, `cost`, and most others. |

> [!TIP]
> **If in doubt, use Scoped Values** and set both a Channel and a Locale. Scoped Values needs both; leaving either blank while filling in Scoped Values raises an error before the request is sent.

When UnoPim does reject a misplaced attribute, the connector rewrites the error to name the attribute and tell you which field to move it to, rather than passing through the bare *Unexpected Attribute* message.

---

## Create Product

Creates a new product in UnoPim.

**Endpoint:** `POST /api/v1/rest/products`

### Inputs

| Field | Required | Notes |
|---|---|---|
| **SKU** | Yes | Unique identifier. Must not already exist. |
| **Family** | Yes | The attribute family that defines which attributes this product has. Dropdown, populated live from your instance. |
| **Enabled** | No | Defaults to yes. Set to **No** to create the product disabled - recommended when the data comes from a supplier form and needs review before going live. |
| **Channel** | No | Channel for the Scoped Values below. Required if Scoped Values is filled in. |
| **Locale** | No | Locale for the Scoped Values below. Required if Scoped Values is filled in. |
| **Common Values** | No | Key/value dictionary, keyed by attribute code. |
| **Scoped Values** | No | Key/value dictionary, keyed by attribute code. Uses the Channel and Locale above. |

### Output

UnoPim answers a create with an acknowledgement only, so the connector merges the SKU back into the result:

| Field | Notes |
|---|---|
| `sku` | The SKU you supplied. The primary key of the step - later steps reference the new product by it. |
| `success` | Boolean. |
| `message` | UnoPim's confirmation message. |

> [!NOTE]
> A product created this way fires **both** `product.created` and `product.updated`, because UnoPim writes the product row first and then saves its values. See [Triggers](./triggers) if you have both triggers switched on.

---

## Update Product

Updates an existing product by SKU. **Only the values you supply are changed** - everything else is left as it is.

**Endpoint:** `PATCH /api/v1/rest/products/{sku}`

The request is a `PATCH`, not a `PUT`, on purpose: a Zap usually carries one or two changed fields, and a `PUT` would blank every attribute the step did not mention.

### Inputs

| Field | Required | Notes |
|---|---|---|
| **SKU** | Yes | SKU of the product to update. Must already exist. |
| **Enabled** | No | Leave blank to keep the current status. |
| **Channel** | No | Channel for the Scoped Values. |
| **Locale** | No | Locale for the Scoped Values. |
| **Common Values** | No | Same rules as Create Product. |
| **Scoped Values** | No | Same rules as Create Product. |

### Output

| Field | Notes |
|---|---|
| `sku` | The SKU you supplied. |
| `success` | Boolean. |
| `message` | UnoPim's confirmation message. |

### When the SKU does not exist

A 404 here is nearly always a **typed** SKU rather than one mapped from an earlier step. The connector replaces UnoPim's bare *not found* with a message that names the value it actually sent and tells you what to do:

> No product in UnoPim has the SKU "…". Map the SKU field to a value from an earlier step rather than typing it, or add a Find Product search before this step to create it when missing.

---

## Find Product

Looks a product up by exact SKU.

**Endpoint:** `GET /api/v1/rest/products/{sku}`

### Inputs

| Field | Required | Notes |
|---|---|---|
| **SKU** | Yes | Exact SKU to look up. No partial matching. |

### Output

The full product record as UnoPim serialises it:

| Field | Notes |
|---|---|
| `sku` | Primary key of the result. The `GET` payload carries no numeric `id`. |
| `status` | Boolean. |
| `type` | `simple`, `configurable`, and so on. |
| `family` | Attribute family code. |
| `parent` | Parent SKU where one exists. |
| `values` | UnoPim's nested value structure, **not** flattened - unlike a trigger payload. |
| `additional`, `associations` | Always present. |
| `created_at`, `updated_at` | ISO 8601. |

### Find-or-create

A missing SKU returns **no results** rather than failing. That is what makes the *create if it does not exist yet* option in the Zap editor work: pair Find Product with Create Product in the same step and the Zap creates the product only when the search comes back empty.

---

## Errors you may see

| Status | What the connector says |
|---|---|
| **401** | Zapier silently re-runs the token exchange and replays the call once. If it still fails, reconnect the account. |
| **403** | *This API key is not permitted to perform that action.* Grant the matching permission on the key under **Configuration → Integrations**. |
| **404** (Update Product) | *No product in UnoPim has the SKU "…"*, with the advice above. |
| **404** (Find Product) | Not an error - an empty result. |
| **422** | UnoPim's validation errors, flattened into one readable line. A misplaced scoped attribute is called out by name. |
| Other 4xx / 5xx | UnoPim's own message, so you see which attribute or permission was the problem rather than a bare status code. |

See [Troubleshooting](./troubleshooting) for the wider list.
