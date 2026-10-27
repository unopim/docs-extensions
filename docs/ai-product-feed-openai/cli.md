# CLI Commands

Use the `openai-feed:generate` command for scripts, deployments or troubleshooting:

```bash
# Build the feed now and show a summary table
php artisan openai-feed:generate

# Check your mapping: print 5 rows without writing any file
php artisan openai-feed:generate --dry-run

# Build the feed, then print the public URL to give OpenAI
php artisan openai-feed:generate --show-url

# Hand the work to the queue and return immediately
php artisan openai-feed:generate --queue
```

| Option | What it does |
|---|---|
| *(none)* | Builds the feed in the terminal and prints rows written, file, size, duration and whether it was uploaded over SFTP. |
| `--dry-run` | Shows the first 5 rows as a table. Nothing is written or uploaded. The best way to check a mapping change. |
| `--show-url` | After building, prints the public feed URL **including your token**. Treat the output as a secret. |
| `--queue` | Dispatches a background job instead of building in the terminal. |
| `--source=` | Label stored in the history: `manual` (default), `cron` or `api`. Any other value is rejected before anything is built. |

The command exits with status `0` on success and a non-zero status on failure, so you can use it in scripts and CI.

---

## Other commands

| Command | What it does |
|---|---|
| `php artisan openai-feed:install` | Sets up the extension. See [Installation](./installation.md). |
| `php artisan schedule:list` | Lists scheduled tasks. `openai-feed:generate --source=cron` appears there while the feed is enabled. |
| `php artisan queue:work` | Runs the worker that processes **Generate Now** and `--queue` jobs. |
