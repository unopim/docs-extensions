# Upgrading & Uninstalling

Use this page when a new version of the extension is released, or when you want to remove it.

---

## Upgrading

1. Replace `packages/Webkul/OpenAIFeed/` with the new version.
2. Run:

   ```bash
   composer dump-autoload
   php artisan migrate
   php artisan optimize:clear
   ```

3. Restart your queue workers so they load the new code: `php artisan queue:restart`.

> [!IMPORTANT]
> **Upgrading from an earlier version.** Earlier versions saved the feed file in public storage, where anyone could download it from `/storage/openai-feed/…` without the token. The upgrade migration moves the file into private storage automatically. After upgrading, the **only** way to fetch the feed is through the feed URL. Also note that `/openai-feed/status` now requires the token when one is set.

---

## Uninstalling

1. Remove `OpenAIFeedServiceProvider::class` from `bootstrap/providers.php`.
2. Remove the `Webkul\\OpenAIFeed\\` line from `composer.json` and run `composer dump-autoload`.
3. Optionally drop the `openai_feeds` and `openai_feed_logs` tables, and delete `storage/app/openai-feed/`.
4. Delete `packages/Webkul/OpenAIFeed/` and run `php artisan optimize:clear`.
