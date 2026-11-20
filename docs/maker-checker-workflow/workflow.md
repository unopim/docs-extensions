# Maker Checker Workflow

After installing the UnoPim Maker Checker Workflow extension, users with the required permissions can manage the product and asset approval process.

## Enable Maker Checker Module

Navigate to the left-side menu and select **Maker Checker > Configuration**.

![Maker Checker Configuration](assets/workflow/macker-checker.png)

Here, you can turn on **Enable Maker Checker Workflow** to activate the approval workflow in UnoPim.

While the workflow is disabled, product and asset changes are saved directly, and the **Approval Requests** page and the **Approval Users** tab show a "Maker Checker Disabled" warning instead of opening.

![Enable Maker Checker](assets/workflow/enable.png)

## Access Control List | Workflow for Maker Checker

Admin can create roles for the Maker-Checker process in UnoPim by navigating to **Settings > Roles > Create Role**.

![Create Role for Maker Checker](assets/workflow/roles.png)

![Create Role for Maker Checker](assets/workflow/create-role.png)

We have a **Maker Checker** section, where you can define role-based permissions for configurations, approval users, and approval requests as shown below:

| Permission (Roles screen) | What it allows |
|---|---|
| **Maker Checker** | Shows the Maker Checker menu. |
| **Configuration > View** | Opens the configuration page. |
| **Configuration > Update** | Saves the configuration. |
| **Configuration > Approval Users > View** | Opens the Approval Users tab. |
| **Configuration > History > View** | Opens the History tab. |
| **Approval Requests** | Opens the Approval Requests list, sends drafts for approval, and adds comments. |
| **Approval Requests > Approve** | Approves product and asset requests. |
| **Approval Requests > Reject** | Rejects product and asset requests. |
| **Approval Requests > Publish** | Publishes approved product and asset requests. |

A **maker** role needs **Approval Requests** plus the product (and DAM asset) edit permissions. A **checker** role needs at least one of **Approve**, **Reject** or **Publish**.

> [!NOTE]
> Users whose role has none of Approve, Reject or Publish see only their own requests in the Approval Requests list. Only active users with Approve, Reject or Publish (or a role with **All** permissions) count as approval users and receive notifications.

![Create Roles for Maker Checker](assets/workflow/access-role.png)

![Create Roles for Maker Checker](assets/workflow/save-role.png)

## Assigning Roles

Then users can be assigned these roles with related permission for checker or maker accordingly.

![Assign Roles](assets/workflow/create-users.png)

![Assign Roles](assets/workflow/user-fields.png)
