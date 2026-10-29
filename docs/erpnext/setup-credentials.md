# Setting Up ERPNext Credentials

Connect your ERPNext instance to UnoPim by adding its API details. You can add **multiple ERPNext sites**, one credential each.

> Need an API Key and Secret? See [ERPNext Setup](./erpnext-setup.md).

## Add a Credential

1. In UnoPim, go to **ERPNext → Credentials** and click **Add Credential**.

![Credentials list](./assets/import/Credentials-page.png)

2. Fill in the details and click **Save**.

| Field | What to enter |
|---|---|
| **Base URL** | URL of your ERPNext instance (e.g. `https://your-company.erpnext.com`). |
| **API Key** | API Key generated for your ERPNext user. |
| **API Secret** | API Secret generated with the key. |
| **Active** | Enable or disable the credential. |

![Add ERPNext Credential](./assets/credentils/create_credenetils.png)

## Edit a Credential

Click the edit icon to open the credential. Leave **API Secret** blank to keep the saved value.

![Edit ERPNext Credential](./assets/credentils/Edit-ERPNext-Credential.png)

The other tabs configure mappings for this credential:

- **ERPNext Attribute Mapping** - item fields, media slots and the brand attribute.

![Attribute and brand mapping](./assets/credentils/Edit-ERPNext-Credential-attribute-and-brand-mapping.png)

- **Category Mapping** - map ERPNext Item Group fields to UnoPim category attributes (Item Group name is required).

![Category mapping](./assets/credentils/Edit-ERPNext-Credential-category-mapping.png)

- **Custom Fields** - attributes created as custom fields in ERPNext.
- **History** - review past changes, with old and new values.

![History](./assets/credentils/Edit-ERPNext-Credential-history-changes-in-credentils.png)
