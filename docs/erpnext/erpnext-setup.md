# Setting Up ERPNext Before You Begin

Before you start importing or exporting data between UnoPim and ERPNext, you need to generate the **API credentials** that let UnoPim talk to your ERPNext instance. The connector authenticates using an **API Key** and **API Secret** tied to an ERPNext user.

This is a one-time setup step - once done, you won't need to repeat it.

## Step 1 - Log in to ERPNext

Log in to your ERPNext / Frappe instance with a user that has permission to manage the doctypes you plan to sync (Item, Item Group, Item Attribute, Brand), plus **File** (product images), **Custom Field** (if you use [Custom Attribute Mapping](./other-mappings.md#custom-attribute-mapping)), and **GST HSN Code** on India-localized sites.

> **Tip:** It's good practice to create a dedicated **integration user** for UnoPim so the sync activity is easy to audit and the credentials can be revoked independently.

## Step 2 - Open the User's Settings

Go to the user you want to connect with:

**Settings → Users → (select the user)**

Or simply search for **User List** in the awesome bar and open the relevant user.

## Step 3 - Generate API Keys

Scroll down to the **API Access** section of the user form and click **Generate Keys**.

ERPNext will generate:

| Credential | Notes |
|---|---|
| **API Key** | Shown on the user form. Copy it. |
| **API Secret** | Shown **only once**, immediately after generation. Copy it right away. |

> [!IMPORTANT]
> The **API Secret** is displayed only once. If you lose it, you'll need to regenerate the keys. Store both values somewhere safe before leaving the page.

## Step 4 - Note Your Base URL

The connector also needs the **Base URL** of your ERPNext instance - the site root you use to open ERPNext in the browser, without `/app` or any other path, for example:

```
https://your-company.erpnext.com
```

Keep your **Base URL**, **API Key**, and **API Secret** handy - you'll enter them in UnoPim when [setting up credentials](./setup-credentials.md).

Once you have these three values, your ERPNext instance is ready to connect with UnoPim. Head over to [Installation](./installation.md) to continue.
