# Remove Local Media After Migration

After your media files have been successfully moved to **Azure Blob Storage**, you may want to remove the duplicate files from your local server to free up disk space.

UnoPim provides a command for that:

```bash
php artisan azure_integration:remove_media_files
```

## What This Command Does

This command asks for confirmation, then deletes each local file in the same folders the migration command copies (`product`, `category`, `attribute_option`, `admins`, `tinymce`, `configuration`, `locales`) if a file with the same path exists in the Azure container. Files not found in Azure are kept. It does nothing if the Azure credential is disabled. DAM assets are not touched; use `azure_integration:move_dam_assets --delete-local` for those.

Use it when:

- your migration to Azure has finished successfully,
- you have confirmed that product media is loading correctly from Azure,
- you no longer need to keep duplicate files on the local server.

## Before You Run It

Make sure you verify the migration first:

- check that the expected files are present in your Azure Blob container,
- open a few product pages in UnoPim and confirm the images or PDFs are working,
- make sure your Azure integration is still enabled and serving files correctly.

> [!CAUTION]
> Do not remove local files immediately after migration without checking Azure first. Once local duplicates are deleted, the local backup copy is no longer available.

## When to Use This Command

This command is useful if you want to:

- free up storage space on your server,
- avoid keeping the same media in two places,
- fully switch your product media storage from local disk to Azure Blob Storage.

## Recommended Usage

Follow this order:

1. Run the migration command to move your media to Azure.
2. Verify that the files are available and working from Azure.
3. Run the local cleanup command only after verification is complete.

## Result

After running the command:

- the duplicate local media files are removed,
- your product assets continue to be served from **Azure Blob Storage**,
- your local server keeps less unused media data.

If you want to confirm everything before cleanup, continue to [Verify Migration](./verify-migration.md).
