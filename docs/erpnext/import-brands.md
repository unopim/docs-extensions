# UnoPim - Import Brands from ERPNext

Imports ERPNext **Brand** records as options of your UnoPim brand attribute.

The job type is listed as **ERPNext: Brand → Brand options**.

**Prerequisites:** set up your [credentials](./setup-credentials.md) and choose the brand attribute in Brand Mapping (**ERPNext → Credentials → Edit → ERPNext Attribute Mapping**).

## Steps

1. Go to **Data Transfer → Imports** and click **Create Import**.
2. Enter a unique **Code** and select **ERPNext: Brand → Brand options** as the type.
3. Set the filters below, then click **Save changes**.
4. Click **Import Now** to run the job.

![Create Import](./assets/import/Create-Import-Brand.png)

## Filters

| Setting | Purpose |
| --- | --- |
| **Credential** | ERPNext site to import from. *(required)* |


## Track the Job

Follow progress in **Data Transfer → Job Tracker**, which shows the created / updated counts and a downloadable log.

![Job Tracker](./assets/import/Job-Tracker-brand-import.png)
