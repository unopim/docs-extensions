# Purging Old History

The extension ships a built-in Artisan command to keep the `audits` table bounded. The most recent version per record is **always retained** — only older rows are eligible for deletion. It is safe to run from a cron job.

## Basic usage

```bash
# Delete audit rows older than the retention set in System Settings (prompts for confirmation)
php artisan history-preview-restore:purge

# Delete audit rows older than 90 days (prompts for confirmation)
php artisan history-preview-restore:purge --days=90
```

## Command flags

| Flag | Default | Purpose |
|---|---|---|
| `--days=N` | **Keep History For (Days)** from System Settings (`90` if not set) | Purge versions older than N days. Must be ≥ 1. |
| `--entity=X` | *(all entities)* | Limit to one entity tag (e.g. `product`, `asset`, `attribute`). |
| `--batch=N` | `500` | Rows per DELETE batch. Keep modest to avoid table-lock spikes. |
| `--dry-run` | off | Report the number of rows that would be deleted without touching the database. |
| `--force` | off | Skip the confirmation prompt. Required for unattended cron runs. |

## Examples

```bash
# Preview how many rows older than 30 days would be deleted, without touching the DB
php artisan history-preview-restore:purge --days=30 --dry-run

# Limit to product audit rows older than 180 days
php artisan history-preview-restore:purge --days=180 --entity=product

# Limit to DAM asset audit rows older than 60 days
php artisan history-preview-restore:purge --days=60 --entity=asset

# Unattended run with larger batch size
php artisan history-preview-restore:purge --days=90 --batch=1000 --force
```

## Automatic purge from System Settings

Go to **Configuration → System Settings → History**:

| Setting | Default | Purpose |
|---|---|---|
| **Auto-Purge Old History** | Off | When on, `history-preview-restore:purge --force` runs once a day through the Laravel scheduler. |
| **Keep History For (Days)** | `90` | Retention used by the auto-purge, and by the command when `--days` is not given. |

> [!WARNING]
> The auto-purge only runs if the Laravel scheduler is running. Add `* * * * * php /path-to-unopim/artisan schedule:run >> /dev/null 2>&1` to the server crontab.

## Custom schedule

To run the purge on your own schedule instead, add it to `routes/console.php`:

```php
use Illuminate\Support\Facades\Schedule;

Schedule::command('history-preview-restore:purge --days=90 --force')
    ->dailyAt('02:00');
```

> [!WARNING]
> Always use `--force` when scheduling, otherwise the command waits for interactive input and the scheduler job hangs.

## Safety guarantee

The purge command never deletes the most recent version for any record. Even if all rows are older than the threshold, the latest one is kept so that Restore remains available for every record.
