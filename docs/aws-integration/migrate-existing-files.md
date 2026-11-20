# Migrate Existing Files to S3

After configuring the **UnoPim AWS Integration**, you can move your existing media files from local storage to **Amazon S3**.

This is useful when:

- the module was installed after media already existed in UnoPim,
- you want old files and new files to be stored in the same S3 bucket,
- you want to reduce dependency on local server storage.

## Before You Start

Make sure the following steps are already completed:

1. Create an **S3 bucket** in your AWS account.
2. Generate the **Access Key ID** and **Secret Key** from IAM.
3. Configure your AWS credentials in UnoPim.

If you have not completed these steps yet, follow:

- [Setup Credentials in Amazon S3](./setup-amazon.md)
- [AWS S3 Setup in UnoPim](./aws-s3-setup-in-unopim.md)

## Migrate Existing Media to AWS S3

To move existing UnoPim media files to Amazon S3, run:

```bash
php artisan aws_integration:move_existing_files
```

This command uploads the existing media under `storage/app/public` to your configured S3 bucket, using the saved **File Visibility**. It covers these folders: `product`, `category`, `admins`, `attribute_option`, `configuration`, `tinymce`, `ai-agent/images` and `ai-agent/files` (the `media_directories` list in the package's `Config/aws_integration.php`). It asks for confirmation first; add `--force` to skip the prompt.

> [!NOTE]
> Run this command only after your AWS configuration has been saved correctly in UnoPim.

## Remove Local Media After Migration

After confirming that the files are successfully available in Amazon S3, you can remove the local copies by running:

```bash
php artisan aws_integration:remove_media_files
```

Only files in the same folders that already exist in S3 are deleted; files not found in S3 are listed and kept. It asks for confirmation first; add `--force` to skip the prompt.

This helps free up storage space on your server after migration.

> [!CAUTION]
> Before removing local files, make sure your migration is complete and the files are accessible from S3.

## Update S3 File Visibility (ACL)

You can also update the visibility of files already stored in your S3 bucket.

This command lets you make files:

- `public` so they can be accessed publicly,
- `private` so access remains restricted.

Run:

```bash
php artisan aws_integration:update_visibility
```

## Available Options

You can use the following options with the visibility command:

| Option | Description |
|---|---|
| `--visibility=public or private` | Overrides the default visibility stored in the database. |
| `--path=folder/path` | Applies the visibility update only to a specific folder or prefix. |
| `--dry-run` | Shows what would change without actually updating any files. |
| `--force` | Skips the confirmation prompt. |

## Command Examples

Make all matching files public:

```bash
php artisan aws_integration:update_visibility --visibility=public
```

Make files inside a specific folder private:

```bash
php artisan aws_integration:update_visibility --path=products --visibility=private
```

Preview the changes without applying them:

```bash
php artisan aws_integration:update_visibility --dry-run
```

## Recommended Usage

Before running the visibility update in production:

- use `--dry-run` first,
- check that the selected path is correct,
- confirm whether files should be `public` or `private`.

> [!CAUTION]
> The visibility update command can affect all matching files in your S3 bucket. Always review the result with `--dry-run` before applying changes in production.
