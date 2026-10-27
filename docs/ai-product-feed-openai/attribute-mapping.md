# Attribute Mapping

![Attribute Mapping card listing every OpenAI feed field with a dropdown of UnoPim attributes](./images/configuration-attribute-mapping.png)

Here you tell the extension **which UnoPim attribute holds each piece of information**. Every dropdown lists the attributes in your catalog. Choose *Skip this field* (or leave it empty) to leave that field out of the feed.

| Feed field | What to map | Notes |
|---|---|---|
| **Product Title** \* | Your product name attribute (usually `name`) | Max 150 characters. Falls back to the SKU if empty. |
| **Description** \* | Your long description | HTML is removed. Max 5,000 characters. |
| **Brand** \* | Brand or manufacturer | Max 70 characters. |
| **Price** \* | Your price attribute | Products with no usable price are excluded. |
| **Sale / Special Price** | Your special price attribute | Only exported when it is **lower** than the regular price. |
| **Image / Gallery Attribute** | An image or gallery attribute | The first image is the main image. The rest become additional images. |
| **Weight** | A weight attribute | Measurement attributes carry their own unit. Plain numbers use *Weight Unit*. |
| **Weight Unit** | Type the unit: `kg`, `g`, `lb` or `oz` | Used only when the weight value has no unit of its own. |
| **Color** | Your color attribute | For configurable products, use the color **super attribute**. |
| **Size** | Your size attribute | For configurable products, use the size **super attribute**. |
| **Material** | Material attribute | Max 100 characters. |
| **GTIN / EAN / UPC** | Barcode attribute | Must be 8, 12, 13 or 14 digits with a valid check digit. Invalid codes are left blank rather than sent wrong. |
| **Manufacturer Part No.** | MPN attribute | Max 70 characters. |
| **Gender** | Gender attribute | Values like *men*, *women's*, *unisex* become `male`, `female` or `unisex`. |
| **Age Group** | Age group attribute | Values like *baby*, *kids*, *adults* become `newborn`, `infant`, `toddler`, `kids` or `adult`. |
| **Condition** | Condition attribute | `new`, `refurbished` or `used`. Defaults to `new` when unmapped or unrecognised. |
| **Shipping Price** | A price attribute | Quoted in the same currency as the product price. `0` means free shipping. |
| **Length**, **Width**, **Height** | Dimension attributes | At least **two** of the three must have values, or dimensions are skipped. |
| **Dimensions Unit** | Choose `in`, `cm`, `ft`, `m` or `mm` | Used when the dimension values have no unit of their own. |
| **Review Count** | Number of reviews | Must be a whole number of 0 or more. |
| **Star Rating (0-5)** | Average rating | Only sent when the review count is above 0. |

> [!TIP]
> **Configurable products.** Map **Color** and **Size** to the same attribute codes you use as super attributes. Each variant then gets its own row, with its own price, image and stock, grouped under one `group_id`. That lets ChatGPT show a single product with a variant picker.

> [!NOTE]
> Values are read in this order: channel + locale specific, then channel specific, then locale specific, then common. Select and multiselect values are exported as their **option labels** in the feed locale (e.g. "Rouge" for a French feed), not as option codes.

---

[← Store Information](./store-information.md) · [ChatGPT Commerce Flags →](./commerce-flags.md)
