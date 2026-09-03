# Installation

The DAM NextCloud extension is shipped as a `.zip` after purchase. Install it manually in your UnoPim project.

## Prerequisites

Confirm these are in place before you start:

- UnoPim 3.0+ with UnoPim DAM already installed.
- PHP 8.4.1+.
- A working Laravel queue worker (`redis` or `database` driver; `sync` is not recommended for production).
- The single Laravel scheduler cron entry in place.

## 1. Extract the package

Unzip the downloaded archive into your UnoPim project's `packages/Webkul/` directory and rename the folder to `DamWebdav`:

```bash
cd /path/to/your/unopim
unzip ~/Downloads/dam-webdav.zip -d packages/Webkul/DamWebdav
```

You should end up with `packages/Webkul/DamWebdav/src/`.

## 2. Register the service provider

Open `bootstrap/providers.php` and add the service provider to the return array:

```php
use Webkul\DamWebdav\Providers\DamWebdavServiceProvider;

// inside the return [ ... ] array:
DamWebdavServiceProvider::class,
```

> [!NOTE]
> Do **not** add an entry in `config/concord.php`. `DamWebdavServiceProvider` registers `ModuleServiceProvider` itself — adding it to Concord registers the module twice.

## 3. Register the autoloader

Open the project's root `composer.json` and add the namespace under `autoload.psr-4`:

```jsonc
{
    "autoload": {
        "psr-4": {
            "Webkul\\DamWebdav\\": "packages/Webkul/DamWebdav/src/"
        }
    }
}
```

## 4. Install Composer dependencies

The package's runtime dependencies must be declared on the root project manifest (packages under `packages/` do not have their own `composer.json` resolved during install):

```bash
composer require sabre/dav:^4.6 bacon/bacon-qr-code:^3.0
composer dump-autoload
```

## 5. Run the install command

```bash
php artisan dam-webdav:install
php artisan optimize:clear
```

`dam-webdav:install` runs all package migrations, seeds ACL permissions, and clears caches. It is safe to run on a live install.

> [!WARNING]
> If UnoPim DAM is **not yet installed**, run `php artisan dam-package:install` first. Skip this step if DAM is already active — running it again will drop existing DAM data.

## 6. Publish font assets

The package ships an icon font used by the admin UI. Publish it to `public/`:

```bash
php artisan vendor:publish --tag=dam-webdav-assets --force
```

Verify the font file is reachable:

```bash
curl -I https://your-unopim.example.com/vendor/dam-webdav/fonts/dam-webdav-icons.woff2
# → HTTP 200
```

Re-run with `--force` after every upgrade to refresh published files.

## 7. Configure nginx

Stock Laravel nginx configs include a rule that intercepts URLs ending in a static-file extension and returns `404` before PHP is reached. This breaks WebDAV file downloads — the client sees **"File was deleted from server"** even though the file exists.

Add these three location blocks **above** the static-asset rule in your nginx server block:

```nginx
location ^~ /remote.php/ { try_files $uri /index.php?$query_string; }
location ^~ /webdav/dam  { try_files $uri /index.php?$query_string; }
location ^~ /ocs/        { try_files $uri /index.php?$query_string; }
```

`^~` outranks regex locations, so these claim the WebDAV endpoints before the extension rule fires. Reload nginx after the change.

> If you changed `DAM_WEBDAV_BASE_PATH` from the default `/webdav/dam`, update the second block to match.

Apache users do not need this change — `.htaccess` routes on file existence, not URL extension.

## 8. Configure the scheduler

Add the Laravel scheduler to cron (once per server) so automatic sync and trash-purge jobs fire on time:

```bash
* * * * * cd /path/to/unopim && php artisan schedule:run >> /dev/null 2>&1
```

## 9. Run a queue worker

Sync jobs and Login Flow side-effects are dispatched to the Laravel queue. Start a worker:

```bash
php artisan queue:work --queue=default
```

Use Supervisor or systemd to keep it running in production.

## 10. Verify the installation

Run the built-in diagnostic command:

```bash
php artisan dam-webdav:doctor
```

A healthy output looks like:

```
  ok      /status.php answers JSON
  ok      PROPFIND listed 17 entries
  ok      GET download.jpeg returned 4840 bytes of image/jpeg
```

The doctor command tests a **download** (not just a listing), which is the operation most likely to fail due to the nginx static-asset rule. Pass `--url` when `APP_URL` differs from the address clients use. The command issues a throwaway credential and deletes it after the test, so it is safe on a live install.

Also confirm the routes and migrations registered correctly:

```bash
php artisan route:list | grep -E "nextcloud|webdav"
php artisan migrate:status | grep dam_webdav
```

Expected tables (with the `wk_` prefix UnoPim uses by default):

- `wk_dam_webdav_credentials`
- `wk_dam_webdav_sync_profiles`
- `wk_dam_webdav_remote_sources`
- `wk_dam_webdav_sync_events`
- `wk_dam_webdav_trash`

Sign in to the admin panel — a new **Nextcloud** menu item appears in the sidebar.

## Artisan commands reference

| Command | Description |
|---|---|
| `php artisan dam-webdav:install` | Run migrations, seed ACL, clear caches |
| `php artisan dam-webdav:doctor` | Verify listing **and** download work; diagnose nginx misconfiguration |
| `php artisan vendor:publish --tag=dam-webdav-assets --force` | Republish icon font assets |
| `php artisan nextcloud:sync` | Dispatch sync jobs for all due remote sources |
| `php artisan nextcloud:sync {id}` | Dispatch a sync job for a specific remote source |
| `php artisan nextcloud:trash:purge` | Dispatch the trash-purge job immediately |

## Uninstalling

```bash
# 1. Stop the queue worker and remove the cron entry.

# 2. Roll back package migrations
php artisan migrate:rollback --path=packages/Webkul/DamWebdav/src/Database/Migration

# 3. Remove from bootstrap/providers.php and composer.json autoload

# 4. Drop dependencies and rebuild autoload
composer remove sabre/dav bacon/bacon-qr-code
composer dump-autoload

# 5. Delete published assets
rm -rf public/vendor/dam-webdav

# 6. Delete the package folder
rm -rf packages/Webkul/DamWebdav

php artisan optimize:clear
```
