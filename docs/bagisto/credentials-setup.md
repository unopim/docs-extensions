# Configuration & Credentials Setup

After installing the UnoPim Bagisto Connector, you need to configure it with your Bagisto store credentials. This guide walks you through setting up and managing connector credentials, attribute mappings, and channel/locale configurations.


## Accessing the Bagisto Connector

Once the UnoPim Bagisto Connector is installed, it appears in the left sidebar of your UnoPim dashboard.

### Step 1 - Open the Connector

1. Log in to your UnoPim dashboard
2. Navigate to the left sidebar
3. Click on **Bagisto** to access the connector

![Bagisto Connector Navigation](./assets/setup/bagisto.png)


## Setting Up Store Credentials

### Step 1 - Navigate to Credentials

From the Bagisto section, navigate to:

**Bagisto > Credentials > Create Credentials**

![Create Credentials](./assets/setup/create-cred.png)

### Step 2 - Enter Bagisto Store Details

Fill in the following information to connect your Bagisto store:

| Field | Description | Example |
|---|---|---|
| **Bagisto Shop URL** | The base URL of your Bagisto store. The connector appends `/api/v1/admin/...` to it, so enter only the store root (include `/public` if Bagisto is served from it). A trailing `/` is removed. | `https://shop.example.com` |
| **Email Address** | Email of a Bagisto **admin** user. It is used to log in to the Bagisto Admin REST API. | `admin@example.com` |
| **Password** | Password of that Bagisto admin user. It is stored encrypted. | `••••••••` |

![Credentials Form](./assets/setup/cred.png)

> [!WARNING]
> Do not add `/api`, `/admin` or a page path to the Shop URL. On save, the connector logs in at `<Shop URL>/api/v1/admin/login`; if that returns 404 or the login fails, the credential is not saved. The [REST API](./rest-api-setup) package must be installed on the Bagisto store first.

### Step 3 - Save Credentials

Click the **Save** button to add the credential to UnoPim. Each Shop URL can be added only once.

After saving, you are redirected to the **Edit Credential** page to finish the store configuration.

### Step 4 - Map Channels, Locales and Filterable Attributes

The **Edit Credential** page loads the channels, locales and filterable attributes from your Bagisto store. Configure:

| Section | Description |
|---|---|
| **Channel Mapping** | Map each Bagisto channel to a UnoPim channel. |
| **Locale Mapping** | Map each Bagisto locale to a UnoPim locale. |
| **Is Filterable Attributes Field Mapping** | Required. Select the Bagisto filterable attributes to send with exported categories. |

> [!WARNING]
> Exports only send data for channels and locales that are mapped here **and** selected in the export job. If none match, the job logs `Channel or locale mapping not found!` and exports nothing.

### Multiple Store Support

The UnoPim Bagisto Connector supports managing multiple Bagisto stores. You can:
- Add credentials for different Bagisto store instances
- Manage separate product catalogs per store
- Maintain independent export configurations for each store

Simply repeat the steps above to add additional store credentials as needed.

> [!WARNING]
> The connector caches the credential, channel/locale filters and mapping template of the last Bagisto export run under shared cache keys. Saving the export job clears the credential and channel/locale cache; saving a mapping template clears the template cache. Before running an export that targets a different store or uses a different mapping template than the previous run, re-save the export job and run `php artisan cache:clear`, otherwise the previous values can be reused.


## Managing Credentials

### View All Credentials

Once credentials are saved successfully, they appear in the **Credentials** section. Here you can see:
- ID, Shop URL and Email of each connected Bagisto store
- Quick actions (Edit, Delete)

### Edit Credentials

To modify existing credentials:

1. Click the **Edit** button next to the credential you want to update
2. You'll be redirected to the credential edit page
3. Update any of the following:
   - Email Address
   - Password
   - Channel, locale and filterable attribute mappings
4. Click **Save** to apply changes

The **Shop URL** is read-only after creation. To point to a different store URL, create a new credential.

### Delete Credentials

To remove a credential:

1. Click the **Delete** button next to the credential
2. Confirm the deletion
3. The credential and its export mapping records (the stored links between UnoPim and Bagisto IDs) are removed

> **Note:** Deleting credentials will stop all product exports to that Bagisto store. Proceed with caution.

---
