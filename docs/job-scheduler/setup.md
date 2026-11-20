# Creating a Scheduled Job

Once the Job Scheduler is installed, you'll find the **Job Scheduler** option in the left sidebar of your UnoPim dashboard. Click on it to expand the menu - you'll see three sub-sections:

![Job Scheduler Menu](./assets/setup/job-sch.png)

- **Scheduled Jobs** - view and manage all your scheduled jobs
- **Execution History** - see a record of past job runs
- **Execution Logs** - view detailed logs for each execution

Go to the **Scheduled Jobs** section and click **Create Scheduled Job** to set up a new automated job.

---

## General Settings

Fill in the following fields to define the job:

| Field | What to enter |
|---|---|
| **Name** | A descriptive name for the job (e.g., `Daily Category Export`) |
| **Code** | Auto-generated from the name - e.g., `daily_category_export`. You can change it if needed. Must be unique, max 100 characters. Used by `php artisan job-scheduler:run --job=<code>`. |
| **Type** | Select whether this is an **Import** or **Export** job |
| **Entity Type** | Choose the data type the job will work with - e.g., **Products** or **Categories**. The list contains every importer or exporter registered in UnoPim, including those added by connectors. |
| **Job Instance** | Select the existing import or export job you want to schedule |
| **Active** | Turn on to schedule the job. Turning it off stops scheduling without deleting the job, and marks this job's queued and running executions as **Cancelled**. |

![General Settings](./assets/setup/genral-settings.png)

> **Important:** The **Job Instance** list only shows jobs that already exist in UnoPim. Before scheduling a job here, make sure you've already created it under **Data Transfer → Imports** or **Data Transfer → Exports**. If you don't see the job in the list, create it there first and then come back.

---

## Execution Settings

These optional settings control how the job behaves when it runs:

| Setting | What it does |
|---|---|
| **Max Retries** | Total number of attempts, counting the first run (0-10, default 3). `3` means the first run plus up to 2 retries; `0` or `1` means no retry. |
| **Retry Delay (seconds)** | Base wait before a retry (0-3600, default 60). The delay doubles on each further retry: 60 s, 120 s, 240 s… |
| **Chunk Size** | Accepted values 10-5000 (default 100). Stored only; it is not applied to the import or export in the current version. The batch size comes from the UnoPim job instance. |
| **Timeout (seconds)** | Accepted values 60-86400 (default 3600). Stored only; it does not stop a run in the current version. The run time limit is the queue worker `--timeout`, see [Step 6](./installation#step-6-start-the-queue-worker). |

> [!NOTE]
> A retry is scheduled only when the run throws an error (for example a missing job instance or a crash). If the UnoPim import or export itself finishes in a failed state, the execution is marked **Failed** but no retry is scheduled.

![Execution Settings](./assets/setup/execution-settings.png)

---

## Schedule Settings

Define when and how often the job should run.

### Preset Schedules

Choose from a list of common schedule options:

| Preset | Cron Expression |
|---|---|
| Every Minute | `* * * * *` |
| Every 5 Minutes | `*/5 * * * *` |
| Every 15 Minutes | `*/15 * * * *` |
| Every 30 Minutes | `*/30 * * * *` |
| Hourly | `0 * * * *` |
| Daily at Midnight | `0 0 * * *` |
| Daily at 6 AM | `0 6 * * *` |
| Weekly on Monday | `0 0 * * 1` |
| Monthly | `0 0 1 * *` |
| **Custom** | Enter your own cron expression |

### Cron Expression

This field fills in automatically based on the preset you select. If you choose **Custom**, type your own cron expression directly into this field.

Only standard 5-part expressions (`minute hour day month weekday`) are accepted. 6-part expressions with seconds and macros such as `@daily` are rejected.

### Timezone

Select the timezone the schedule should follow. This ensures the job runs at the correct local time - especially important if your server and your team are in different time zones.

### Schedule Type

| Type | What it means |
|---|---|
| **Recurring** | The job runs repeatedly on the defined schedule - every day, every hour, etc. |
| **One-Time** | The job runs at the next time the cron expression matches. When the run finishes the job is set to inactive. If the run throws an error, the job stays active and runs again at the next match. |

![Schedule Settings](./assets/setup/schedule.png)

---

## Notification Settings

Set up email alerts so you always know when a job succeeds or fails.

| Setting | What it does |
|---|---|
| **Notification Email** | The email address where notifications will be sent. Defaults to the email of the admin creating the job. Leave empty to send no email. |
| **Notify on Success** | Sends an email when the run finishes |
| **Notify on Failure** | Sends an email when the run throws an error |

> [!NOTE]
> When either toggle is on, two extra emails are also sent for every run: one when it is queued and one when it starts running. Emails use UnoPim's mail settings (`MAIL_*` in `.env`) and are sent from the queue worker.

> [!WARNING]
> If the UnoPim import or export finishes in a failed state (for example invalid rows over the allowed limit), the email is sent through **Notify on Success** with the state `failed` in the subject. **Notify on Failure** alone does not cover that case.

![Notification Settings](./assets/setup/notification.png)

---

## Save the Job

Once all settings are configured, click **Save Job**. You are taken to the job's edit page. The scheduler will now run the job automatically at the defined time without any manual action.

From the **Scheduled Jobs** list you can edit or delete a job, delete jobs in bulk, or use the **Update Status** mass action to set several jobs active or inactive.

> [!NOTE]
> Jobs only run while the cron entry (`php artisan schedule:run`) and a `job-scheduler` queue worker are running. See [Installation](./installation#step-5-set-up-the-cron-entry).