# Execution History

The **Execution History** section shows all scheduled jobs that have run in the system. It helps administrators track job activity, review execution results, and quickly identify failed or long-running jobs.

Open **Job Scheduler** from the UnoPim sidebar and click **Execution History** to view the list of executed jobs.

## What You Can See in Execution History

Each row in the grid represents one job execution. The following details are available:

| Column | Description |
|---|---|
| **Job Name** | Displays the name of the scheduled job, such as `Product Export` or `Category Export`. |
| **State** | Shows the execution status: **Pending**, **Queued**, **Running**, **Retrying**, **Completed**, **Failed**, **Cancelled**, or **Timed Out**. |
| **Trigger** | Indicates how the job was started: **Scheduled** (cron, including automatic retries), **Manual** (`php artisan job-scheduler:run --job=<code>`), **API**, or **Dependency**. |
| **Processed** | Shows how many records were processed during the execution. |
| **Failed** | Shows how many records failed during processing. |
| **Duration** | Displays how long the job took to complete. |
| **Started At** | Shows the date and time when the job started. |

![Execution History Grid](./assets/history/job-scheduler-history.png)

## View Job Execution Details

To inspect a specific job run:

1. Go to **Job Scheduler > Execution History**.
2. Find the job execution you want to review.
3. Click the **View** icon under the **Actions** column.

![View Icon](./assets/history/view-icon.png)

This opens the **Job Execution History Details** page, where you can review more information about that particular execution.

![Job Execution Details](./assets/history/job-scheduler-history-details.png)

## Cancel Executions

You can cancel executions that are **Pending**, **Queued**, **Running**, or **Retrying**:

- **Cancel All Running** - button at the top of the **Execution History** list. Cancels every non-finished execution of every job.
- **Cancel Selected** - mass action on the selected rows of the list.
- **Cancel Execution** - button on the execution details page, shown only while that execution is not finished.

![Cancel All Running Button](./assets/history/cancel-all-running-jobs.png)

These actions need the **Execution History → Cancel** permission.

> [!WARNING]
> Cancelling only changes the execution record to **Cancelled**. It does not stop an import or export that is already processing, and an execution that is still waiting in the queue is not skipped when the worker picks it up. To stop a run that is processing, stop or restart the `job-scheduler` queue worker.
