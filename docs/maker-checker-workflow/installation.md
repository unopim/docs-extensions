# Installation

### 1. Merge the package files

Unzip the extension package and merge the `packages/` folder into your Unopim project root.

### 2. Register the service provider

Add to `bootstrap/providers.php`:

```php
use Webkul\MakerChecker\Providers\MakerCheckerServiceProvider;

return [
    // ...existing providers...
    MakerCheckerServiceProvider::class,
];
```

> [!NOTE]
> This registers `MakerCheckerServiceProvider` in Laravel so the module can bootstrap its services, workflow bindings, and package configuration during application startup.

### 3. Update Composer autoload

In `composer.json`, add under `autoload.psr-4`:

```json
"Webkul\\MakerChecker\\": "packages/Webkul/MakerChecker/src"
```

### 4. Run installation commands

Run these in order:

```bash
composer dump-autoload
php artisan optimize:clear
php artisan migrate
php artisan vendor:publish --provider="Webkul\MakerChecker\Providers\MakerCheckerServiceProvider"
php artisan db:seed --class="Webkul\MakerChecker\Database\Seeders\MakerCheckerStagesSeeder"
```

Command purpose:

- `composer dump-autoload`: Regenerates Composer's autoloader mapping to include the newly added namespace.
- `php artisan optimize:clear`: Clears all cached files (bootstrap, configuration, routes, and views) to load the new changes.
- `php artisan migrate`: Runs pending database migrations required by the package.
- `php artisan vendor:publish --provider="Webkul\MakerChecker\Providers\MakerCheckerServiceProvider"`: Copies the pre-built Maker Checker CSS, JS and icon font to `public/themes/maker_checker/build`. The package has no publishable config file.
- `php artisan db:seed --class="Webkul\MakerChecker\Database\Seeders\MakerCheckerStagesSeeder"`: Seeds the five workflow stages (Draft, Waiting for Approval, Approved, Rejected, Published) into the `makerchecker_stages` table.

> [!WARNING]
> Do not skip the seeder. Without the stages, no request appears in **Maker Checker > Approval Requests**, because the list filters requests by stage name.

### 5. Build front-end assets (only if you change the package)

The package ships pre-built assets, and `vendor:publish` in step 4 already copies them to `public/themes/maker_checker/build`. The root UnoPim `npm run build` does not build Maker Checker assets.

Rebuild only if you modify the package's Vue or CSS sources. Run the build inside the package folder:

```bash
cd packages/Webkul/MakerChecker
npm install
npm run build
```

| Command | Purpose |
|---|---|
| `npm install` | Installs the package's frontend build dependencies. |
| `npm run build` | Builds the Maker Checker assets into `public/themes/maker_checker/build`. |

### 6. Start the queue worker

Email notifications are dispatched as queued jobs. Keep a worker running:

```bash
php artisan queue:work
```

| Command | Purpose |
|---|---|
| `php artisan queue:work` | Starts a queue worker to process Maker Checker background jobs (including notifications). |

> [!NOTE]
> Without a running worker, notification emails stay in the queue and are never sent (unless `QUEUE_CONNECTION=sync`). In-app notifications are not queued.

### 7. Configure email notifications

Add your mail settings to `.env`:

```bash
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
```

> [!NOTE]
> Queue workers keep the mail settings they started with. After you change mail settings in `.env`, run `php artisan config:clear` (or `php artisan config:cache` if you cache config) and `php artisan queue:restart`.

Emails are sent only when **Send Notifications** is enabled in the Maker Checker configuration. See [Checker End](./checker-end).

### 8. Verify

Open the Unopim admin panel — a **Maker Checker** section should appear in the sidebar with **Approval Requests** and **Configuration** links.
