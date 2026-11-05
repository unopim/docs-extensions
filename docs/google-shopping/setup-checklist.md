---
editLink: false
---

# Setup Checklist

Work down this list in order. Each step builds on the previous one. Tick it off when you're done.

## Part 1 · In Google

| # | Step | You'll end up with | Guide |
|---|---|---|---|
| 1 | Create or open your **Merchant Center** account and **verify your website** | Your **Merchant ID**, plus a verified website | [Merchant Center Account](./google-merchant-center) |
| 2 | Create a **Google Cloud project** and turn on the **Merchant API** | A project with the Merchant API enabled | [Google Cloud Project](./google-cloud-project) |
| 3 | Set up the **consent screen** and create an **OAuth client** | A **Client ID** and **Client Secret** | [OAuth Client](./google-oauth-client) |
| 4 | **Register** the Cloud project with Merchant Center (one API call, done in your browser) | A project that is allowed to call your Merchant account | [Register the Project](./google-register-project) |

::: warning Don't skip step 4
If the project isn't registered, Google refuses every export with `401 … is not registered with the merchant account`. It's the step people miss most often.
:::

## Part 2 · In UnoPim

| # | Step | You'll end up with | Guide |
|---|---|---|---|
| — | Install the connector and start the queue worker | A **Google Shopping** menu in UnoPim | [Installation](./installation) |
| 5 | Add a connection and click **Authenticate with Google** | A connection with the status **Authenticated** | [Connect to Google](./connection-setup) |
| 6 | Pick the country, language and default category | Saved **Required Settings** | [Required Settings](./required-settings) |
| 7 | Tell the connector which attribute feeds each Google field | Saved **Attribute Mapping** | [Attribute Mapping](./attribute-mapping) |
| 8 | Match your categories to Google's (manually or with AI) | Enabled **Category Mapping** rows | [Category Mapping](./category-mapping) |

## Part 3 · Send products

| Step | Guide |
|---|---|
| Send a small test first, for example 2–3 SKUs | [Export with the Wizard](./wizard-export) |
| Check the job result in UnoPim, then check the products in Merchant Center | [Check Results](./check-results) |
| Once the test looks right, export everything, or switch on Quick Export | [Quick Export & Auto Sync](./quick-export) |

## Values to keep handy

Copy these into a notepad as you go. You'll paste them into UnoPim in step 5.

| Value | Where you get it | Example |
|---|---|---|
| Merchant ID | Step 1 | `5432109876` |
| Client ID | Step 3 | `1234-abcd.apps.googleusercontent.com` |
| Client Secret | Step 3 | `GOCSPX-…` |
| Redirect URI | Your UnoPim address + `/admin/google-shopping/oauth/callback` | `https://pim.example.com/admin/google-shopping/oauth/callback` |
