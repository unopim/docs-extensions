# Mapping Templates

A **Mapping Template** tells the XML Connector how to read your XML file — which tag represents a product, and how each XML field maps to a UnoPim attribute. You create a template once and reuse it across multiple import jobs.

Navigate to **XML Connector → Mapping Templates** in the sidebar to manage your templates.

## Create a New Template

Click the **Create Template** button in the top-right corner. A dialog will open asking for three things:

### Template Name

A human-readable name to identify this template (max 50 characters, must be unique).

### Upload XML File

Upload a sample XML file that represents the structure of your product data. The connector reads one product record from this file to extract the available fields.

> [!NOTE]
> Only `.xml` files are accepted. The file must be well-formed XML — malformed files will be rejected with an error message.

### Product Tag Name

Enter the XML tag that wraps a single product record. For example, if your XML looks like this:

```xml
<products>
    <product>
        <sku>ABC-001</sku>
        <name>Blue T-Shirt</name>
        <price>29.99</price>
    </product>
</products>
```

Enter `product` as the product tag name.

The connector also infers the parent (wrapper) tag automatically — in this example it would be `products`. You can override it if your wrapper tag differs.

After filling in the details, click **Upload**. The connector parses one product record from the file, extracts all the XML fields, and redirects you to the mapping editor.

## Edit the Mapping

The mapping editor shows every XML field found in your sample file alongside a dropdown to select the matching UnoPim attribute.

### Attribute Mapping

For each XML field on the left, select the UnoPim attribute it corresponds to. Required UnoPim attributes (marked as required in your catalog) must be mapped before you can save — the connector will display an error listing any required attributes that are still unmapped.

Example:

| XML Field | UnoPim Attribute |
|---|---|
| `sku` | SKU |
| `name` | Product Name |
| `price` | Price |
| `description` | Description |

### Other Mappings

Below the attribute mapping table you'll find the **Other Mappings** section:

**Categories**

Select the XML field that contains the category path for the product. The connector uses this field to assign products to UnoPim categories during import.

**Delimiter**

Choose the character used to separate multiple values within a single XML field (for multiselect attributes or multiple categories). Available options:

| Option | Character |
|---|---|
| Comma | `,` |
| Semicolon | `;` |
| Pipe | `\|` |
| Tab | `\t` |

The default is comma (`,`).

## Rename a Template

On the mapping editor page, click the **edit (pencil) icon** next to the template name at the top to rename it inline. Type the new name, then click the checkmark to save or the X to cancel.

## Activate / Deactivate a Template

A template must be **active** to appear in import job dropdowns. A template becomes active automatically when its mapping is saved for the first time.

To toggle a template's status:
- From the **Mapping Templates** listing, use the status toggle in the row.
- Or use the **Mass Update** action to activate or deactivate multiple templates at once.

> [!WARNING]
> An import job will fail at runtime if its selected template is deactivated after the job was created.

## Delete a Template

To delete a single template, click the **Delete** action in the template's row on the listing page.

To delete multiple templates at once, select them using the checkboxes and choose **Mass Delete** from the actions dropdown.

> Deleting a template does not affect import jobs that have already completed, but any pending or future jobs using that template will fail.

## Template History

Every change to a template's mapping is recorded in the change history. Click the **History** icon on the edit page to view a full audit trail of what was changed, when, and by whom.
