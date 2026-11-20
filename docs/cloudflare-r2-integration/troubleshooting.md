# If something doesn't work

**The Cloudflare R2 menu is missing.**
Your role doesn't have R2 permission. Ask an admin to tick **Cloudflare R2** in **Settings → Roles**.

**Save fails with a credential error.**
Save runs a live `ListObjects` against your bucket. The error message tells you why — usually a bad Access / Secret Key, a wrong bucket name, or a token without **Edit** permission. Re-check the values in the [Cloudflare dashboard](https://dash.cloudflare.com/).

**Images are broken in the admin or on the storefront.**
Walk through this list:

1. Is **Enable Cloudflare R2** on?
2. **Public** bucket → is **Bucket URL** set to the R2 public address or a custom domain (e.g. `https://pub-xxxx.r2.dev`), and **not** the `r2.cloudflarestorage.com` endpoint?
3. **Private** bucket → leave **Bucket URL** blank. Presigned URLs are generated automatically.
4. Is your bucket's **CORS** policy allowing your UnoPim domain?

**Synchronize Media is disabled.**
Turn **Enable Cloudflare R2** on. The button stays disabled until the integration is enabled.

**The job is stuck on *queued*.**
The background worker isn't running. Start it (`php artisan queue:work`) or check Supervisor / Horizon in production.

**A file uploaded but the URL 404s.**
Check the bucket's **Public Access** setting on Cloudflare. A public bucket needs Public Access switched on; otherwise the public URL won't resolve even if the file is there.

**The preview shows an `Authorization` error.**
The file URL starts with `https://<account_id>.r2.cloudflarestorage.com`, the private S3 API. Set **Bucket URL** to the bucket's public address or custom domain, then follow [Change the Bucket URL later](./credentials#change-the-bucket-url-later) so existing files get the new address too.

**File URLs still use the old address after changing the Bucket URL.**
Saving the form does not rewrite the URLs of files already on R2, and running queue workers keep the old address until restarted. Follow [Change the Bucket URL later](./credentials#change-the-bucket-url-later). Changing **Environment Update Time** has no effect on URLs.

**Cache rule didn't apply to old files.**
Cache rules apply to **new** uploads. Re-run **Synchronize Media** to push them onto existing files. This only works while the local copies still exist.

**The credential page won't open.**
Check that the package is registered in `bootstrap/providers.php` and that `composer dump-autoload` ran. See [Installation](./installation).

---

## Permissions

If the menu is missing, the role needs these ticked in **Settings → Roles**:

- **Cloudflare R2** (master)
- **Credential** (view)
- **Save Cloudflare R2 Credential**
- **Validate Cloudflare R2 Credential**
- **Synchronize Cloudflare R2 Media**
- **View Cloudflare R2 Credential History**

## Audit logs

Every change to the credential is logged. Open the **History** tab on the credential page to see who changed what and when. Access and secret keys are never written to history.
