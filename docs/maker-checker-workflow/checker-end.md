# Checker End

## Checker Configuration Options

**Setting Minimum Approval Level**

User having permission can set the minimum approval level required for products and assets using the drop down option.

This is the number of approvals from different checkers a request needs before it moves to **Approved** and can be published. The value must be between 1 and the number of approval users (active users whose role has Approve, Reject or Publish, or **All** permissions). Setting it higher than the number of approval users would leave requests stuck in **Waiting for Approval**, so the form rejects it.

> [!NOTE]
> When you change the minimum approval level, existing product requests are re-evaluated against the new value. Asset requests are not re-evaluated; they keep their current stage until the next approval.

![Exclude Product Attributes](./assets/checker-end/checker-1.webp)

**Excluding Product Attributes**

Users can also exclude specific product attributes from the approval process by the checker.

Changes to an excluded attribute are saved to the live product immediately when the maker saves, with no draft or approval. Other changes in the same save still go to the draft. This setting applies to products only, not to assets.

> [!WARNING]
> Exclude only attributes that are safe to change without review. Excluding, for example, `price` or `status` lets any maker change them on the live product directly.

**Send Notifications**

After enabling the 'Send Notifications' option, alerts are automatically sent when a request is sent for approval, approved, rejected, published, or commented on. Each alert is an in-app notification plus an email to the maker and all active approval users.

Emails are queued, so a queue worker must be running. See [Installation](./installation#_6-start-the-queue-worker).

This keeps everyone instantly informed and reduces the need for manual follow-ups.

## Approval Users

On the 'Approval Users' tab, you can view a list of users managing product and asset approvals. The list also shows their assigned roles and permissions.

![Approval Users](./assets/checker-end/approval-users.webp)

## History and Audit Trail

Under the 'History' tab, users can view logs of changes made to the approval settings for checkers.

![View History Logs](./assets/checker-end/view-history-logs.webp)

Users can also click the action button next to each history log to preview detailed changes made to the settings.

![View Detailed Changes](./assets/checker-end/preview-history-logs.png)
