# History Preview & Restore

Store Link: [View on Webkul Store](https://store.webkul.com/unopim-history-preview-restore.html)

---

The **History Preview & Restore** extension adds inline file thumbnails and one-click version restore to UnoPim's built-in History tab. It works across every module that uses the History trait — products, categories, attributes, channels, DAM assets, users, roles, and more — without any edits to core.


## What you can do

- **Preview files inline** — images, videos, audio, and PDFs render as thumbnails directly in the History grid.
- **Open a preview modal** — click any thumbnail to zoom images, play video/audio, or download documents.
- **Restore any past version** — revert a record to exactly how it looked at any point in history with a single click.
- **Roll back parent + translations + pivots together** — one Restore action covers the entire record across all related audit rows.
- **Revive soft-deleted records** — trashed records are automatically un-trashed during restore.
- **Keep an audit trail of every restore** — who clicked Restore, when, and from which version is recorded.
- **Purge old history rows** — a built-in Artisan command keeps the `audits` table bounded without losing the most recent version.

## Key features

- **Inline file thumbnails** — images, video frame stills, audio waveforms, and PDF first-page previews appear directly in history rows.
- **Preview modal** — full-size image zoom, native video/audio players, and a download button for documents.
- **Any-version restore** — restore any version by default; the current state becomes a new audit row, so nothing is destroyed.
- **Multi-model transaction** — parent, translated, and pivot rows all roll back together in a single database transaction.
- **Pivot restore** — channel currencies/locales, DAM asset tags, and webhook settings are reverted through the same events the original controller used.
- **Soft-delete revival** — trashed records are automatically un-trashed before old values are applied.
- **Asset file preservation** — re-uploading a DAM asset keeps the previous file with a unique suffix (`photo (1).jpg`, …) so any prior binary can be restored.
- **Restore lineage** — every revert stamps the audit row with `restored_from_version_id`, `restored_by`, and `restored_at`.
- **ACL-gated** — two permissions control who can view history and who can click Restore.
- **33 locales** — translated into all major European, Asian, and RTL admin locales.
- **DAM optional** — installs and works without the DAM module.

## Requirements

| Requirement | Details |
|---|---|
| **UnoPim** | 2.0.0 or higher (with `HistoryControl`) |
| **PHP** | 8.3 or higher |
| **Database** | MySQL or PostgreSQL with JSON column support |
| **ffmpeg** | Optional — required for video frame thumbnail extraction |
| **pdftoppm / poppler-utils** | Optional — required for PDF first-page thumbnail rendering |
| **DAM** | Optional — required only for DAM asset thumbnails and asset file preservation |
