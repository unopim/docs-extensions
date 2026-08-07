# Unopim DAM - Comments Endpoints

Comprehensive guide for managing comments via API

---

## POST - Create a Comment

Create a new comment on a digital asset.

**Endpoint:**
```
POST {{url}}/api/v1/rest/comments
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (JSON):**
```json
{
    "comments": "New more varients of this proudct",
    "dam_asset_id": 4
}
```

**Parameters:**

| Field | Required | Notes |
|---|---|---|
| `comments` | Yes | Comment text, between 2 and 1000 characters |
| `dam_asset_id` | Yes | ID of the asset to comment on (value: 4) |
| `parent_id` | No | ID of the comment you are replying to. Leave it out for a top-level comment. |

**Replying to a comment:**
```json
{
    "comments": "Agreed — I'll re-shoot the pack shot.",
    "dam_asset_id": 4,
    "parent_id": 12
}
```

The comment is attributed to the admin behind the bearer token.

---

## GET - Get Comment by ID

Retrieve a specific comment by its ID.

**Endpoint:**
```
GET {{url}}/api/v1/rest/comments/3
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

---

## PUT - Update a Comment

Edit the text of an existing comment.

**Endpoint:**
```
PUT {{url}}/api/v1/rest/comments/3
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (JSON):**
```json
{
    "comments": "Updated comment text"
}
```

> [!IMPORTANT]
> You can only edit **your own** comments. Editing someone else's returns `403`, even with the API permission granted.

---

## DELETE - Delete Comment

Delete a comment from an asset.

**Endpoint:**
```
DELETE {{url}}/api/v1/rest/comments/2
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

> [!IMPORTANT]
> As with editing, you can only delete comments you authored.

---

> [!NOTE]
> Every comment endpoint is also scoped by [directory permissions](./directory-permissions.md) — if you cannot reach the asset, you cannot read or write its comments.
