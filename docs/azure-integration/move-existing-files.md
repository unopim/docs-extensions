# Migrating Existing Media Files to Azure

If you already have product media stored locally in UnoPim, you don't need to re-upload everything manually. The integration includes a built-in command that automatically moves all your existing local media files to Azure Blob Storage in one go.

---

## Before You Begin

Make sure the following is in place before running the migration command:

- Your **Azure credentials are saved and enabled** in UnoPim (see [Setting Up Azure Credentials in UnoPim](./setup.md)).

> [!IMPORTANT]
> If your Azure credential is disabled, the migration command will fail. Double-check that the toggle is turned **on** before proceeding.

---

## Run the Migration Command

Open your terminal, navigate to your UnoPim project root, and run:

```bash
php artisan azure_integration:move_existing_files
```

This command will scan all existing media files in your UnoPim local storage and transfer them to the Azure Blob container you configured in your credentials.

---

## What Happens After the Migration

Once the command completes:

- All transferred media files will be stored in your **Azure Blob container**.
- Product pages in UnoPim will serve media via **Azure Blob URLs** instead of local paths.
- Any **new media** uploaded going forward will also go directly to Azure - no additional commands needed.

---

> [!TIP]
> Run this command during off-peak hours if you have a large media library, as migrating a high volume of files may take some time to complete.

---

## Migrating DAM Assets *(DAM module only)*

If the **DAM** module is installed, assets added before Azure was enabled still
sit on local storage. A separate command migrates them to Azure Blob Storage:

```bash
# Preview what would be copied, without writing anything
php artisan azure_integration:move_dam_assets --dry-run

# Copy the assets to Azure
php artisan azure_integration:move_dam_assets

# Copy, then remove each local copy once its upload is verified
php artisan azure_integration:move_dam_assets --delete-local
```

The command is safe to re-run - assets already present on Azure are skipped.

> [!NOTE]
> DAM asset migration requires the DAM remote-disk patch shipped with the
> connector. Apply it before running this command.
