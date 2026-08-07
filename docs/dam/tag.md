# Unopim DAM - Tags Endpoints

Comprehensive guide for managing tags via API

Tags live in a shared vocabulary. Attaching a tag to an asset creates it on demand if it does not exist yet, so you never have to pre-register a tag before using it. See [Managing Tags](./tags.md) for the admin-panel workflow.

---

## GET - Get All Tags

List every tag in the vocabulary, sorted by name.

**Endpoint:**
```
GET {{url}}/api/v1/rest/tags?query=&per_page=25
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Parameters:**
- `query` - Optional search term; matches anywhere in the tag name
- `per_page` - Results per page, between `1` and `100` (default: `25`)
- `page` - Page number

**Response:**
```json
{
    "success": true,
    "data": [
        { "id": 1, "name": "campaign" },
        { "id": 2, "name": "q3" }
    ],
    "current_page": 1,
    "last_page": 4,
    "total": 87
}
```

---

## GET - Get Tag by ID

Retrieve a specific tag by its ID.

**Endpoint:**
```
GET {{url}}/api/v1/rest/tags/1
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

---

## POST - Create a Tag

Attach a tag to a digital asset. If the tag does not exist in the vocabulary yet, it is created.

**Endpoint:**
```
POST {{url}}/api/v1/rest/tags
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (JSON):**
```json
{
    "tag": "Test",
    "asset_id": 9
}
```

**Parameters:**
- `tag` - Tag name, up to 100 characters (value: Test)
- `asset_id` - Asset ID to attach the tag to (value: 9)

> [!NOTE]
> Tag matching is **case-insensitive**. Sending `Test` when `test` already exists reuses the existing tag rather than creating a duplicate. If the asset already carries that tag, the request is rejected instead of silently doing nothing.

---

## DELETE - Remove a Tag

Detach a tag from an asset. The tag itself stays in the vocabulary and remains attached to any other assets using it.

**Endpoint:**
```
DELETE {{url}}/api/v1/rest/tags
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (JSON):**
```json
{
    "tag": "Test",
    "asset_id": 9
}
```

**Parameters:**
- `tag` - Tag name (value: Test)
- `asset_id` - Asset ID (value: 9)

---

## POST - Bulk Assign Tags

Assign one or more tags to many assets in a single call — the API equivalent of the **Assign Tags** mass action in the admin panel.

**Endpoint:**
```
POST {{url}}/api/v1/rest/tags/bulk
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (JSON):**
```json
{
    "asset_ids": [1, 2, 3],
    "tags": ["campaign", "q3"]
}
```

**Parameters:**

| Field | Required | Notes |
|---|---|---|
| `asset_ids` | Yes | Array of asset IDs, 1 to **500** per request |
| `tags` | Yes | Array of tag names, up to 100 characters each. Missing tags are created; duplicates in the list are collapsed case-insensitively. |

**Response:**
```json
{
    "success": true,
    "message": "3 assets tagged successfully.",
    "count": 3
}
```

> [!IMPORTANT]
> Assets you cannot access, and IDs that do not exist, are **skipped rather than rejected** — the call still returns `200`. Always compare `count` against the number of IDs you sent to confirm the whole batch landed.

Tags are added, never replaced: existing tags on those assets are left untouched.

---

## DELETE - Delete a Tag from the Vocabulary

Remove a tag entirely. It is detached from every asset that used it.

**Endpoint:**
```
DELETE {{url}}/api/v1/rest/tags/1
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

> [!WARNING]
> This is not the same as `DELETE /tags` with a body, which only detaches the tag from one asset. Deleting by ID destroys the tag everywhere and cannot be undone.
