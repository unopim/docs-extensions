# Setting Up ERPNext Credentials

Once the connector is installed, the next step is to connect your ERPNext instance to UnoPim. This is done by entering your ERPNext API details inside the UnoPim dashboard.

You can connect **multiple ERPNext sites** by creating a separate set of credentials for each one.

## Step 1 - Open the Credentials Page

Log in to your UnoPim dashboard and navigate to **ERPNext → Credentials**, then click **Add Credential**.

## Step 2 - Enter Your ERPNext Connection Details

Fill in the following fields to establish the connection:

| Field | What to enter |
|---|---|
| **Base URL** | The root URL of your ERPNext site (e.g., `https://your-company.erpnext.com`). Must be unique across credentials. |
| **API Key** | The API Key generated for your ERPNext user. |
| **API Secret** | The API Secret generated alongside the API Key. |
| **Active** | Only active credentials are listed in the **Credential** dropdown of export and import jobs (shown by Base URL). Jobs already saved with this credential still run when it is inactive. |

> [!WARNING]
> Enter only the site root. Do not add `/app`, `/desk`, or `/api` - the connector appends `/api/resource` and `/api/method` itself, so a URL with a path fails with **ERPNext API not found at this URL.** A trailing `/` is removed automatically.

> [!NOTE]
> The channel, locale, and currency are not part of the credential. You choose them on each export or import job.

> **Note:** Don't have your API Key and Secret yet? See [ERPNext Setup](./erpnext-setup.md) for how to generate them in ERPNext.

## Step 3 - Save and Verify the Connection

Click **Save**. UnoPim calls your ERPNext site with the details you entered before it stores them. The credential is saved only if the call succeeds. Otherwise one of these errors is shown and nothing is saved:

| Error | Likely cause |
|---|---|
| **Invalid API key or secret.** | Wrong key or secret, or the keys were regenerated in ERPNext. |
| **ERPNext site is suspended.** | The ERPNext / Frappe Cloud plan has expired. |
| **ERPNext API not found at this URL.** | The Base URL is wrong or contains a path. |
| **Cannot reach ERPNext.** | The site is offline or not reachable from the UnoPim server. |
| **ERPNext is unavailable.** | ERPNext returned a server error. Try again later. |

Once saved, your ERPNext instance is connected to UnoPim and ready for export and import jobs.

> **Tip:** When editing an existing credential, leave the **API Secret** field blank to keep the previously saved value. The connection is verified again on every save.
