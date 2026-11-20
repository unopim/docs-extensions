# Migrating Existing Media Files to Azure

If you already have product media stored locally in UnoPim, you don't need to re-upload everything manually. The integration includes a built-in command that automatically moves all your existing local media files to Azure Blob Storage in one go.

---

## Before You Begin

Make sure the following is in place before running the migration command:

- Your **Azure credentials are saved and enabled** in UnoPim (see [Setting Up Azure Credentials in UnoPim](./setup.md)).

> **Important:** If your Azure credential is disabled, the migration command will fail. Double-check that the toggle is turned **on** before proceeding.

---

## Run the Migration Command

Open your terminal, navigate to your UnoPim project root, and run:

```bash
php artisan azure_integration:move_existing_files
```

The command asks for confirmation, then copies every file under these folders of the public disk (`storage/app/public`) to the Azure container, keeping the same path: `product`, `category`, `attribute_option`, `admins`, `tinymce`, `configuration`, `locales`. Local files are not deleted.

DAM assets are not covered by this command; see [DAM Assets](#dam-assets) below.

---

## What Happens After the Migration

Once the command completes:

- All transferred media files will be stored in your **Azure Blob container**.
- Product pages in UnoPim will serve media via **Azure Blob URLs** instead of local paths.
- Any **new media** uploaded going forward will also go directly to Azure - no additional commands needed.

---

> **Tip:** Run this command during off-peak hours if you have a large media library, as migrating a high volume of files may take some time to complete.

---

## DAM Assets

With the UnoPim DAM extension installed, DAM assets are only stored on Azure after you apply the DAM patch shipped with this extension (`patch/dam-remote-disk-support.patch`, cut against `unopim/dam` 3.0.1). Without it, DAM keeps writing assets to the local private disk. Follow the instructions in `patch/README.md`. If DAM is installed through Composer (`vendor/unopim/dam`), re-apply the patch after every `composer update`.

Then copy existing DAM assets, with their covers and thumbnails, from the local private disk to Azure:

```bash
# Preview what would be copied
php artisan azure_integration:move_dam_assets --dry-run

# Copy
php artisan azure_integration:move_dam_assets

# Copy and delete each local file once its upload is verified
php artisan azure_integration:move_dam_assets --delete-local
```

| Option | Description |
|---|---|
| `--dry-run` | Reports what would be copied without writing anything. |
| `--delete-local` | Deletes each file from the local private disk once its upload is verified. Without it, nothing is deleted locally. |

The command is safe to re-run. Assets missing from the asset disk show a placeholder icon in DAM without any error, so check that the copy finished without failures.
