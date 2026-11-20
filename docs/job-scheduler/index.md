# UnoPim Job Scheduler

Store Link: [View on Webkul Store](https://store.webkul.com/unopim-job-scheduler.html)

The **UnoPim Job Scheduler** lets you automate your import and export jobs so they run on their own - no need to manually trigger them every time. Set a schedule once and the system handles the rest.

<br>

<div align="center">
  <img src="./assets/intro-banner.png" alt="UnoPim Job Scheduler" width="100%" style="max-height:330px; object-fit:cover; border-radius:18px;" />
</div>

<br> 


Whether you need products exported to your store every morning, categories synced weekly, or a custom task running at a specific time, the Job Scheduler gives you full control from a simple admin panel inside UnoPim.

---

## What Can It Do?

Instead of logging in and running export or import jobs by hand, you define when they should run - daily, weekly, monthly, or at a custom time using a cron expression - and the scheduler fires them automatically at the right moment.

---

## Features

| Feature | Description |
|---|---|
| **Automated Scheduling** | Run import and export jobs automatically based on a configured schedule |
| **Cron Expression Support** | Create custom schedules using standard cron syntax for precise timing control |
| **Admin Panel Management** | Create, edit, and manage all scheduled jobs directly from the UnoPim admin panel |
| **Max Retries** | Set how many attempts a job gets automatically if it fails |
| **Cancel Executions** | Mark queued or running executions as cancelled |
| **Job History & Logs** | View a full history of past job executions and download logs for each run |
| **Notifications** | Get an email when a job completes successfully or fails |
| **Role-Based Access** | Control who can create or manage scheduled jobs using UnoPim's permission system |
| **Multi-Job Management** | Manage multiple scheduled jobs from one centralised place |
| **Simple Interface** | Easy to set up and use - no technical expertise required for common schedules |

---

## When Should You Use It?

The Job Scheduler is ideal when:

- You need to **export products to your store automatically** at a set time each day.
- You want to **import updated data from an external platform** on a regular schedule without manual effort.
- Your team handles **large catalogs** and running jobs manually is time-consuming.
- You want **peace of mind** that syncs are happening in the background even when no one is logged in.

---


## Requirements

| Requirement | Version |
|---|---|
| **PHP** | ^8.4.1 |
| **UnoPim** | 3.0.0 or newer |
| **webkul/data-transfer** | Bundled with UnoPim core |
| **Queue Driver** | Any (database, redis, sqs, etc.) |
| **Cron** | `php artisan schedule:run` every minute |
| **Queue Worker** | A worker on the `job-scheduler` queue |

> [!NOTE]
> UnoPim 2.x installs must use Job Scheduler 1.1.x. Version 1.2.0 and later need UnoPim 3.x and PHP 8.4.

---

## Permissions

Access is controlled under **Settings → Roles**. The Job Scheduler permission tree is:

| Permission | Allows |
|---|---|
| **Job Scheduler → Scheduled Jobs** | View the scheduled job list |
| ↳ **Create** | Create scheduled jobs |
| ↳ **Edit** | Edit jobs and change their status (including the **Update Status** mass action) |
| ↳ **Job Execute** | Run Now and Dry Run (no button for these in the current admin UI) |
| ↳ **Delete** | Delete jobs, single or in bulk |
| **Job Scheduler → Execution History** | View execution history and execution details |
| ↳ **Cancel** | **Cancel Execution**, **Cancel Selected**, and **Cancel All Running** |
| **Job Scheduler → Execution Logs** | View execution logs |

---

