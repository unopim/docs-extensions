# Cloudflare R2 Integration

Store and deliver your UnoPim media faster with secure, scalable Cloudflare R2 cloud storage.

<br>

<div align="center">
  <img src="./images/intro-banner.png" alt="UnoPim Cloudflare R2 Integration" width="100%" style="max-height:330px; object-fit:cover; border-radius:18px;" />
</div>

<br> 

## Why use Cloudflare R2 with UnoPim?

* Offload product images, category banners, documents, galleries, and asset files from your local server.
* Improve media delivery speed using Cloudflare’s global CDN.
* Reduce server storage costs and simplify media management.
* Serve files publicly through CDN URLs or securely with expiring private links.
* Migrate existing local media to R2 in a single click or via CLI.
* Reconnect previously uploaded R2 files without uploading them again.
* Configure smart cache rules for different file types like JPG, PNG, WEBP, PDF, and more.
* Track every credential and configuration change with built-in history logs.

## Requirements

| Requirement | Details |
|---|---|
| **UnoPim** | 3.0 or higher (extension 2.1.0 is tested on 3.1.x) |
| **PHP** | 8.4 or higher |
| **Cloudflare R2** | Active R2 bucket and an R2 API token (Access Key + Secret Key) |
| **Queue worker** | A running `php artisan queue:work` (Supervisor, systemd or Horizon in production) |

## Before You Start

Make sure you have:

1. A working UnoPim 3.x installation.
2. An active Cloudflare account with R2 enabled.
3. An R2 bucket created in your Cloudflare dashboard.
4. An R2 API token with **Edit** access to the bucket.
5. For a **public** bucket: public access switched on in Cloudflare, either the `r2.dev` development URL or a custom domain connected to the bucket. You enter this address as the **Bucket URL**.
6. The Cloudflare R2 Integration extension installed. See [Installation](./installation).

> [!TIP]
> Decide on your final public address (your own domain) before the first upload. Changing the **Bucket URL** later needs extra steps — see [Change the Bucket URL later](./credentials#change-the-bucket-url-later).


