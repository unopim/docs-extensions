# Unopim DAM - Properties Endpoints

Comprehensive guide for managing properties via API

Properties are the localised key/value metadata you attach to an asset — a description, a usage right, a photographer credit — stored per locale.

---

## POST - Create a Property

Create a new property on an asset.

**Endpoint:**
```
POST {{url}}/api/v1/rest/properties/7
```

> [!IMPORTANT]
> The ID in the URL is the **asset ID**, not a property ID. `/properties/7` creates a property on asset `7`.

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (JSON):**
```json
{
    "name": "Description",
    "type": "Text",
    "value": "This image showcases the new winter collection of jackets.",
    "language": "en_US"
}
```

**Parameters:**

| Field | Required | Notes |
|---|---|---|
| `name` | Yes | Property name, 3–100 characters. Must be unique for that asset **within the same locale**. |
| `type` | Yes | Property type, e.g. `Text` |
| `value` | Yes | Property value, up to 1000 characters |
| `language` | Yes | Locale code, e.g. `en_US`. Must be an **enabled** locale, otherwise the request returns `400`. |

Because uniqueness is scoped per locale, the same property name can carry a different value in each language.

---

## GET - Get Property by ID

Retrieve a specific property by its ID.

**Endpoint:**
```
GET {{url}}/api/v1/rest/properties/3
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

---

## PATCH - Update Property

Update an existing property's name and value.

**Endpoint:**
```
PATCH {{url}}/api/v1/rest/properties/1
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (JSON):**
```json
{
    "name": "New Property",
    "value": "This is the New Property"
}
```

**Parameters:**

| Field | Required | Notes |
|---|---|---|
| `name` | Yes | Property name, 3–100 characters, unique for that asset |
| `value` | Yes | Property value |

> [!NOTE]
> `type` and `language` are fixed at creation time and are ignored here. To change the locale of a property, delete it and create it again.

---

## DELETE - Delete Property

Delete a property from an asset.

**Endpoint:**
```
DELETE {{url}}/api/v1/rest/properties/2
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

No request body is required.

---

> [!NOTE]
> Every property endpoint is scoped by [directory permissions](./directory-permissions.md) — you can only read or write properties on assets you can reach.
