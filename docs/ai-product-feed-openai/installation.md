# Installation

This page walks you through installing the AI Product Feed extension. You need terminal (SSH) access to the server where UnoPim runs. Run every command from your UnoPim **project root**, the folder that contains `artisan`, unless a step says otherwise.

---

## Step 1: Copy the package into UnoPim

Unzip the extension archive. It contains a `packages` folder. Merge it into your UnoPim project root so the extension ends up here:

```
<unopim-root>/packages/Webkul/OpenAIFeed/
```

> [!TIP]
> "Merge" means copy the folder's contents into the existing `packages` folder. Don't replace the whole `packages` folder, or you will delete UnoPim's own packages.

---

## Step 2: Add the SFTP library (optional)

Skip this step if you will only share the feed URL with OpenAI. If you want UnoPim to **upload** the feed to OpenAI over SFTP, install the SFTP storage adapter:

```bash
composer require league/flysystem-sftp-v3:^3.0
```

You can come back and run this later. The SFTP settings only take effect once the library is installed.

---

## Step 3: Run the installer

One command does the rest of the setup:

```bash
php artisan openai-feed:install
```

The installer shows a numbered checklist as it works:

| # | What it does |
|---|---|
| ① | Adds the `Webkul\OpenAIFeed\` namespace to `composer.json` (autoload). |
| ② | Registers `OpenAIFeedServiceProvider` in `bootstrap/providers.php`. |
| ③ | Runs `composer dump-autoload`. |
| ④ ⑤ | Installs and builds the extension's front-end assets (`npm install`, `npm run build`). |
| ⑥ | Runs the database migrations (`openai_feeds`, `openai_feed_logs`). |
| ⑦ | Creates the `public/storage` link if it is missing (product images need it). |
| ⑧ | Creates the feed record and a random 48-character security token. |
| ⑨ | Checks that the built assets exist in `public/themes/ai-feed-connector/build`. |
| ⑩ | Registers the extension's automated tests with PHPUnit/Pest. |

Every step is safe to repeat. If something is already done, the installer says so and moves on. If a step fails, the installer still finishes, then lists the warnings at the end so you can fix them.

| Option | Use it when |
|---|---|
| `--skip-migrate` | You manage migrations yourself (for example in a deploy pipeline). Run `php artisan migrate` separately. |
| `--force` | You want to overwrite existing registrations without being asked. |

Finally, clear UnoPim's caches:

```bash
php artisan optimize:clear
```

<details>
<summary><strong>Prefer to do it by hand?</strong> Manual alternative to the installer</summary>

1. Add the provider to `bootstrap/providers.php`:

   ```php
   use Webkul\OpenAIFeed\Providers\OpenAIFeedServiceProvider;

   return [
       // ...existing providers...
       OpenAIFeedServiceProvider::class,
   ];
   ```

2. Add the namespace to `composer.json` under `autoload` › `psr-4`:

   ```json
   "Webkul\\OpenAIFeed\\": "packages/Webkul/OpenAIFeed/src"
   ```

3. Run:

   ```bash
   composer dump-autoload
   php artisan migrate
   php artisan storage:link
   cd packages/Webkul/OpenAIFeed && npm install && npm run build && cd -
   php artisan optimize:clear
   ```

4. Open **OpenAI Feed › Configuration**, click **Generate Token**, fill in the form and save.

</details>

---

## Step 4: Start a queue worker

When you click **Generate Now**, the feed is built by a background job. A queue worker must be running to pick that job up:

```bash
php artisan queue:work --queue=system,completeness,default
```

On a production server, keep the worker running with **Supervisor** (Linux) or your hosting panel's process manager so it restarts automatically.

> [!NOTE]
> If `QUEUE_CONNECTION=sync` in your `.env`, there is no background job. The feed is built inside the browser request instead. That is fine for small catalogs, but a large catalog can hit the web server's timeout. Use `database` or `redis` for anything beyond a few thousand products.

---

## Step 5: Enable the scheduler

To rebuild the feed automatically, Laravel's scheduler must run every minute. Add this line to the server's crontab (`crontab -e`), replacing the path:

```bash
* * * * * cd /path/to/unopim && php artisan schedule:run >> /dev/null 2>&1
```

You don't need to edit any PHP file. The extension registers its own scheduled task. You set how often the feed is rebuilt in [Configuration › Performance & Schedule](./schedule-performance.md).

---

## Verify the installation

1. Log in to the UnoPim admin panel.
2. Look for **OpenAI Feed** in the left sidebar. Hover over it to see **General** and **Configuration**.

   ![OpenAI Feed menu in the UnoPim sidebar with General and Configuration](./images/sidebar.png)

3. Click **General**. The **OpenAI Product Feed** dashboard opens.

   ![OpenAI Product Feed dashboard after installation](./images/dashboard.png)

If the menu doesn't appear, run `php artisan optimize:clear` again and hard-refresh the browser (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>). If your admin user is not an administrator, ask one to grant the **OpenAI Feed** permissions to your role (see below).

---

## What's next?

Follow the [Quick Start](./quick-start.md) to configure and publish your first feed, and give your team access in [Roles & Permissions](./permissions.md).
