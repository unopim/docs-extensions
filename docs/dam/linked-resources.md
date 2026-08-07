# Unopim DAM - Linked Resources Endpoints

Comprehensive guide for managing linked resources via API

A linked resource is the record that ties an asset to a product or a category — created whenever you assign an asset to either. See [Asset Products](./asset-products.md) and [Asset Categories](./asset-categories.md) for how those links are made in the admin panel.

---

## GET - Get the Linked Resources

Retrieve a linked-resource record by its ID.

**Endpoint:**
```
GET {{url}}/api/v1/rest/linked-resource/9
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "id": 9,
        "type": "product",
        "dam_asset_id": 390,
        "product_id": 42,
        "category_id": null,
        "related_field": "image"
    }
}
```

**Fields:**

| Field | Notes |
|---|---|
| `type` | `product` or `category` |
| `dam_asset_id` | The linked asset |
| `product_id` | Set when `type` is `product`, otherwise `null` |
| `category_id` | Set when `type` is `category`, otherwise `null` |
| `related_field` | The attribute the asset is attached to |

> [!NOTE]
> The ID in the URL is the **linked-resource record ID**, not an asset ID. To list every resource attached to a given asset, call [`GET /assets/{id}`](./assets.md#get-get-asset-by-id) — the response includes a `resources` array.

Returns `404` if no linked-resource record with that ID exists.
