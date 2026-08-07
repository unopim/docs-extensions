# Unopim DAM - Directories Endpoints

Comprehensive guide for managing directories via API

---

## GET - Get All Directories

Retrieve the full directory tree.

**Endpoint:**
```
GET {{url}}/api/v1/rest/directories
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Parameters:**
- `with_assets` - Set to `true` to include each directory's assets in the tree. Omitted or `false` returns the folder structure only, which is much lighter.

**Example:**
```
GET {{url}}/api/v1/rest/directories?with_assets=true
```

> [!NOTE]
> The tree is scoped to the calling user's [directory permissions](./directory-permissions.md) — you only see the folders your role has been granted.

---

## GET - Get Directory by ID

Retrieve a specific directory, with its children and assets.

**Endpoint:**
```
GET {{url}}/api/v1/rest/directories/1
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

Returns `403` if your role has no view access to that directory, and `404` if it does not exist.

---

## POST - Create a Directory

Create a new directory in the DAM system.

**Endpoint:**
```
POST {{url}}/api/v1/rest/directories
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (Form Data):**
- `name` - Directory name (value: Testing_Directory)
- `parent_id` - Parent directory ID (value: 1). Defaults to the root directory (`1`) when omitted.

**Returns** `201` with the new directory, or `403` if you cannot access the parent.

> [!TIP]
> If your role uses **custom** directory permissions, the folder you just created is granted to your role automatically — you do not have to go back to the role screen to give yourself access to it.

---

## PUT - Update a Directory

Rename an existing directory.

**Endpoint:**
```
PUT {{url}}/api/v1/rest/directories/2
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (JSON):**
```json
{
    "name": "Testing Directory",
    "parent_id": 1
}
```

> [!NOTE]
> Only `name` is applied by this endpoint. To move a directory to a different parent, use the move action in the [Explorer](./explorer.md).

---

## DELETE - Delete a Directory

Delete a directory and everything inside it.

**Endpoint:**
```
DELETE {{url}}/api/v1/rest/directories/4
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Returns** `202 Accepted` — the deletion runs as a **queued background job**, so a large folder does not block the request. The response body carries the parent directory so you can refresh your view immediately.

> [!IMPORTANT]
> The root directory cannot be deleted, and the queue worker must be running for the job to actually execute. See [Artisan Commands](./commands.md) for the queue setup.
