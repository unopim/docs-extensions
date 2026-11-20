# UnoPim - Import Products from ERPNext

Importing ERPNext **Items** into UnoPim as products.

## Overview

This import job pulls ERPNext **Item** records into UnoPim as products.

The job type is listed as **ERPNext: Item → Products**.

## Prerequisites

Before importing products, complete the following:

1. [Set up your ERPNext credentials](./setup-credentials.md).
2. (Recommended) Run the [Import Attributes](./import-attributes.md) and [Import Categories](./import-categories.md) jobs first, so the attributes and categories the products reference already exist in UnoPim.

## How to Import Products

### Step 1: Go to Data Transfer

Navigate to the **Data Transfer** section from the main menu.

### Step 2: Open Imports

Click on **Imports** to view the available import jobs.

### Step 3: Create Import

Click **Create Import**, then enter a unique **Code** for the job.

**Example:** `erpnext_product_import_001`

### Step 4: Select Type

Select **ERPNext: Item → Products** as the import type.

### Step 5: Configure the Settings

In the job settings, configure the following:

| Setting | What it does |
| --- | --- |
| **Credential** | Select which ERPNext site to import from. *(required)* |
| **Channel** | The UnoPim channel imported product data is assigned to. Defaults to the default channel. |
| **Locale** | The language / locale imported product data is stored under. Defaults to the default channel's default locale. |
| **Currency** | The currency imported prices are stored under. Defaults to the base currency. |

### Step 6: Save Import

Click **Save Import** to store the import job.

### Step 7: Import Now

Click **Import Now** to run the job and pull ERPNext Items into UnoPim.

### Step 8: Monitor Progress

Track the job in the **Job Tracker**. Live **Created / Updated / Skipped** counts tick up as the job runs, and any errors appear in the log.

## Re-running an Import

You can re-run a product import at any time. Sync mappings keep each product's identity across runs, so re-syncs **update** existing UnoPim products instead of creating duplicates. Items whose ERPNext `modified` timestamp has not changed since the last import are skipped. Changed Items overwrite the imported values in UnoPim, even if the product was edited in UnoPim in the meantime.
