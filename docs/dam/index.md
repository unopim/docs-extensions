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
- **Single-page, no-refresh navigation** – Pages swap over AJAX, so moving around is fast and smooth

### A Single-Page Experience

From **UnoPim 3.0** onward the admin — DAM included — behaves like a single-page application. Clicking a link no longer reloads the browser; UnoPim fetches the next page over AJAX and swaps it in place.

In practice that means:

- **No white flash between pages.** A slim progress bar runs along the top of the window while the next page loads.
- **The shell stays put.** The header and sidebar are never rebuilt, so navigation feels instant.
- **Nothing else is re-downloaded.** Scripts, styles, and fonts are already loaded, so only the page itself comes over the wire.
- **Back and forward still work.** The URL updates as you go, so browser history, bookmarks, and refresh all behave exactly as you would expect.

This matters most in DAM, where you move between folders, assets, and the edit screen constantly.

> [!NOTE]
> If a page ever fails to load over AJAX, UnoPim falls back to a normal full-page load rather than leaving you stuck. Downloads, external links, and links opened in a new tab always bypass it.

> [!IMPORTANT]
> **An upload in progress still stops you leaving.** If you click a link while files are uploading, DAM asks whether to stay or leave. Choosing **Leave** abandons the upload — navigating away does not carry it with you. Wait for the transfer to finish, or see [Background Operations](./background-operations.md).

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
| [Asset bundles](./import-assets.md#importing-an-asset-bundle-zip) | Export a catalogue *with its asset files*, then import that same ZIP into another instance — folders and assets are recreated for you |
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
| **DAM** | v3.0.1 |
| **UnoPim** | v3.0.x |
| **PHP** | 8.4.1 or higher |

**Optional, but recommended:**

| Tool | Needed for |
|---|---|
| `ffmpeg` | Real first-frame thumbnails for video assets |
| `poppler-utils` (`pdftoppm`) | Real first-page thumbnails for PDF assets |
| `exiftool` | Full embedded metadata (EXIF, IPTC, XMP, ID3) and audio cover art |
| `imagick` (PHP ext.) | Converting SVGs on Custom Download |

Without these, videos and PDFs fall back to generic file-type icons, the Metadata tab shows much less, and SVG conversion is unavailable — everything else works normally. See [Installation](./installation.md#optional-server-tools) for install commands.

> [!IMPORTANT]
> **DAM v3.x requires UnoPim v3.0.** It will not run on UnoPim 2.x or 1.x. If you are still on UnoPim 2.1.x, upgrade UnoPim first, then upgrade DAM — see [Upgrading DAM](./upgrading.md#upgrading-to-dam-30).
