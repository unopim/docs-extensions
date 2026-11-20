---
editLink: false
---

# Permissions

The connector adds a **Google Shopping** permission group to UnoPim's role ACL. Access is managed the usual way: grant the relevant actions to a role under **Settings → Roles**, then assign that role to the admin user.

The group covers (labels as shown on the Roles screen):

| Permission | What it allows |
|---|---|
| **Google Shopping → Connections** | View the connections grid. |
| **Connections → Create Connection** | Create a connection. |
| **Connections → Edit Connection** | Open and update a connection, and use **Update Taxonomy**. |
| **Connections → Delete Connection** | Delete a connection. |
| **Connections → Quick Export** | Trigger Quick Export. |
| **Connections → OAuth** | Authorize a connection with Google. |
| **Google Shopping → Edit Mapping → Edit Mapping** | Show the Attribute Mapping, Category Mapping and Required Settings tabs on the connection edit page. |
| **Edit Mapping → Update Attribute Mapping** | Save the Attribute Mapping tab. |
| **Edit Mapping → Update Category Mapping** | Save, edit and delete category mappings, and run Map with AI. |
| **Edit Mapping → Update Required Settings** | Save the Required Settings tab. |

The AI category mapping settings are guarded separately by **Configuration → System Settings → Google Shopping**.

A role with the full group can set up and run everything. A role that only runs exports through Data Transfer needs none of these directly, though granting connection view (and Quick Export) lets an operator see and push connections.

To grant access:

1. Go to **Settings → Roles** and open or create a role.
2. Enable the required actions under **Google Shopping**.
3. Assign the role to the admin user.

If you use the connector's REST API, a parallel Google Shopping permission set is available under the API role permissions and mirrors the same actions.