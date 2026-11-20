# UnoPim - Import Attributes from ERPNext

Importing ERPNext **Item Attributes** and their values into UnoPim as attributes.

## Overview

This import job pulls ERPNext **Item Attributes** - along with their values - into UnoPim as attributes and attribute options.

The job type is listed as **ERPNext: Item Attribute → Attributes**.

## Prerequisites

Before importing, make sure you have [set up your ERPNext credentials](./setup-credentials.md) in UnoPim.

## How to Import Attributes

### Step 1: Go to Data Transfer

Navigate to the **Data Transfer** section from the main menu.

### Step 2: Open Imports

Click on **Imports** to view the available import jobs.

### Step 3: Create Import

Click **Create Import**, then enter a unique **Code** for the job.

**Example:** `erpnext_attribute_import_001`

### Step 4: Select Type

Select **ERPNext: Item Attribute → Attributes** as the import type.

### Step 5: Choose the Credential

In the job settings, select the **Credential** to import from. *(required)*

### Step 6: Save Import

Click **Save Import** to store the import job.

### Step 7: Import Now

Click **Import Now** to run the job and pull ERPNext Item Attributes into UnoPim.

### Step 8: Monitor Progress

Track the job in the **Job Tracker**. Live **Created / Updated / Skipped** counts tick up as the job runs, and any errors appear in the log.

