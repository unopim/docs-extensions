# Maker Checker Workflow

Store Link: [View on Webkul Store](https://store.webkul.com/unopim-maker-checker-workflow.html)

The **Maker Checker Workflow** extension lets users manage product and asset approvals with clear roles and visual tracking. It helps approve or reject updates easily through a dedicated section and keeps everyone informed with instant notifications. Users can set how many approvals are needed and skip certain fields to speed up updates without losing control. The side-by-side view shows original and draft data, making it easy to compare changes before final approval. All approval actions are tracked in logs, so users can see who made changes and when.


## How it works

```
Maker edits product/asset
        ↓
   Saved as Draft
        ↓
Maker sends for Approval
        ↓
Checker reviews (side-by-side diff)
        ↓
  Approve / Reject
        ↓
 Publish → Goes Live
```

Each step is tracked in a visual workflow. When **Send Notifications** is enabled, the maker and all active checker users receive an in-app notification and an email when a request is sent for approval, approved, rejected, published, or commented on.

> [!WARNING]
> The approval workflow applies only to product and asset changes made in the admin panel. Changes made through the REST API or data imports are written to the live product directly, without a draft or approval. Deleting products from the product grid is also not subject to approval.

## Key features

- Approve products and assets with a role-based maker-checker system.
- Set minimum approval levels to ensure controlled updates.
- Track every approval step with a clear visual workflow.
- Exclude specific product attributes from the approval process.
- View and manage all pending approval requests in one organized place.
- Instantly notify users of approvals, rejections, publishing, and comments.
- Compare original and draft data side by side before final approval.
- Keep a log of all changes in approval settings for easy tracking.
- Add comments during review to improve communication between users.

## Roles

| Role | Responsibilities |
|---|---|
| **Maker** | Creates or edits products/assets; sends drafts for approval |
| **Checker** | Reviews drafts; approves, rejects, or publishes them |

A user can hold both roles depending on their permissions.


## Requirements

- **UnoPim**: 3.x (v1.2.0 and later)
- **PHP**: 8.4.1+ (required by UnoPim 3.x)
- **Laravel**: 13.x (bundled with UnoPim 3.x)
- **UnoPim DAM** (optional): required only for asset approvals. See [Compatible with UnoPim DAM](./compatible-with-unopim-dam).