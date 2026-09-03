# Connect UnoPim in Zapier

Zapier authenticates against UnoPim's existing OAuth **password grant**. There is no consent screen to click through - you paste five values into the Zap editor and Zapier exchanges them for a bearer token it stores and replays.

All five come from a **single row** on the API Keys screen.

**Open it from:** *Configuration → Integrations*

---

## Step 1 - Create the API key in UnoPim

1. Go to **Configuration → Integrations**.

   ![UnoPim Integrations listing showing two API keys with their name, user, client ID and permission type](./assets/setup/api-keys-list.png)

2. Click **Create** in the top-right corner.

3. Give it a name - *Zapier* is a good one - and choose a **Permission Type**.

   | Permission Type | When to use it |
   |---|---|
   | **All** | Simplest. The key can reach every API route, which is what a general-purpose Zapier connection needs. |
   | **Custom** | Tick the individual permissions instead. For Zapier you need **Zapier**, **Subscriptions**, **Create**, **Delete** and **Triggers**, plus the **Products** permissions if you use the Create / Update / Find Product actions. |

4. Save. UnoPim generates the credentials and shows the **API Password once**. Copy it now.

5. Open the key again to see the rest of the values.

   ![UnoPim Edit Integration page with the Credentials panel showing Client ID, Secret Key, API Username and API Password](./assets/setup/api-key-credentials.png)

> [!TIP]
> The **Secret Key** and **API Password** are masked once saved. If you lose either, use the regenerate icon next to it - the new value is shown only once, and any existing Zapier connection has to be reconnected afterwards.

---

## Step 2 - Connect the account in Zapier

In the Zap editor, pick **UnoPim** as the app and click **Connect a new account**. Five fields:

| Zapier field | What goes in it | Where it is on the UnoPim screen |
|---|---|---|
| **UnoPim URL** | The root URL of your instance, e.g. `https://pim.example.com`. | - |
| **Client ID** | The OAuth client identifier. | **Client ID** |
| **Client Secret** | The OAuth client secret. | **Secret Key** |
| **Username** | The generated API user, shaped `integration+<uuid>@api.local`. | **API Username** |
| **Password** | The generated API password. | **API Password** |

Note that the UnoPim labels and the Zapier labels differ: Zapier's *Client Secret* is UnoPim's **Secret Key**, Zapier's *Username* is UnoPim's **API Username**, and Zapier's *Password* is UnoPim's **API Password**.

> [!CAUTION]
> ### The Username is not your admin login
>
> The **Username** field takes the generated **API Username** from the API Keys screen - a value shaped `integration+<uuid>@api.local`. It is **not** the email address you sign into the UnoPim admin with.
>
> This is the single biggest support trap with this connector. UnoPim ties each key's OAuth client to the generated API user on the same row, so a username that does not resolve to that client is rejected at the token step: `/oauth/token` answers **`invalid_client`**, no token is issued, and the connection never completes. Zapier shows *"Those credentials were rejected"*.
>
> The same error appears if the Username is clipped when copying - the value is 58 characters long. Copy all four credential values from **the same row** of the API Keys screen and the problem disappears.

> [!WARNING]
> ### The URL must be `https://`
>
> A plain `http://` URL is refused outright rather than sending your Client Secret and password in the clear. The address must also be:
>
> - a real public hostname - Zapier's servers call your instance directly, so `localhost`, `127.0.0.1` and private LAN addresses will not work;
> - free of embedded credentials (`https://user:pass@host`);
> - free of a query string or fragment.
>
> A trailing slash is fine - it is stripped before every request.

---

## Step 3 - Test the connection

Zapier calls `GET /api/v1/rest/zapier/me` when you click **Test**. It returns your instance name, URL, default locale and default channel - no catalog queries, so it stays fast.

A successful connection is labelled in Zapier as `<instance name> (<user>)`, which makes it obvious when a Zap is pointed at staging instead of production.

---

## What each field is used for

| Field | Used for |
|---|---|
| **UnoPim URL** | Every request Zapier makes, including the token exchange at `/oauth/token`. |
| **Client ID** + **Client Secret** | Identifying the OAuth client during the password grant. |
| **Username** + **Password** | The password-grant credentials, and the link to the API key whose permissions apply. |

The bearer token is stored by Zapier and refreshed automatically. When UnoPim answers **401**, Zapier re-runs the token exchange and replays the call once.

---

## Reconnect after regenerating credentials

Regenerating the Secret Key or the API Password invalidates the stored token and the stored credentials. Open the connection in Zapier, paste the new values, and test again. Existing subscriptions survive - they are keyed to the API key, not the token.

---

## Common connection errors

| What Zapier says | What it means |
|---|---|
| *Those credentials were rejected...* | One of the four values is wrong, or the Username is a human admin login. Copy all four from one row of the API Keys screen. |
| *The UnoPim URL must start with `https://`* | You entered an `http://` address. |
| *"…" is not a valid UnoPim host* | The URL is not a resolvable public hostname. |
| *UnoPim did not return an access token* | The URL does not point at the application root, or `/oauth/token` is not reachable there. |
| *This API key is not permitted to perform that action* | The connection works but the key lacks a permission. Grant it on the key under **Configuration → Integrations**. |

See [Troubleshooting](./troubleshooting) for the full list.
