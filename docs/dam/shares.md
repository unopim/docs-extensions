# Unopim DAM - Shares Endpoints

Comprehensive guide for managing share links via API

A share turns one asset or one directory into a public URL that anyone can open without a UnoPim account. These endpoints create and manage those links; the recipient's viewing and downloading happens on the public `/share/{token}` URL returned as `public_url`, which needs no authentication at all.

See [Shared Links](./shared-links.md) for the admin-panel workflow and what recipients actually see.

---

## The Share Object

Every endpoint that returns a share returns this shape:

| Field | Notes |
|---|---|
| `id` | Share record ID |
| `token` | The random token embedded in the public URL |
| `name` | Optional custom label shown to the recipient |
| `share_type` | `asset` or `directory` |
| `target_id` | The asset or directory being shared |
| `public_url` | The full URL to send to the recipient |
| `expires_at` | ISO 8601 timestamp, or `null` for a permanent link |
| `revoked_at` | ISO 8601 timestamp if revoked, otherwise `null` |
| `view_count` | How many times the link was opened |
| `download_count` | How many times the file was downloaded |
| `status` | `active`, `expired`, or `revoked` |
| `created_at` | ISO 8601 timestamp |
| `updated_at` | ISO 8601 timestamp. Returned by the list endpoint only. |

---

## GET - Get All Shares

List every share link you can see.

**Endpoint:**
```
GET {{url}}/api/v1/rest/shares?limit=100&page=1
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Parameters:**
- `limit` - Number of results per page (value: 100)
- `page` - Page number (value: 1)
- `sort` / `order` - Column to sort by and direction

### Filtering

Two filters are supported, both with the `=` operator only:

| Filter | Operator | Example |
|---|---|---|
| `share_type` | `=` | `asset`, `directory` |
| `target_id` | `=` | `390` |

The `filters` parameter is a **JSON string**. Every entry needs both an `operator` and a `value`:

```
filters={"<field>":[{"operator":"=","value":"<value>"}]}
```

**Example** — every directory share:
```
GET {{url}}/api/v1/rest/shares?filters={"share_type":[{"operator":"=","value":"directory"}]}
```

**Example** — every share pointing at asset `390`:
```
GET {{url}}/api/v1/rest/shares?filters={"target_id":[{"operator":"=","value":390}]}
```

**Example** — combine both to find the share for one specific asset:
```
GET {{url}}/api/v1/rest/shares?filters={"share_type":[{"operator":"=","value":"asset"}],"target_id":[{"operator":"=","value":390}]}
```

> [!NOTE]
> There is no date or status filtering on this endpoint. To find expired or revoked links, read the `status` field on each returned share.

> [!NOTE]
> Results are scoped to your [directory permissions](./directory-permissions.md): you only see shares whose target lives in a directory granted to your role. A role with no grants gets an empty list.

---

## GET - Get Share by ID

Retrieve a single share link.

**Endpoint:**
```
GET {{url}}/api/v1/rest/shares/1
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

---

## POST - Create a Share (Asset)

Create a share link for a single asset.

**Endpoint:**
```
POST {{url}}/api/v1/rest/shares
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (JSON):**
```json
{
    "share_type": "asset",
    "asset_id": 390,
    "name": "Campaign hero image",
    "expiry_days": 7
}
```

**Parameters:**

| Field | Required | Notes |
|---|---|---|
| `share_type` | Yes | `asset` |
| `asset_id` | Yes | The asset to share |
| `name` | No | Custom label shown to the recipient, up to 255 characters |
| `expiry_days` | No | 1–365 days. Defaults to **7** when omitted. |
| `no_expiry` | No | Set `true` for a link that never expires. Takes precedence over `expiry_days`. |

**Returns** `201` with the share object, including the `public_url` you send to the recipient.

---

## POST - Create a Share (Directory)

Create a share link for a whole directory. The recipient gets a gallery of every asset inside it, plus a **Download all as ZIP** button.

**Endpoint:**
```
POST {{url}}/api/v1/rest/shares
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (JSON):**
```json
{
    "share_type": "directory",
    "directory_id": 1,
    "name": "Brand assets",
    "no_expiry": true
}
```

**Parameters:**

| Field | Required | Notes |
|---|---|---|
| `share_type` | Yes | `directory` |
| `directory_id` | Yes | The directory to share |
| `name` | No | Custom label shown to the recipient |
| `expiry_days` | No | 1–365 days. Defaults to **7**. |
| `no_expiry` | No | Set `true` for a permanent link |

> [!IMPORTANT]
> Shared links are **not password-protected**. Anyone holding the URL can open it until it expires or you revoke it. Set an expiry on anything sensitive rather than relying on `no_expiry`.

---

## PUT - Update a Share

Rename a share or change its expiry. Only the fields you send are changed.

**Endpoint:**
```
PUT {{url}}/api/v1/rest/shares/1
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (JSON):**
```json
{
    "name": "Renamed link",
    "expiry_days": 30
}
```

**Parameters:**

| Field | Notes |
|---|---|
| `name` | New label. Send `null` or an empty string to clear it. |
| `expiry_days` | 1–365. Resets the window, counting from **now** — not from when the link was created. |
| `no_expiry` | Set `true` to make an expiring link permanent |

The share type and its target cannot be changed. To point a link at a different asset, create a new share.

---

## POST - Revoke a Share

Switch a link off. The URL stops working immediately, but the record — and its view and download counts — is kept, so it can be turned back on later.

**Endpoint:**
```
POST {{url}}/api/v1/rest/shares/1/revoke
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

Revoking an already-revoked link returns `success: false` with an explanatory message rather than an error.

---

## POST - Reauthorize a Share

Turn a revoked link back on. **The original URL starts working again** — no new token is minted, so the person you sent it to does not need a new link.

**Endpoint:**
```
POST {{url}}/api/v1/rest/shares/1/reauthorize
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

> [!TIP]
> If you revoked a link because you suspect the URL leaked, **delete** it instead. Revoking keeps the token alive, and a later reauthorize would make the leaked URL live again.

---

## DELETE - Delete a Share

Permanently destroy the share record and its token.

**Endpoint:**
```
DELETE {{url}}/api/v1/rest/shares/1
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

> [!WARNING]
> This cannot be undone. Anyone holding that URL gets **Link not found**, forever.

---

## Related

- [Shared Links](./shared-links.md) — creating and managing shares from the admin panel
- [Directory Permissions](./directory-permissions.md) — controlling who can create shares
