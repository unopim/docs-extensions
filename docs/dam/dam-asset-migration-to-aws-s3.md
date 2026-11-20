# DAM Asset Migration to AWS S3

If your **UnoPim DAM** assets are currently stored on the local private disk, you can migrate them to **Amazon S3** by using the dedicated Artisan command.

This helps when you want to:

- move existing DAM assets to cloud storage,
- keep new and old DAM files in the same S3 bucket,
- reduce storage pressure on your local server.

## Command Signature

Run:

```bash
php artisan unopim:dam:move-asset-to-s3
```

This command uploads DAM asset files from local private storage to the S3 bucket configured in your UnoPim AWS Integration settings.

## Prerequisites

Before running the command, make sure:

1. **UnoPim DAM** is installed and your assets are available locally.
2. **UnoPim AWS Integration** is installed and configured correctly.
3. Your S3 bucket, region, access key, and secret key are valid.
4. You have a working **admin account** for authentication.

If needed, complete the AWS setup first from the AWS Integration section.

> [!IMPORTANT]
> DAM stores and reads asset files on S3 whenever the AWS Integration is enabled (it makes `s3` the default filesystem disk). From that moment, DAM looks for **every** asset on S3 — assets that are still only on the local disk show as missing until this command has copied them. Run the migration right after enabling the integration.
>
> Queue workers apply the AWS settings only when they start. After enabling, disabling, or changing the AWS Integration, run `php artisan queue:restart` so uploads, thumbnails, and other DAM jobs use the same storage as the admin panel.

## Admin Authentication

The command does not run anonymously.

When you start it, UnoPim will prompt you for:

- **email**
- **password**

Only valid **admin user credentials** can continue the DAM asset migration.

## Interactive Options

During execution, the command asks two important questions.

## Terminal Prompt Flow

This is the prompt sequence users will see when the command runs:

```bash
Enter your Email:
> admin@example.com

Enter your Password:
>

Want to migrate only new uploaded files from your local to s3 (yes/no):
>

Migrate New only flag: No

Want to delete files from local once uploaded to s3? (yes/no):
>

Delete flag: No
Starting migration to aws
10/10 [============================] 100%
Done Moving DAM Assets.
```

In this example:

- `Migrate New only flag: No` means the command is not limited to only newly uploaded files.
- `Delete flag: No` means the local DAM files will be kept after the upload finishes.

### 1. Migrate Only New Files?

If you choose **Yes**, the command migrates only DAM assets that are not already available on S3.

Use this option when:

- you already ran the command before,
- you only want to move recently uploaded DAM assets,
- you want a safer incremental migration.

If you choose **No**, the command uploads every DAM asset found on the local disk, overwriting any copy already on S3.

With **Yes**, assets that already exist on S3 are skipped entirely — their local files are not deleted, even if you also answer **Yes** to the delete question.

### 2. Delete Files from Local Disk After Upload?

If you choose **Yes**, local DAM files are deleted after they are uploaded successfully to Amazon S3.

Use this option only when:

- you have verified that the files are present on S3,
- asset preview and access are working correctly in UnoPim,
- you no longer need the local disk copy.

> [!CAUTION]
> On your first migration run, it is safer to keep local files until you finish verifying the DAM asset library on S3.

## Recommended First Run

For the first migration, this is the safest approach:

1. Run `php artisan unopim:dam:move-asset-to-s3`.
2. Sign in with a valid admin email and password.
3. Choose to migrate only new files if you want an incremental run.
4. Choose **not** to delete local files yet.
5. Open a few migrated assets in DAM and confirm they work correctly.
6. If everything looks correct, run the command again later and allow local cleanup if required.

Assets whose local file cannot be found are skipped. The per-asset results are not printed in the terminal; they are written to `storage/logs/laravel.log` in a single `User data:` log entry when the run finishes.

## What to Verify After Migration

After the command completes, confirm that:

- the asset files exist in your S3 bucket,
- DAM assets still open correctly in UnoPim,
- linked product and category assets continue to work as expected,
- local files are removed only if you intentionally approved that option.

## Related Guide

If you want the AWS setup view of this same process, see [DAM Asset Migration to AWS S3](../aws-integration/dam-asset-migration-to-aws-s3.md).
