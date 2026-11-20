# REST API Setup

The Bagisto REST API enables you to programmatically manage your Bagisto store and integrate it seamlessly with external applications. This guide walks you through installation, configuration, and enabling asynchronous bulk operations.

## Requirements

Before installing the Bagisto REST API, ensure your environment meets the following requirements:

- **Bagisto version:** 2.2.x or higher
- **Composer:** For package management
- **Database:** MySQL or PostgreSQL
- **Queue system:** For bulk product operations (database or Redis)

---

## Installation

### Step 1 - Install the REST API Package

Install the Bagisto REST API package using Composer:

```bash
composer require unopim/bagisto-rest-api
```

This command downloads and installs the REST API package along with all required dependencies.

### Step 2 - Configure Environment Variables

Open your project's ``.env`` file and add the Sanctum configuration. Replace the domain with your actual Bagisto store domain:

```bash
SANCTUM_STATEFUL_DOMAINS=http://localhost/public
```

**Example configurations:**

- **Local development:** `SANCTUM_STATEFUL_DOMAINS=http://localhost/public`
- **Production:** `SANCTUM_STATEFUL_DOMAINS=https://yourdomain.com`
- **Multiple domains:** `SANCTUM_STATEFUL_DOMAINS=http://localhost/public,https://yourdomain.com`

### Step 3 - Install and Configure L5-Swagger

Run the installation command to set up L5-Swagger documentation for the REST API:

```bash
php artisan bagisto-rest-api:install
```

This command:
- Publishes configuration files
- Sets up API documentation
- Configures necessary routes

### Step 4 - Verify the Installation

Once installation is complete, you can access the API documentation in your browser:

**Admin API Documentation:**
```
http://localhost/public/api/admin/documentation
```

**Shop API Documentation:**
```
http://localhost/public/api/shop/documentation
```

Replace `http://localhost/public` with your actual domain in a production environment.

---

## Enable Bulk Product API with Queues

The Bulk Product API can process large batches of products efficiently using Laravel's queue system. This ensures your application remains responsive while bulk operations run in the background.

### Step 1 - Configure Queue Driver

Open your ``.env`` file and set the queue driver to database:

```bash
QUEUE_DRIVER=database
QUEUE_CONNECTION=database
```

Alternatively, if you prefer using Redis (for better performance in production):

```bash
QUEUE_DRIVER=redis
QUEUE_CONNECTION=redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

### Step 2 - Create Queue Tables (Database Driver Only)

If using the database queue driver, you need to set up the required database tables:

```bash
php artisan queue:table
php artisan migrate
```

These commands create the `jobs` and `failed_jobs` tables used by the queue system.

### Step 3 - Start the Queue Worker

Once configured, start the queue worker to process bulk operations:

```bash
php artisan queue:work
```

For production environments, run the worker with specific queues and options:

```bash
php artisan queue:work --queue=default --tries=3 --timeout=3600
```

Keep this process running continuously. It's recommended to use a process manager like Supervisor or systemd for production deployments.

### Step 4 - Configure for Production (Optional)

If using Supervisor to manage the queue worker, update your Supervisor configuration and restart it after changes:

```bash
sudo service supervisor restart
```

---

## Testing the API

Once installed and configured, you can test the API endpoints:

### Admin API Example

The connector logs in with the same request. If this returns a `token`, the Shop URL and admin credentials will work in UnoPim:

```bash
curl -X POST http://localhost/public/api/v1/admin/login \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password","device_name":"api"}'
```

### Shop API Example

To access shop endpoints:

```bash
curl http://localhost/public/api/shop/products
```

For detailed API endpoints and request/response formats, refer to the API documentation at the URLs mentioned in Step 4 of the installation section.

---

## Troubleshooting

### Queue Not Processing Jobs

- Ensure the queue worker is running: `php artisan queue:work`
- Check your ``.env`` file for correct `QUEUE_DRIVER` and `QUEUE_CONNECTION` values
- For database driver, verify that migrations have been run: `php artisan migrate`
- Check the `failed_jobs` table for failed jobs: `php artisan queue:failed`

### API Documentation Not Loading

- Verify the L5-Swagger installation ran successfully: `php artisan bagisto-rest-api:install`
- Clear the Laravel cache: `php artisan cache:clear`
- Check that your `SANCTUM_STATEFUL_DOMAINS` is correctly configured in `.env`

### Authentication Issues

- Ensure your Sanctum configuration matches your actual domain
- Clear cookies if switching between domains
- Verify that the API user account has the appropriate permissions


