# Purging Old History

The extension ships a built-in Artisan command to keep the `audits` table bounded. The most recent version per record is **always retained** — only older rows are eligible for deletion. It is safe to run from a cron job.

## Basic usage

```bash
# Delete audit rows older than 90 days (prompts for confirmation)
php artisan history-preview-restore:purge --days=90
```

## Command flags

| Flag | Default | Purpose |
|---|---|---|
| `--days=N` | `90` | Purge versions older than N days. Must be ≥ 1. |
| `--entity=X` | *(all entities)* | Limit to one entity tag (e.g. `product`, `asset`, `attribute`). |
| `--batch=N` | `500` | Rows per DELETE batch. Keep modest to avoid table-lock spikes. |
| `--dry-run` | off | Report the number of rows that would be deleted without touching the database. |
| `--force` | off | Skip the confirmation prompt. Required for unattended cron runs. |

## Examples

```bash
# Preview what would be deleted in the last 30 days without touching the DB
php artisan history-preview-restore:purge --days=30 --dry-run

# Limit to product audit rows older than 180 days
php artisan history-preview-restore:purge --days=180 --entity=product

# Limit to DAM asset audit rows older than 60 days
php artisan history-preview-restore:purge --days=60 --entity=asset

# Unattended run with larger batch size
php artisan history-preview-restore:purge --days=90 --batch=1000 --force
```

## Scheduling with Laravel

Add the command to your Laravel scheduler in `app/Console/Kernel.php` to run it automatically:

```php
$schedule->command('history-preview-restore:purge --days=90 --force')
    ->dailyAt('02:00');
```

> [!IMPORTANT]
> Always use `--force` when scheduling, otherwise the command waits for interactive input and the scheduler job hangs.

## Safety guarantee

The purge command never deletes the most recent version for any record. Even if all rows are older than the threshold, the latest one is kept so that Restore remains available for every record.
