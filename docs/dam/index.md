# UnoPim DAM 

Store Link: [View on Webkul Store](https://store.webkul.com/unopim-digital-asset-management.html)

UnoPim DAM is a powerful, open-source digital asset management solution designed to help organizations store, organize, and manage their digital assets efficiently. Whether you are managing images, PDFs, documents, videos, audio files, or other media types, UnoPim DAM provides a comprehensive platform to streamline your workflow.

If your DAM installation also uses the **UnoPim AWS Integration**, you can migrate locally stored DAM files to Amazon S3 by following [DAM Asset Migration to AWS S3](./dam-asset-migration-to-aws-s3.md).

<div align="center">
  <img src="./assets/overview/DAM-banner.png" alt="UnoPim Shopify Connector" width="100%" style="max-height:330px; object-fit:cover; border-radius:8px;" />
</div>






### Why Choose UnoPim DAM?

- **Free and open-source software** – No licensing costs
- **Support for multiple file types and formats** – Manage diverse digital assets
- **Enhanced team collaboration capabilities** – Work together seamlessly
- **Flexible directory and categorization options** – Organize assets your way
- **Robust asset organization and search tools** – Find what you need instantly

### Key Features

| Feature | What it gives you |
|---|---|
| [Directory & asset management](./directory-and-asset-management.md) | A folder tree with search, breadcrumbs, per-folder asset counts, and right-click actions |
| [Explorer view](./explorer.md) | An optional file-manager UI with tabs, grid/list views, bookmarks, clipboard copy-paste, and bulk move/copy |
| [Uploading](./uploading-assets.md) | Drag-and-drop, whole-folder upload, and background uploads you can pause, resume, cancel, and retry |
| [Previews](./asset-preview.md) | Zoomable images, custom video and audio players, in-browser PDF viewing, and real thumbnails for PDFs and videos |
| [Image editor](./image-editor.md) | Crop, adjust, rotate, filter, and replace backgrounds — including AI-generated backgrounds |
| [Shared links](./shared-links.md) | Send an asset or a whole folder to someone outside UnoPim with an expiring, revocable link |
| [Directory permissions](./directory-permissions.md) | Scope a role to specific folders, enforced across the UI and the REST API |
| [Tags](./tags.md) | A tag management page, plus tagging and recursive mass-tagging from the gallery |
| [Product bulk edit](./product-bulk-edit.md) | Set asset attributes on many products at once from the bulk-edit spreadsheet |
| [Import & export](./import-assets.md) | Assign assets to products and categories in bulk from a CSV, and export them bundled together |
| [REST API](./api-reference.md) | Full API coverage for assets, directories, tags, properties, comments, shares, and linked resources |

### Supported File Types

UnoPim DAM supports a wide range of digital asset formats, including:

- **Images:** JPG, PNG, WEBP, JPEG, SVG.
- **Documents:** PDF and other document formats like CSV, XLSX, DOCX etc.
- **Video files:** All common video formats.
- **Audio files:** All common audio formats.
- **And much more** – Extensible to support additional formats.

Executable and script files (`.php`, `.js`, `.exe`, `.html`, and similar) are blocked at upload for security. See [Blocked file types](./uploading-assets.md#blocked-file-types).

## Requirements

| Requirement | Version |
|---|---|
| **UnoPim** | v2.1.x |
| **PHP** | 8.3 or higher |

**Optional, but recommended:**

| Tool | Needed for |
|---|---|
| `ffmpeg` | Real first-frame thumbnails for video assets |
| `poppler-utils` (`pdftoppm`) | Real first-page thumbnails for PDF assets |
| `exiftool` | Full embedded metadata (EXIF, IPTC, XMP, ID3) and audio cover art |
| `imagick` (PHP ext.) | Converting SVGs on Custom Download |

Without these, videos and PDFs fall back to generic file-type icons, the Metadata tab shows much less, and SVG conversion is unavailable — everything else works normally. See [Installation](./installation.md#optional-server-tools) for install commands.

> [!NOTE]
> DAM v2.x does **not** support UnoPim v1.x. Composer will refuse to install it on an UnoPim 1.x site.
