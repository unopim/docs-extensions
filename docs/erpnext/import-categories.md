# UnoPim - Import Categories from ERPNext

Importing ERPNext **Item Groups** into UnoPim as categories.

## Overview

This import job pulls ERPNext **Item Group** records into UnoPim as categories.

The job type is listed as **ERPNext: Item Group → Categories**.

## Prerequisites

Before importing, make sure you have [set up your ERPNext credentials](./setup-credentials.md) in UnoPim.

## How to Import Categories

### Step 1: Go to Data Transfer

Navigate to the **Data Transfer** section from the main menu.

### Step 2: Open Imports

Click on **Imports** to view the available import jobs.

### Step 3: Create Import

Click **Create Import**, then enter a unique **Code** for the job.

**Example:** `erpnext_category_import_001`

### Step 4: Select Type

Select **ERPNext: Item Group → Categories** as the import type.

### Step 5: Choose the Credential

In the job settings, select the **Credential** to import from. *(required)*

### Step 6: Save Import

Click **Save Import** to store the import job.

### Step 7: Import Now

Click **Import Now** to run the job and pull ERPNext Item Groups into UnoPim.

### Step 8: Monitor Progress

Track the job in the **Job Tracker**. Live **Created / Updated / Skipped** counts tick up as the job runs, and any errors appear in the log.

