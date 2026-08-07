# Unopim DAM API Documentation

RESTful API for Digital Asset Management

---

## Overview

The Unopim DAM (Digital Asset Management) API provides a comprehensive RESTful interface for managing digital assets, directories, properties, tags, comments, share links, and linked resources. This API enables developers to integrate Unopim's DAM capabilities into their applications.

---

## Authentication

All API endpoints require Bearer Token authentication.

### Headers Required

```
Authorization: Bearer {{token}}
Accept: application/json
```

**Parameters:**
- `{token}` - Your API authentication token
- `Accept: application/json` - Specifies the response format

**Example Request:**
```
curl -X GET "{{url}}/api/v1/rest/assets" \
  -H "Authorization: Bearer your_token_here" \
  -H "Accept: application/json"
```

---

## Base URL

All API requests should use the following base URL:

```
{{url}}/api/v1/rest
```

**Parameters:**
- `{url}` - Your Unopim installation URL (e.g., https://yourdomain.com)

**Example:**
```
https://yourdomain.com/api/v1/rest
```

---

## Endpoint Index

### Assets — [full reference](./assets.md)

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/assets` | List assets, with filters and pagination |
| `GET` | `/assets/{id}` | Fetch one asset with its tags, properties, comments and linked resources |
| `GET` | `/assets/{id}/metadata` | Read the embedded EXIF/IPTC metadata |
| `PUT` | `/assets/edit/{id}` | Fetch the asset edit payload |
| `POST` | `/assets` | Upload one or more files, or fetch them from URLs |
| `POST` | `/assets/reupload` | Replace an asset's file, keeping its ID |
| `PUT` | `/assets/{id}` | Update asset metadata |
| `GET` | `/assets/download/{id}` | Get a 10-minute download URL |
| `DELETE` | `/assets/{id}` | Delete an asset |

### Directories — [full reference](./directories.md)

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/directories` | Fetch the directory tree |
| `GET` | `/directories/{id}` | Fetch one directory with its children and assets |
| `POST` | `/directories` | Create a directory |
| `PUT` | `/directories/{id}` | Rename a directory |
| `DELETE` | `/directories/{id}` | Delete a directory (queued) |

### Comments — [full reference](./comments.md)

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/comments/{id}` | Fetch a comment |
| `POST` | `/comments` | Add a comment or a threaded reply |
| `PUT` | `/comments/{id}` | Edit your own comment |
| `DELETE` | `/comments/{id}` | Delete your own comment |

### Properties — [full reference](./property.md)

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/properties/{id}` | Fetch a property |
| `POST` | `/properties/{assetId}` | Add a localised property to an asset |
| `PATCH` | `/properties/{id}` | Update a property's name and value |
| `DELETE` | `/properties/{id}` | Delete a property |

### Tags — [full reference](./tag.md)

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/tags` | List the tag vocabulary, searchable |
| `GET` | `/tags/{id}` | Fetch a tag |
| `POST` | `/tags` | Attach a tag to an asset |
| `DELETE` | `/tags` | Detach a tag from an asset |
| `POST` | `/tags/bulk` | Assign tags to up to 500 assets at once |
| `DELETE` | `/tags/{id}` | Delete a tag from the vocabulary entirely |

### Shares — [full reference](./shares.md)

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/shares` | List share links |
| `GET` | `/shares/{id}` | Fetch one share link |
| `POST` | `/shares` | Create a share for an asset or a directory |
| `PUT` | `/shares/{id}` | Rename a share or change its expiry |
| `POST` | `/shares/{id}/revoke` | Switch a link off, reversibly |
| `POST` | `/shares/{id}/reauthorize` | Turn a revoked link back on |
| `DELETE` | `/shares/{id}` | Permanently delete a share |

### Linked Resources — [full reference](./linked-resources.md)

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/linked-resource/{id}` | Fetch the record linking an asset to a product or category |

---

## Permissions

Two independent layers decide what a request can do.

**1. API permissions.** Each endpoint is gated by an `api.dam.*` key granted to the API key's role under **Settings → Roles**:

| Group | Keys |
|---|---|
| Assets | `api.dam.assets`, `.getById`, `.metadata`, `.upload`, `.re-upload`, `.edit`, `.update`, `.download`, `.delete` |
| Directories | `api.dam.directory`, `.getById`, `.create`, `.edit`, `.delete` |
| Comments | `api.dam.comment`, `.getById`, `.create`, `.edit`, `.delete` |
| Properties | `api.dam.property`, `.create`, `.edit`, `.delete` |
| Tags | `api.dam.tags`, `.all`, `.create`, `.delete`, `.bulk-assign`, `.destroy` |
| Shares | `api.dam.shares`, `.get`, `.getById`, `.create`, `.update`, `.revoke`, `.reauthorize`, `.delete` |
| Linked Resources | `api.dam.linked-resource`, `.get` |

**2. Directory permissions.** On top of that, every asset, share and directory request is scoped to the folders the caller's role has been granted. See [Directory Permissions](./directory-permissions.md).

The distinction matters: a role with `api.dam.assets` but no directory grants gets an **empty list**, not a `403`. Listing endpoints filter silently; single-record endpoints return `403`.

---

## Postman Collection

To interact with Unopim DAM's API, you can use our official Postman collection:

- **[UnoPim DAM APIs Documentation](https://documenter.getpostman.com/view/4385199/2sBXVhEWjQ)** - Detailed information about all available API endpoints, parameters, and response formats
- **[UnoPim DAM APIs on Postman](https://www.postman.com/unopim/unopim-apis/collection/4385199-086948c4-9e81-4271-abb7-6d6995a67304?ctx=info)** - Official Postman collection with ready-to-use API requests

The collection ships with the package at `packages/Webkul/DAM/postman/Unopim-DAM-API.postman_collection.json` — import it into Postman and set the `url` and `token` collection variables to start testing straight away.
