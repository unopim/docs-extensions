# Roles & Permissions

The extension uses UnoPim's normal role system, so you decide exactly who can see, change, run and preview the feed. Administrators with full access get everything automatically. Other roles need the permissions below.

---

## Available permissions

You'll find these under **Settings › Roles › (edit a role) › OpenAI Feed**:

| Permission | Allows |
|---|---|
| **OpenAI Feed › General** | Open the dashboard, copy the feed URL, download the feed file and view the generation history. |
| **OpenAI Feed › Configuration** | View and change every feed setting, generate a new token, and view the settings history. |
| **OpenAI Feed › Generate Feed** | Start a generation with **Generate Now**, and **Stop** a running one. |
| **OpenAI Feed › Preview Feed** | Open **Preview Feed** and the per-product mapped record details. |

If a user lacks a permission, the matching menu item or button is hidden, and opening its URL directly is refused.

---

## Grant access to a role

1. Go to **Settings › Roles** and edit the role (or create a new one).
2. Set **Permissions** to **Custom**.
3. Tick **OpenAI Feed**, then tick the sub-permissions you want.
4. Click **Save Role**. Users with that role see the changes on their next page load.

---

## Suggested setups

| Who | Give them | Why |
|---|---|---|
| **Catalog / content team** | General, Preview Feed | They can check how their product data looks in the feed, but can't change settings or publish. |
| **E-commerce manager** | General, Preview Feed, Generate Feed | They can publish a fresh feed after a big catalog update. |
| **Store admin / integrator** | All four | Full control, including the token and SFTP credentials. |

> [!WARNING]
> **Configuration** shows the feed token and controls the SFTP credentials. Give it only to people you would trust with your OpenAI integration.
