# UnoPim Cloudinary Connector

The **UnoPim Cloudinary Connector** integrates Cloudinary with UnoPim, allowing you to store, manage, and optimize your product images and media files in Cloudinary.

Instead of keeping product assets on your local web server, the connector offloads media directly to Cloudinary's cloud infrastructure, delivering assets via Cloudinary's global content delivery network (CDN).

---

## Core Capabilities

- **Automatic Media Sync:** Automatically upload new product images and gallery media to Cloudinary when products are saved.
- **Bulk Media Synchronization:** Push existing catalog media from local storage to Cloudinary with one click or via CLI command.
- **Bi-Directional Pull:** Safely pull media back from Cloudinary to local storage before disabling the connector or performing maintenance.
- **Custom Folder Organization:** Specify a dedicated folder path in Cloudinary (e.g., `unopim/products`) to keep catalog assets organized.
- **Encrypted Credential Storage:** Store Cloudinary API credentials securely encrypted in the UnoPim database.
- **Console Artisan Commands:** Run background sync or pull operations via Laravel console commands (`php artisan cloudinary:sync-media`).

---

## System Requirements

Before installing the connector, verify that your environment meets the following specifications:

| Requirement | Supported Version |
|---|---|
| **UnoPim** | v3.x |
| **PHP** | 8.4 or higher |
| **cURL Extension** | Enabled in PHP (`ext-curl`) |

---

## Getting Started

1. [Cloudinary Setup](./cloudinary-setup.md) - Find your Cloud Name, API Key, and API Secret in the Cloudinary Console.
2. [Installation](./installation.md) - Register the package, run migrations, and configure permissions.
3. [Setup Credentials & Settings](./setup.md) - Configure credentials and media sync behavior inside UnoPim.
4. [Media Synchronization](./sync-media.md) - Manage bulk media sync and CLI synchronization.
