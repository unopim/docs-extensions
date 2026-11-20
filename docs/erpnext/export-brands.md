# UnoPim - Export Brands to ERPNext

Exporting the options of your UnoPim brand attribute to ERPNext as **Brand** records.

## Overview

This export job pushes the options of your chosen UnoPim brand attribute into ERPNext as **Brand** records.

The job type is listed as **ERPNext: Brand options → Brand**.

## Prerequisites

- [Set up your ERPNext credentials](./setup-credentials.md) in UnoPim.
- Choose which UnoPim attribute represents the brand in [Brand Mapping](./other-mappings.md#brand-mapping). The brand export reads its options from that attribute.

## How to Export Brands

### Step 1: Go to Data Transfer

Navigate to the **Data Transfer** section from the main menu.

### Step 2: Open Exports

Click on **Exports** to view the available export jobs.

### Step 3: Create Export

Click **Create Export**, then enter a unique **Code** and **Label** for the job.

### Step 4: Select Type

Select **ERPNext: Brand options → Brand** as the export type.

### Step 5: Choose the Credential

In the job filters, select the **Credential** that points to the site you want to export to.

### Step 6: Save

Click **Save** to store the export job.

### Step 7: Export Now

Click **Export Now** to run the job and push your brand options to ERPNext.

### Step 8: Monitor Progress

Track the job in the **Job Tracker**. Live **Created / Updated / Skipped** counts tick up as the job runs, and any errors appear in the log.

