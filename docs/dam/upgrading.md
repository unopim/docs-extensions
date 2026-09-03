# Upgrading DAM

DAM includes an upgrade script that fetches the latest release, swaps the package code, and runs the post-upgrade migration with a safety backup.

---

## Upgrading to DAM 3.0

DAM **3.0** is the release that moves the module onto **UnoPim v3.0**, and it is the one upgrade where order matters.

> [!IMPORTANT]
> **Upgrade UnoPim first, DAM second.** DAM 3.x will not boot on UnoPim 2.x, and DAM 2.x will not boot on UnoPim 3.0. Plan for both to move in the same maintenance window rather than upgrading one and leaving the other.

| | Before | After |
|---|---|---|
| **UnoPim** | v2.1.x | v3.0.x |
| **PHP** | 8.3 | 8.4.1+ |
| **DAM** | 2.x | 3.0.1 |

The sequence:

1. Upgrade **PHP to 8.4** — UnoPim 3.0 requires it, so this comes before anything else.
2. Upgrade **UnoPim to 3.0** following the core upgrade guide.
3. Upgrade **DAM** with the script or Composer steps below.
4. Restart queue workers and clear caches — both are covered in [After Upgrading](#after-upgrading).

Check where you landed:

```bash
php artisan dam:version   # expect 3.0.1
```

### What changes for you in 3.0

Nothing in your library moves — directories, assets, permissions, shares, and tags all carry over. What changes is the surface around them:

- **The admin is now a single-page application.** UnoPim 3.0 loads pages over AJAX and swaps them in place instead of reloading the browser, and DAM runs inside that shell. Navigating between folders, assets, and settings is noticeably faster, with no white flash and no re-downloading of scripts or styles on every click. The URL still updates, so back, forward, refresh, and bookmarks work as before. See [A Single-Page Experience](./index.md#a-single-page-experience).
- **Breadcrumbs on every DAM page**, so you can jump back up the tree from anywhere.
- **An unsaved-changes prompt** on the Configuration page, with **Save changes** and **Discard**. Because navigation no longer reloads the page, this prompt also intercepts in-app links — not just closing the tab. See [Configuration](./configuration.md#unsaved-changes).
- **Product and category imports accept a ZIP bundle** carrying both the data file and the asset binaries. See [Importing an asset bundle](./import-assets.md#importing-an-asset-bundle-zip).
- **Asset paths that do not resolve are now reported** in the import error report instead of being dropped silently.

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
