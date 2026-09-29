# Installation

Follow these steps to install the UnoPim Commercetools Connector.

---

## Step 1 - Add the package files

Download the extension ZIP file and unzip it. Rename the extracted folder to `Commercetools` and move it into the following directory inside your UnoPim project:

```
packages/Webkul/Commercetools
```

## Step 2 - Register the service provider

Open the `bootstrap/providers.php` file and add the following line to the list of providers:

```php
Webkul\Commercetools\Providers\CommercetoolsServiceProvider::class,
```

> [!NOTE]
> This registers `CommercetoolsServiceProvider` in Laravel so the connector can load its menu, routes, jobs and database tables when UnoPim starts.

## Step 3 - Update Composer autoload

Open `composer.json` and add the following line under the `autoload > psr-4` section:

```json
"Webkul\\Commercetools\\": "packages/Webkul/Commercetools/src"
```

## Step 4 - Run the setup commands

Now run the following commands in order:

```bash
composer dump-autoload
php artisan migrate
php artisan optimize:clear
```

| Command | Purpose |
|---|---|
| `composer dump-autoload` | Regenerates Composer's autoloader so UnoPim can find the connector's classes. |
| `php artisan migrate` | Creates the connector's database tables. |
| `php artisan optimize:clear` | Clears all cached files (bootstrap, configuration, routes and views) to load the new changes. |

## Step 5 - Start the queue worker

Export and import jobs run in the background, so a queue worker must be running:

```bash
php artisan queue:work
```

> **Tip:** On a live server, run the queue worker under a process manager such as Supervisor, so it restarts automatically after a crash or deploy.

---

## Verify the Installation

Log in to your UnoPim dashboard. You should see a **Commercetools** entry with a **Connections** link in the left sidebar - that confirms the connector has been installed successfully.

![Commercetools menu in UnoPim sidebar](./images/side-menu.png)

If the menu doesn't appear, run `php artisan optimize:clear` again and refresh the page.

Continue to [Setup UnoPim Connection](./setup) to connect your commercetools project.
