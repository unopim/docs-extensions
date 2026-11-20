---
editLink: false
---

# Google Prerequisites

The Google Shopping Connector does not have a dedicated `.env`-driven settings page. Configuration is split between:

1. **Google side** - the Merchant Center account and the Google Cloud OAuth client your UnoPim connection authenticates as.
2. **Package config** - OAuth URLs, API timeouts/retries and per-admin throttle limits in `config/google-shopping.php`.
3. **Required Settings** - the in-admin defaults (country, language, channel, condition, availability, default Google category) edited per connection.
4. **Permissions** - ACL keys assigned to admin roles.
5. **Standard Data Transfer settings** - queue, file size and storage settings already configured for UnoPim's export pipeline.

Day-to-day connection editing and the Required Settings tab are documented under [Connections](./connection-setup) and [Mapping](./required-settings). Running jobs is documented under [Exporting](./wizard-export).

## Google prerequisites

Have the following ready from the Google side before creating a connection in UnoPim:

- A **Google Merchant Center** account with API access - note its **Merchant ID**.
- A **Google Cloud Console** project with the Google Shopping / Merchant API enabled.
- An **OAuth 2.0 Client** (*Web application*) - note the **Client ID** and **Client Secret**.
- An authorized **redirect URI** on that client matching the connector callback: `https://<your-unopim-host>/<admin-url>/google-shopping/oauth/callback` (`<admin-url>` is your `app.admin_url`, e.g. `admin`).
- The **content** scope (`https://www.googleapis.com/auth/content`) allowed on the client - the connector requests it during authorization.

> [!WARNING]
> The redirect URI must match exactly what UnoPim sends - scheme, host, port and admin path. UnoPim builds it from the URL you open the admin panel with. If you reach UnoPim over `https` but a proxy forwards it as `http`, Google rejects the login with `redirect_uri_mismatch`.

## Merchant API requirements

The connector uses **Merchant API v1** by default (see [Package Configuration](./package-configuration#environment-variables)). Merchant API needs two extra one-off steps on the Google side. The connector does not do them for you:

1. **Verify and claim your homepage** in Merchant Center. The site must be public over HTTPS (not `localhost` or a private IP) and not claimed by another Merchant Center account. Without it, products are disapproved and step 2 fails with `400 FAILED_PRECONDITION ... has an unverified homepage`.
2. **Register the Cloud project with the Merchant Center account.** Until this is done, every API call fails with `401 UNAUTHENTICATED - GCP project ... is not registered with the merchant account`. Most accounts have no button for this; call the API once with the access token of a connection you have authenticated in UnoPim:

```bash
curl -X POST \
  "https://merchantapi.googleapis.com/accounts/v1/accounts/<MERCHANT_ID>/developerRegistration:registerGcp" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"developerEmail": "<ADMIN_EMAIL>"}'
```

The Google account must be an **Admin** on the merchant account. Wait about 5 minutes after a successful call before running an export.
