---
editLink: false
---

# Quick Export

Quick Export runs the same **Google Shopping Product Export** as a [wizard export](./wizard-export), but with no filter form - it pushes a connection's products to Merchant Center in one click, using sensible defaults.

- **Where** - the **Quick Export** button on a connection's row in **Google Shopping → Connections**. It appears only when **Quick Export Enabled** is on for that connection.
- **Requirements** - the connection must be both **Active** and **Authenticated**, and there must be at least one channel with an active locale. Missing prerequisites are reported before anything is queued.
- **Defaults used** - the first channel, that channel's first active locale (preferring one that matches the connection's content language), and the **Currency** set on the connection's [Attribute Mapping](./attribute-mapping) tab. If no currency is set there, the first currency of the channel is used. No category, family, status or time filters are applied, and the operation is always Create / Update.
- **Result** - a one-off export job is created and dispatched through the same pipeline as a wizard export. You land on the standard Data Transfer tracker, where you monitor it exactly like any other export.