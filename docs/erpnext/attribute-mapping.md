# Attribute Mapping

Map UnoPim product attributes to ERPNext **Item** fields before exporting products.

## Overview

When you export products to ERPNext, UnoPim uses your attribute mapping to decide which product data is sent to each ERPNext Item field. Configure these mappings once so every export uses the same field alignment.

Open the mapping screen from **ERPNext → Attribute Mappings**.

## How the mapping screen works

The attribute mapping screen has three columns:

| Column | Purpose |
| --- | --- |
| **ERPNext Item Field** | Destination field on the ERPNext Item where UnoPim data is written during export. |
| **UnoPim Attribute** | Source attribute in UnoPim. Choose the attribute that should populate each ERPNext field. |
| **Fixed Value** | Optional constant value applied to an ERPNext field for every exported product, used when no attribute is mapped. |

A **required** ERPNext field is satisfied when **either** an attribute is mapped **or** a fixed value is provided - the two are interchangeable sources for the same field. Required fields are listed first on the screen.

> [!WARNING]
> **Item Code** and **Item Name** must be mapped to an attribute. A fixed value is ignored for these two fields, because every Item needs its own code and name.

## Mappable Item fields

The following ERPNext Item fields can be mapped to UnoPim attributes out of the box:

| ERPNext field | Compatible attribute types | Required | Notes |
| --- | --- | :---: | --- |
| **Item Code** | Text | ✅ | The unique product identifier in ERPNext. |
| **Item Name** | Text | ✅ | Human-readable item name shown in ERPNext. |
| **HSN/SAC Code** | Text, Select | ✅ | HSN/SAC tax classification code (mandatory on India-localized ERPNext instances). |
| **Description** | Text, Textarea | | Long product description. |
| **Standard Selling Rate** | Price, Number | | Default selling price. |
| **Valuation Rate** | Price, Number | | Default valuation / cost. |
| **Weight per Unit** | Number, Price | | Numeric weight per unit. |
| **Weight UOM** | Select, Text | | Unit for weight (e.g. Kg, lb). |
| **Disabled** | Boolean | | When true, the item is hidden in ERPNext transactions. |
| **Is Stock Item** | Boolean | | Whether stock is tracked for this item. |
| **Is Sales Item** | Boolean | | Eligible to appear on Sales Orders / Invoices. |
| **Is Purchase Item** | Boolean | | Eligible to appear on Purchase Orders / Invoices. |
| **Minimum Order Qty** | Number | | Smallest quantity that can be ordered. |
| **Safety Stock** | Number | | Minimum stock kept on hand. |
| **Lead Time (days)** | Number | | Days needed to procure / produce. |
| **Shelf Life (days)** | Number | | Days before expiry for perishable items. |
| **Country of Origin** | Text, Select | | Country of origin code (ISO). |

> **Note:** **Has Variants** is not mappable. It is set automatically for configurable products (see [Export Products](./export-products.md#exporting-products-with-variations)).

> **Note:** The **Item Group** is normally resolved from the product's first category via the category sync mappings - you don't map it here. A fallback Item Group (`All Item Groups` by default) is used when no category is set.

## Configure attribute mapping

### Step 1 - Open attribute mapping

Navigate to **ERPNext → Attribute Mappings**.

### Step 2 - Map ERPNext fields to UnoPim attributes

For each ERPNext Item field you want to export:

1. Find the **ERPNext Item Field** row.
2. Choose the matching **UnoPim Attribute** from the dropdown. Only attributes whose type is compatible with the field are listed.
3. Optionally enter a **Fixed Value** if every exported product should use the same constant for that field (useful for export-only fields, or to satisfy a required field without a dedicated attribute).

### Step 3 - Save the mapping

Click **Save** to store your configuration. New product exports will use this mapping.

> [!NOTE]
> A product export fails with an error if no attribute mapping has been saved.

