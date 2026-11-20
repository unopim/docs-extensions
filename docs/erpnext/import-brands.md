# UnoPim - Import Brands from ERPNext

Importing ERPNext **Brand** records into the UnoPim brand attribute.

## Overview

This import job pulls ERPNext **Brand** records into UnoPim as options of your chosen brand attribute.

The job type is listed as **ERPNext: Brand → Brand options**.

## Prerequisites

- [Set up your ERPNext credentials](./setup-credentials.md) in UnoPim.
- Choose which UnoPim attribute represents the brand in [Brand Mapping](./other-mappings.md#brand-mapping). Imported brands become options of that attribute.

## How to Import Brands

### Step 1: Go to Data Transfer

Navigate to the **Data Transfer** section from the main menu.

### Step 2: Open Imports

Click on **Imports** to view the available import jobs.

### Step 3: Create Import

Click **Create Import**, then enter a unique **Code** for the job.

**Example:** `erpnext_brand_import_001`

### Step 4: Select Type

Select **ERPNext: Brand → Brand options** as the import type.

### Step 5: Choose the Credential

In the job settings, select the **Credential** to import from. *(required)*

### Step 6: Save Import

Click **Save Import** to store the import job.

### Step 7: Import Now

Click **Import Now** to run the job and pull ERPNext Brands into UnoPim.

### Step 8: Monitor Progress

Track the job in the **Job Tracker**. Live **Created / Updated / Skipped** counts tick up as the job runs, and any errors appear in the log.

