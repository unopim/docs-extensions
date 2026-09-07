# Tool Reference

The 25 tools your assistant can use. You won't call these by hand — the assistant picks them — but it helps to know what's available.

## How it works

- **Searching** returns 25 results at a time, up to 100. The assistant pages through the rest automatically.
- **Changing** happens in batches of up to 50 records. If one record fails, the whole batch is undone, so you never end up half-changed.
- **Creating vs updating** is automatic. The assistant is matched on SKU for products, or the code for everything else.

## Catalog

| Tool | What it does |
|---|---|
| `get_catalog_schema` | Lists which of your attributes can be searched on. Always used first. |
| `search_products` | Finds products by any filter. |
| `get_product` | Full details for one product, including its completeness score. |
| `upsert_products` | Creates or updates products. |
| `search_categories` | Finds categories. |
| `upsert_categories` | Creates or updates categories. |
| `search_attributes` | Finds attributes. |
| `upsert_attributes` | Creates or updates attributes, with their options. |
| `search_attribute_options` | Finds the options of a dropdown attribute — colours, sizes. |
| `search_families` · `upsert_families` | Manages attribute families. |
| `search_attribute_groups` · `upsert_attribute_groups` | Manages attribute groups. |

## Settings

| Tool | What it does |
|---|---|
| `search_settings` | Finds channels or locales. |
| `upsert_settings` | Creates or updates channels and locales. |
| `search_currencies` | Finds currencies. |
| `upsert_currencies` | Creates or updates currencies. |

## Imports and exports

| Tool | What it does |
|---|---|
| `search_jobs` | Finds your import and export jobs. |
| `get_job_execution` | Shows how a run went — rows processed, rows rejected, and the errors. |

## Developer tools

These need the **Settings** permission. See [Security & Permissions](./security).

| Tool | What it does |
|---|---|
| `dev_tools` | Reads and writes files, runs Artisan and Composer commands, scaffolds plugins and tests. |
| `run_skill` | Runs one of your saved [skills](./skills). |
| `get_app_info` | PHP and Laravel versions, and which packages are installed. |
| `get_database_schema` | Lists tables and their columns. |
| `run_database_query` | Runs a read-only `SELECT`. It cannot change anything. |
| `read_logs` | Shows the most recent log entries. |

## Searching by filter

Every search accepts filters made of a **field**, an **operator** and a **value**:

| Operator | Means |
|---|---|
| `=` | Equals |
| `!=` | Does not equal |
| `IN` | Is one of |
| `NOT IN` | Is none of |
| `CONTAINS` | Contains the text |
| `STARTS WITH` | Begins with |
| `ENDS WITH` | Ends with |
| `>` `<` | Greater / less than |

For example, *"products whose SKU starts with halden"* becomes:

```json
{ "field": "sku", "operator": "STARTS WITH", "value": "halden" }
```

> [!NOTE]
> You can only filter on attributes marked **filterable** in UnoPim. That's why the assistant reads the catalog schema first — it tells it which fields are available on your instance.

## Worth knowing

- **Updating a product changes its values only.** Its type and attribute family are set when it's created and can't be changed this way — use the admin panel.
- **Variant groups can't be created here.** Build those in UnoPim's variant editor.
- **Currency names come from the currency code**, so setting a name has no effect.

## Extras

The assistant also gets a **catalog summary** it can read at any time (total products, categories and attributes), and a built-in **catalog analysis** it can run to look for missing data or inconsistencies.

## Next steps

- [What you can ask for](./workflows)
- [Add your own tools](./skills)
