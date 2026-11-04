# UnoPim Maker Checker Workflow

Store Link: [View on Webkul Store](https://store.webkul.com/unopim-maker-checker-workflow.html)

The **Maker Checker Workflow** extension adds a review step to product and asset changes in UnoPim. Edits made by a **maker** don't go live straight away. They're saved as a **draft**, sent for approval, and reviewed by one or more **checkers**. Only an approved draft can be published to the live catalog.

Checkers compare the original and draft values side by side, leave comments, and approve, reject or publish the request. Every step appears in a visual status tracker on the product page, and the people involved are notified in UnoPim and by email.

## How it works

```
  Maker edits a product (or DAM asset)
                 │
                 ▼
        Saved as a Draft
   (live product stays unchanged)
                 │
                 ▼
  Maker clicks "Send for Approval"
       and adds a request comment
                 │
                 ▼
      Status: Waiting for Approval
                 │
                 ▼
  Checker reviews Original vs Draft
     in Maker Checker → Approval Requests
                 │
        ┌────────┴─────────┐
        ▼                  ▼
     Approve             Reject
        │                  │
        ▼                  ▼
  Minimum approvals   Maker sees the
     reached?         rejection comment,
        │             fixes the draft
        ▼             and resubmits
     Approved
        │
        ▼
     Publish ──► changes go live
```

## Key features

- **Draft-based editing**: changes to products and assets are held as drafts until they're approved and published.
- **Role-based approval**: separate ACL permissions to approve, reject and publish requests.
- **Multi-level approval**: set how many checkers must approve a draft before it can be published.
- **Excluded attributes**: choose attributes, such as SEO fields, that are saved directly without approval.
- **Visual status tracker**: the product page shows the draft's stage: Draft, Waiting for Approval, Approved, Rejected or Published.
- **Side-by-side comparison**: checkers see the original and draft value of every changed attribute.
- **Comments**: makers add a request comment; checkers add field comments and approval, rejection or publish comments.
- **Dedicated approval queue**: all open requests are listed under **Maker Checker → Approval Requests**.
- **Notifications**: in-app and email notifications for new requests, approvals, rejections, comments and publishing.
- **Configuration history**: every change to the Maker Checker settings is logged with its old and new values.
- **DAM support**: asset changes follow the same approval flow when the UnoPim DAM extension is installed.

## Roles

| Role | What they do |
|---|---|
| **Maker** | Edits products or assets, which saves them as drafts, then sends the drafts for approval. |
| **Checker** | Reviews drafts in **Approval Requests**, adds comments, and approves, rejects or publishes them. |

Roles are ordinary UnoPim roles. A user is a checker if their role has at least one **Approval Requests** permission (Approve, Reject or Publish), or if the role has **All** permissions. See [Roles and Users](./roles-and-users).

## Requirements

| Requirement | Version |
|---|---|
| **UnoPim** | 3.0.x or 3.1.x |
| **PHP** | 8.3 or higher |
| **Laravel** | 13.x |
| **Queue worker** | Required for email notifications |
| **Mail server** | SMTP (or any Laravel mail driver) for email notifications |
| **UnoPim DAM** | Optional, only needed for asset approvals |

## In this guide

- [Installation](./installation)
- [Roles and Users](./roles-and-users)
- [Configuration](./configuration)
- [Maker: Create and Submit Drafts](./maker-guide)
- [Checker: Review and Approve](./checker-guide)
- [Rejecting and Resubmitting](./reject-and-resubmit)
- [Notifications](./notifications)
- [DAM Asset Approvals](./dam-assets)
- [Contact & Support](./contact-support)
