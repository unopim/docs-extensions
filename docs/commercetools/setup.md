# Setting Up the UnoPim Connection

Once the connector is installed, the next step is to connect your commercetools project to UnoPim. This is done by creating a **connection** with the API client details you copied in [commercetools Setup](./commercetools-setup).

---

## Step 1 - Open Connections

Click **Commercetools** in the left sidebar of your UnoPim dashboard, then click **Connections**.

![Commercetools Connections](./images/side-menu.png)

---

## Step 2 - Create a New Connection

Click **Create Connection** in the top-right corner.

![Create Connection Button](./images/create-connection.png)

Fill in the following details:

| Field | What to enter |
|---|---|
| **Name** | A name to recognise this project in UnoPim (e.g. `My Shop Production`) |
| **Project Key** | The `project_key` from your commercetools API client |
| **Client ID** | The `client_id` from your commercetools API client |
| **Client Secret** | The `secret` from your commercetools API client |
| **Region** | Your project region only, e.g. `europe-west1.gcp` or `us-east-2.aws`. The connector builds `https://api.<region>.commercetools.com` and `https://auth.<region>.commercetools.com` from it. |
| **Scopes** | One scope per line, e.g. `manage_project`. Leave blank to use `manage_project`. |

![Create Connection Form](./images/connection-form.png)

> **Note:** You don't need to add your project key to the scopes. Writing `manage_project` is enough - UnoPim adds `:your-project-key` for you. A scope copied from commercetools, such as `manage_project:my-shop`, also works.

> [!WARNING]
> Do not paste the full API URL into **Region**. On save, UnoPim requests a token from commercetools with these values; if it fails, the connection is not saved and the error is shown on the fields.

Click **Save Connection**.

> **Note:** The same **Project Key** and **Client ID** pair can only be used for one connection.

---

## Step 3 - Review the Connection

After saving, you'll be taken to the connection edit screen. It has four tabs:

- **Credentials** - the details you just entered.
- **Attribute Mapping** - which UnoPim attribute feeds each commercetools field. See [Attribute Mapping](./attribute-mapping).
- **Category Mapping** - which UnoPim category fields are sent with the category export. See [Category Mapping](#category-mapping).
- **History** - every change made to this connection.

![Edit Connection](./images/edit-connection.png)

**Client Secret**
The secret is never shown again. Leave the field blank to keep the current secret, or type a new one to replace it.

**Active**
Only active connections can be used in export and import jobs. Turn this off to pause a connection without deleting it.

### Category Mapping

The **Category Mapping** tab controls what the **Commercetools Category Export** sends:

| Field in Commercetools | UnoPim category field | When left empty |
|---|---|---|
| **Name** | A text category field, or a fixed value | The category `name` field, then the category code |
| **Slug** | A text category field, or a fixed value | The category `slug` field, then the category code |
| **Description** | A textarea category field, or a fixed value | The category `description` field |
| **Custom fields to sync** | Active text, textarea, boolean, select, multiselect, checkbox, date and datetime category fields | No custom fields are sent |

When you select custom fields, the export creates or updates a commercetools custom type with the key `unopim-category-fields-<connection ID>` and sends the values as category custom fields. The API client then also needs the `manage_types` scope.

---

## Step 4 - Test the Connection

Go back to **Commercetools → Connections** and click the **Test** action on your connection's row. UnoPim tries to log in to commercetools with your details:

| Result | What it means |
|---|---|
| **Connected** | Everything works. The **Last Tested** time is updated. |
| **Failed** | The project key, client ID, secret, region or scopes are wrong, or commercetools could not be reached. The exact reason is shown in the message. |

Test the connection again after changing any credential.

---

## Connection History

Open the **History** tab on a connection to see every change: the version, the date and time, who made it, and the old and new value of each field. For the attribute mapping, only the fields that actually changed are listed.

The client secret is never saved in history.

---

## Connecting Multiple commercetools Projects

You can connect **more than one commercetools project** to the same UnoPim instance. Repeat the steps above and create a separate connection for each project.

From the **Connections** list you can also:

- **Toggle Active** - switch several connections on or off at once.
- **Delete Selected** - remove several connections at once.
