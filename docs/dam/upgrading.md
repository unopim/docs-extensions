# Upgrading DAM

DAM includes an upgrade script that fetches the latest release, swaps the package code, and runs the post-upgrade migration with a safety backup.

---

## Before You Start

- Take your own database backup. The upgrade takes one too, but a second copy costs nothing.
- Put the site in maintenance mode if you cannot tolerate a brief interruption.
- Make sure `php`, `curl`, and `unzip` are available on the server — the script requires all three.

---

## The Upgrade Script

Run this from your **UnoPim project root**:

```bash
bash packages/Webkul/DAM/upgrade-dam.sh
```

The script:

1. Checks that `php`, `curl`, and `unzip` are present.
2. Reads your currently installed version (`php artisan dam:version`).
3. Looks up the latest release on GitHub. **If you are already up to date, it stops here.**
4. Downloads and validates the release archive.
5. Replaces the code in `packages/Webkul/DAM` — **code only**. Your database and your asset files are not touched at this stage.
6. Runs `php artisan dam:update`, which backs up, migrates, publishes, and verifies.

---

## Upgrading via Composer

If you installed DAM with Composer, update the package and then run the post-upgrade routine yourself:

```bash
composer update unopim/dam
php artisan dam:update
php artisan optimize:clear
```

`dam:update` is the important part — it takes the backup, applies the new migrations, republishes assets, and verifies no data was lost. See [Artisan Commands](./commands.md#damupdate).

---

## If Something Goes Wrong

`dam:update` compares row counts before and after migrating. If it detects data loss, it aborts and prints the restore command.

To see the available backups:

```bash
php artisan dam:update:restore
```

To roll back to one:

```bash
php artisan dam:update:restore 2026-07-13-104500
```

Backups live in `storage/dam-backups/<timestamp>` and contain both the DAM database tables and the asset files.

---

## After Upgrading

- Restart your queue workers so they pick up the new code:

  ```bash
  php artisan queue:restart
  # or, under Supervisor
  sudo supervisorctl restart unopim-worker
  ```

- Clear caches:

  ```bash
  php artisan optimize:clear
  ```

- If you are coming from a version before thumbnails existed, generate them for your existing PDFs and videos:

  ```bash
  php artisan dam:backfill-thumbnails
  ```

---

## Related

- [Artisan Commands](./commands.md)
- [Installation](./installation.md)
