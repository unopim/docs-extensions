# CLI Commands

| Command | What it does |
|---|---|
| `cloudflare-r2-package:install` | One-shot installer — deps + migration + assets. |
| `cloudflare_r2:move_existing_files` | Migrate existing local product, category and DAM asset files to R2. |
| `cloudflare_r2:remove_media_files` | Delete local copies after a successful migration. |
| `cloudflare_r2:export-media` | Sync media to R2, resuming from the last checkpoint (queue-aware). |

## move_existing_files

The main migration command.

```bash
php artisan cloudflare_r2:move_existing_files [options]
```

Options:

| Flag | What it does |
|---|---|
| `--dry-run` | List files without uploading. |
| `--prefix=public/product/cat-1` | Limit to one local folder. Defaults to `public/product` and `public/category`. |
| `--resume` | Resume from the last checkpoint. |
| `--metadata-only` | Write mapping rows only — no upload. |
| `--force` | Skip the confirmation prompt. |

## remove_media_files

```bash
php artisan cloudflare_r2:remove_media_files
```

Asks for confirmation, then verifies each file exists on R2 before deleting the local copy.

## export-media

```bash
php artisan cloudflare_r2:export-media [options]
```

| Flag | What it does |
|---|---|
| `--folder=public/product` | Limit to one local folder. |
| `--dry-run` | List files without uploading. |
| `--isqueue=1` | Dispatch the work to the queue instead of running it now. |

Run inline, it resumes from the last checkpoint and follows the **Re-Synchronize Without Uploading** toggle. With `--isqueue=1` it queues the same job as the **Synchronize Media** button.

## Environment variables

Optional `.env` settings. Run `php artisan config:clear` after changing them, then `php artisan queue:restart`.

| Variable | Default | What it does |
|---|---|---|
| `CLOUDFLARE_R2_VALIDATE_HEAD_AFTER_PUT` | `true` | Checks each upload with a `HEAD` request before marking it synced. Turn off on very high-throughput installs. |
| `CLOUDFLARE_R2_DELETE_LOCAL_AFTER_UPLOAD` | `true` | Deletes the local copy of an imported file once its upload is verified. Set `false` to keep local copies. |
| `CLOUDFLARE_R2_MAPPING_CACHE_TTL` | `86400` | Seconds a file's stored URL stays cached. Clear the cache after changing stored URLs. |
| `CLOUDFLARE_R2_ALLOWED_ENDPOINT_HOSTS` | empty | Comma-separated endpoint hosts that are trusted, e.g. a self-hosted MinIO on a private network. |

## REST API

The credential is also available over the UnoPim REST API, under `api/v1/rest/cloudflare-r2`. Give the API key's role the matching **Cloudflare R2** permissions.

| Method | Path | What it does |
|---|---|---|
| `GET` | `/credential` | Read the saved credential (keys masked). |
| `POST` | `/credential` | Save the credential. |
| `POST` | `/credential/validate` | Test the keys against the bucket. |
| `POST` | `/credential/sync-media` | Queue **Synchronize Media**. |
| `GET` | `/credential/{id}/history` | Read the change history. |
