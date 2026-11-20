# UnoPim AWS S3 Integration

Store Link: [View on Webkul Store](https://store.webkul.com/unopim-aws-integration.html)

The **UnoPim AWS Integration** connects your UnoPim instance with **Amazon S3** - one of the world's most reliable cloud storage services - to store, manage, and serve your product images and PDFs securely in the cloud.

Instead of storing media files on your local server, everything gets uploaded to Amazon S3 automatically. This means your assets are always available, load quickly for users, and can scale without any storage limitations as your catalog grows.

<br>

<div align="center">
  <img src="./assets/overview/intro-banner.png" alt="UnoPim AWS S3 Integration" width="100%" style="max-height:330px; object-fit:cover; border-radius:8px;" />
</div>

<br> 

## How It Works

Once connected, the integration handles your media in two ways:

- **New files** - any image or PDF you add to UnoPim is automatically synced to Amazon S3 without any manual action.

Files uploaded to S3 are sent with a `Cache-Control: max-age` header. When **Environment Update Time** is empty, the default is `604800` seconds (7 days).


## Key Features

### Cloud Storage
- Connect UnoPim with **Amazon S3** to store images and PDFs safely and reliably in the cloud.
- Enjoy **unlimited, scalable storage** - no capacity limits, no need to manage server disk space.

### Easy Setup
- Get connected quickly by entering four details: **Access Key**, **Secret Key**, **Region**, and **Bucket Name**. The keys are stored encrypted.

### Automatic Media Sync
- All new images and PDFs added to UnoPim are **automatically uploaded to S3** - no manual uploads needed.

### Cache Management
- Uploaded files carry a `Cache-Control: max-age` header (7 days by default), so browsers and CDNs can cache them.
- With **File Visibility** set to private, images are served through short-lived presigned URLs, so the bucket does not need to be public.

### DAM Integration *(requires UnoPim DAM)*
If you have the **UnoPim Digital Asset Management (DAM)** extension installed, the AWS integration extends its capabilities further:

- **DAM asset import for products** - when importing products, the system automatically resolves DAM asset file paths to their correct asset IDs, so media links stay accurate without manual correction.
- **DAM asset import for categories** - the same automatic resolution applies to category fields of type `asset` during import.
- **Category media in export archives** - when you export a ZIP file, it now includes all files referenced by category fields of type `image`, `file`, and `asset`, alongside your product media - giving you a complete export package every time.

## Requirements

| Requirement | Details |
|---|---|
| **UnoPim** | 3.0.x |
| **PHP** | 8.4 or higher |
| **AWS S3 Bucket** | Active bucket with API credentials (Access Key, Secret Key, Region, and Bucket Name) |
