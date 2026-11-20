# Connector Settings - Tags Export

When you export products from UnoPim to Shopify, any tags associated with your products come along too. This settings page gives you control over **how those tags are formatted** when they appear in Shopify.

To access this, click the **Shopify icon** in the left sidebar and go to **Settings**.

![Shopify Connector Settings](./images/settings.png)

---

## Tag Export Options

### Named Tags

By default, only the tag **value** is exported - for example, `Cotton`.

**Do you want to pull tags as Named Tags** sends each tag as `Attribute label:attribute type:value`, for example `Material:select:Cotton`. It applies only while the next option is off.

---

### Pull Attribute Name in Tags

**Do you want to pull through the attribute name as well in tags?** sends the attribute name and value together as a single tag - for example `Material: Cotton` instead of `Cotton`. This option works on its own and takes precedence over **Named Tags**.

This is especially useful if you export tags from multiple attributes and want to easily tell them apart inside Shopify.

---

### Attribute Name Separator

When **Pull Attribute Name in Tags** is on, choose how the attribute name and value are joined:

| Separator | Example output |
|---|---|
| **Colon** ( `:` ) (default) | `Material: Cotton` |
| **Dash** ( `-` ) | `Material- Cotton` |
| **Space** ( ` ` ) | `Material Cotton` |

Choose whichever format fits your store's conventions or makes the tags easiest to read in Shopify admin.

![Tag Export Options](./images/connector-setting.png)

> **Tip:** The colon format (`Material: Cotton`) tends to be the most readable at a glance, especially when browsing tags across a large product catalog.

---

## Other Settings

**Value for Option Name as Attribute Label (By Default Attribute Code)** - for configurable products, Shopify variant option names are the variant attribute codes (for example `color`). Turn this on to send the attribute label instead (for example `Color`), in the UnoPim locale mapped to the store's primary Shopify locale.
