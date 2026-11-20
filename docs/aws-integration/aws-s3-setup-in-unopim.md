# AWS S3 Setup in UnoPim

After installing the **UnoPim AWS Integration** module, users with the required permissions can manage the AWS storage settings from the admin panel.

Go to:

**Left Menu → AWS S3 → Credentials**

![Configuration Access](./assets/unopim-setup/aws-s3.png)

From here, you can enable the module and connect UnoPim to **Amazon S3** so files are stored in your AWS bucket instead of only on the local server.

## What This Configuration Does

Once the setup is saved correctly:

- UnoPim can store supported files on **Amazon S3**.
- Your media can be served from the configured **bucket URL**.
- Uploaded files are sent with a `Cache-Control` header (7 days by default).

## Fields You Need to Fill

To connect UnoPim with AWS, enter the configuration details created in your Amazon AWS account.

| Field | Description |
|---|---|
| **Enable AWS S3** | When on, S3 becomes UnoPim's default filesystem disk, so new uploads go to the bucket. Turn it off to go back to local storage. |
| **Access Key** | The access key ID of your IAM user. Stored encrypted and shown masked after saving. |
| **Secret Key** | The secret key paired with the access key. Stored encrypted and shown masked. Keep this private. |
| **Bucket Name** | The exact name of the S3 bucket where UnoPim should store files. |
| **Region** | The AWS region where your bucket was created, such as `us-east-1` or `ap-south-1`. It must match the bucket's region; a mismatch is rejected on save. |
| **File Visibility** | **Public**: files are written with a public ACL and served from **Bucket URL**. **Private**: files are served through short-lived presigned URLs, and **Bucket URL** is not used for links. |
| **Bucket URL** | Public base URL for files with **Public** visibility, e.g. `https://your-bucket.s3.amazonaws.com`. Left blank, it is set to `https://<bucket>.s3.<region>.amazonaws.com` on save. |

> [!WARNING]
> If **Bucket URL** is not an `amazonaws.com` host, it is treated as a custom S3 endpoint when the credentials are checked. The host must be listed in the `AWS_ALLOWED_ENDPOINT_HOSTS` environment variable (comma-separated) and resolve to a public IP address, otherwise saving fails with "Bucket URL host ... is not allowed". Run `php artisan config:clear` after changing `.env`.

## How to Configure It

1. Open the **AWS S3 → Credentials** section in UnoPim.

![Configuration Access](./assets/unopim-setup/aws-s3-section.png)

2. Enable the module if it is currently disabled.

3. Enter the **Access Key** and **Secret Key** from your AWS account.
4. Add the correct **Bucket Name** and **Region**.
5. Enter the **Bucket URL** that should be used to access uploaded files.

![Configuration Fields](./assets/unopim-setup/aws-cred.png)

6. Save the configuration.

![Save Configuration](./assets/unopim-setup/save-cred.png)

When you save, the credentials are checked against the bucket. Nothing is uploaded and no bucket is created. A wrong key, bucket name or region is rejected with a message.

After saving, UnoPim will use these details to connect with Amazon S3 for file storage.

> [!IMPORTANT]
> The S3 disk is configured when the application boots. After saving new credentials, or turning the module on or off, run `php artisan queue:restart` so queue workers (imports, exports) pick up the change.

## Understanding Environment Update Time

The **Environment Update Time** field is a date and time (`YYYY-MM-DD HH:MM:SS`). Its value is written into the `Cache-Control: max-age=` header of files uploaded to S3.

If this field is left empty, uploads are sent with `max-age=604800` (7 days).

> [!WARNING]
> Leave this field empty. `max-age` expects a number of seconds, but the field stores a date and time, so a filled value produces an invalid `Cache-Control` header that browsers and CDNs ignore. Once a value is saved, emptying the field and saving does not clear it.

## Why This Setting Matters

This setting helps:

- reduce repeated file URL requests,
- avoid unnecessary fetches from AWS,
- improve loading efficiency for frequently viewed images.

## Recommended Before Saving

Before saving the configuration, make sure:

- your AWS credentials are valid,
- the S3 bucket name is correct,
- the selected region matches the bucket region,
- the bucket URL is accessible (only needed for public visibility),
- the IAM user has `s3:ListBucket`, `s3:GetObject`, `s3:PutObject` and `s3:DeleteObject` on the bucket (plus `s3:PutObjectAcl` for public visibility).

If you have not prepared your AWS account yet, follow [Setup Credentials in Amazon S3](./setup-amazon.md) first.

Once your credentials are saved, continue to [Migrate Existing Files to S3](./migrate-existing-files.md) if you want to move older local media into Amazon S3.

If you also use **UnoPim DAM** and want to move DAM asset files from private local storage to S3, follow [DAM Asset Migration to AWS S3](./dam-asset-migration-to-aws-s3.md).
