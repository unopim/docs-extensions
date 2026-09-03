# Setting Up UnoPim Credentials

Once the connector is installed, the next step is to connect your Shopify store to UnoPim. This is done by adding your Shopify credentials inside the UnoPim dashboard.

---

## Step 1 — Open the Shopify Section

After installation, you'll notice a new **Shopify icon** in the left sidebar of your UnoPim dashboard. Click on it to open the connector.

![Shopify Connector Icon](./images/verify-installation.png)

---

## Step 2 — Create New Credentials

Go to the **Credentials** tab and click **Create Credentials**.

![Create Credentials Button](./images/create-credentials.png)

Fill in the following details:

| Field | What to enter |
|---|---|
| **Shopify URL** | Your Shopify store URL (e.g. `mystore.myshopify.com`) |
| **Admin API access token** | The access token you copied from your Shopify app |
| **API Version** | Select `2026-07` |

![Credentials Form](./images/fill-cred.png)

> **Note:** The UnoPim Shopify Connector currently supports **API version 2026-07**. Make sure you select this version.

Click **Save** once all fields are filled in.

---

## Step 3 — Update the Credential Settings

After saving, you'll be redirected to the credential edit screen. Complete the remaining fields:

![Credential Edit Screen](./images/sales.png)

**Publishing (Sales Channels)**
Select which Shopify sales channels your products should be published to once exported.

**Status**
Set the default status for exported products — either active or draft.

> **Note:** The **Sales Channels** are fetched directly from your Shopify store. If you don't see them in the dropdown, make sure they have been created in Shopify first before setting up credentials here.

---

## Step 4 — Map Your Locations

Map a quantity attribute to each Shopify location to send location-wise stock. Any location you leave blank is skipped during sync.

![Location Mapping](./images/location.png)

> **Note:** The **Location List** is fetched directly from your Shopify store. If a location is missing from the list, create it in Shopify first.

---

## Step 5 — Map Your Locales

If your Shopify store supports multiple languages, all available Shopify locales are fetched automatically. You just need to map each Shopify locale to the corresponding locale in UnoPim.

![Locale Mapping](./images/locale-mapping.png)

---

## Connecting Multiple Shopify Stores

You can connect **more than one Shopify store** to the same UnoPim instance. Simply repeat the steps above and create a separate set of credentials for each store.

![Multiple Stores](./images/unopimshopifystoreurl-1200x609.png)

