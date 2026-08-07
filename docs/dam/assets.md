# Unopim DAM - Assets Endpoints

Comprehensive guide for managing digital assets via API

## GET - Get All Assets

Retrieve a paginated list of all assets in the system.

**Endpoint:**
```
GET {{url}}/api/v1/rest/assets?limit=100&page=1
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Parameters:**
- `limit` - Number of results per page (value: 100)
- `page` - Page number (value: 1)
- `sort` - Column to sort by (defaults to `id`)
- `order` - `asc` or `desc`

Each asset in the response carries `id`, `file_name`, `file_type`, `file_size`, `mime_type`, `extension`, `path`, `preview_path`, `created_at` and `updated_at`.

> [!NOTE]
> Results are always scoped to the calling user's [directory permissions](./directory-permissions.md). A role with no directory grants receives an empty result set rather than an error.

### Filtering

Narrow the list with the `filters` parameter. It is a **JSON string**, and every entry needs both an `operator` and a `value`:

```
filters={"<field>":[{"operator":"=","value":"<value>"}]}
```

```
GET {{url}}/api/v1/rest/assets?filters={"file_type":[{"operator":"=","value":"image"}]}
```

> [!IMPORTANT]
> `filters` must be valid JSON. Malformed JSON returns `400 filter query parameter should be valid JSON`, and an entry missing its `operator` returns `422`.

| Filter | Matching | Example |
|---|---|---|
| `file_type` | Exact | `image`, `video`, `document`, `audio` |
| `mime_type` | Always partial | `image/` matches every image type |
| `extension` | Always partial | `pdf` |
| `file_name` | Operator honoured — `=`, `LIKE` | `hero-banner` |
| `code` | Always partial, against the **file name** | `hero` |
| `file_size` | `=`, `<`, `>`, `<=`, `>=` | `1048576` (bytes) |
| `created_at` | Exact date, or a `from`/`to` range | `2026-01-01` |
| `updated_at` | Exact date, or a `from`/`to` range | `2026-07-01` |

> [!IMPORTANT]
> `mime_type`, `extension` and `code` ignore whatever operator you send and always run a partial match. `code` is an alias that searches the **file name**, not a separate code column. For an exact file-name match use `file_name` with `=`.

**Examples:**

Every PNG image:
```
GET {{url}}/api/v1/rest/assets?filters={"extension":[{"operator":"=","value":"png"}]}
```

Assets larger than 5 MB:
```
GET {{url}}/api/v1/rest/assets?filters={"file_size":[{"operator":">","value":5242880}]}
```

Assets created on one specific date:
```
GET {{url}}/api/v1/rest/assets?filters={"created_at":[{"operator":"=","value":"2026-07-01"}]}
```

Assets created within a date range — add `from` and `to` alongside the operator:
```
GET {{url}}/api/v1/rest/assets?filters={"created_at":[{"operator":"=","from":"2026-07-01","to":"2026-07-31"}]}
```

Combine fields — every video larger than 5 MB:
```
GET {{url}}/api/v1/rest/assets?filters={"file_type":[{"operator":"=","value":"video"}],"file_size":[{"operator":">","value":5242880}]}
```

> [!NOTE]
> Date filters match a **whole day**, not a moment. `>=` and `<=` are not applied to `created_at` or `updated_at` — use the `from`/`to` range above for an open or closed window.

---

## GET - Get Asset by ID

Retrieve a specific asset by its ID.

**Endpoint:**
```
GET {{url}}/api/v1/rest/assets/390
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

The response bundles the asset record together with its `tags`, `property` (custom properties), `comments`, `resources` (linked products and categories) and — for images — `embeddedMetaInfo`.

---

## GET - Get Asset Embedded Metadata

Return the embedded metadata (EXIF, IPTC, XMP, ID3, and so on) that was extracted from the file when it was uploaded. For images that have no stored metadata, the file is read on demand instead.

**Endpoint:**
```
GET {{url}}/api/v1/rest/assets/390/metadata
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
        "asset_id": 390,
        "file_name": "hero-banner.jpg",
        "file_type": "image",
        "mime_type": "image/jpeg",
        "meta_data": {
            "Make": "Canon",
            "Model": "Canon EOS R5",
            "DateTimeOriginal": "2026:03:14 09:21:07"
        }
    }
}
```

> [!NOTE]
> The `{id}` segment must be numeric, and the asset must sit in a directory your role can access.

---

## PUT - Get Asset Edit Data

Return everything the asset edit screen needs in one call — the asset with a full-size preview URL, its comments newest-first, and the complete tag vocabulary you can pick from.

**Endpoint:**
```
PUT {{url}}/api/v1/rest/assets/edit/390
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

---

## POST - Upload New Asset

Upload one or more files into a directory.

**Endpoint:**
```
POST {{url}}/api/v1/rest/assets
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (Form Data):**
- `files[]` - Asset file(s) to upload — repeat the key to send several in one request
- `directory_id` - Directory ID the files land in (value: 1)

**Returns** `201` when every file was stored, or `422` with an `errors` array listing the files that were rejected. Successfully stored files are still returned under `files`, so a partial upload is never silently lost.

A file is rejected when it exceeds the configured maximum upload size, when its type is on the forbidden list, or when the target directory is not writable on disk. See [Configuration](./configuration.md) for the size limit and the allowed file types.

### Uploading from a URL

Instead of binaries you can pass `files` as a **comma-separated list of public URLs** and UnoPim will fetch them server-side:

```json
{
    "directory_id": 1,
    "files": ["https://example.com/hero.jpg,https://example.com/manual.pdf"]
}
```

> [!IMPORTANT]
> Remote URLs are guarded against SSRF. Only `http` and `https` are accepted, and every IP the host resolves to must be a public address — loopback, link-local (including the cloud metadata endpoint `169.254.169.254`), private and reserved ranges are all blocked.

---

## POST - Re-upload Asset

Re-upload an existing asset file, replacing the current version.

**Endpoint:**
```
POST {{url}}/api/v1/rest/assets/reupload
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (Form Data):**
- `file` - Asset file
- `asset_id` - Asset ID (value: 390)

---

## PUT - Update Asset

Update asset metadata such as file name. Send only the fields you want to change.

**Endpoint:**
```
PUT {{url}}/api/v1/rest/assets/211
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (JSON):**
```json
{
    "file_name": "Update File Name"
}
```

**Parameters:**

| Field | Type | Notes |
|---|---|---|
| `file_name` | string | The display name of the asset |
| `file_type` | string | `image`, `video`, `document`, `audio` |
| `file_size` | integer | Size in bytes |
| `mime_type` | string | e.g. `image/png` |
| `extension` | string | e.g. `png` |
| `path` | string | Storage path |
| `tags` | array | Array of **existing tag IDs**. The list is synced — tags you leave out are detached. An unknown ID returns `400`. |

---

## DELETE - Delete Asset

Delete an asset from the DAM system.

**Endpoint:**
```
DELETE {{url}}/api/v1/rest/assets/384
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

> [!WARNING]
> An asset that is still attached to a product or a category cannot be deleted. Detach it from its [linked resources](./linked-resources.md) first, otherwise the request is refused and the file is left in place.

---

## GET - Download Asset

Request a download link for an asset. The endpoint does not stream the file itself — it returns a short-lived URL that you then fetch.

**Endpoint:**
```
GET {{url}}/api/v1/rest/assets/download/210
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
        "download_url": "https://yourdomain.com/api/v1/rest/assets/signUrlDownload/210?expires=..&signature=.."
    }
}
```

The returned URL is valid for **10 minutes**. On S3 it is a pre-signed S3 URL; on local storage it is a signed UnoPim route.

---

## GET - Signed URL Download

Download an asset using a signed URL. This endpoint is validated by the URL signature rather than a bearer token, so it can be handed to a client or a browser that has no API credentials.

**Endpoint:**
```
GET {{url}}/api/v1/rest/assets/signUrlDownload/210
```

The URL must carry a valid Laravel signature. Requests with a missing, tampered, or expired signature are rejected.

> [!TIP]
> If you need to give a **person** access to a file, a [shared link](./shared-links.md) is usually the better tool — it has an expiry, a revoke switch, view/download counters, and a proper viewer page.

---

