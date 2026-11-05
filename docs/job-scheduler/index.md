# UnoPim Job Scheduler

Store Link: [View on Webkul Store](https://store.webkul.com/unopim-job-scheduler.html)

The **UnoPim Job Scheduler** runs your import and export jobs automatically. Set the schedule once, for example *every day at midnight*, and UnoPim runs the job at that time without anyone clicking **Run**.

<br>

<div align="center">
  <img src="./assets/intro-banner.png" alt="UnoPim Job Scheduler" width="100%" style="max-height:330px; object-fit:cover; border-radius:18px;" />
</div>

<br>

---

## How It Works

1. **Create** an import or export profile in **Data Transfer** (as usual).
2. **Schedule** it in **Job Scheduler**: choose when and how often it should run.
3. **Relax**: the job runs on its own. Check the results in **Execution History** and **Execution Logs**.

---

## Features

| Feature | What you get |
|---|---|
| **Automatic runs** | Import and export jobs run on a schedule |
| **Easy presets** | Hourly, Daily, Weekly, Monthly, or your own cron expression |
| **Recurring or One-Time** | Repeat a job, or run it only once |
| **Timezone support** | Jobs run at the right local time |
| **Auto retry** | Failed runs are retried automatically |
| **Email alerts** | Get an email when a job succeeds or fails |
| **History and logs** | See every run with row counts, duration and step-by-step logs |
| **Cancel running jobs** | Stop stuck jobs with one click |
| **Role-based access** | Choose which users can create, run or cancel jobs |

---

## Requirements

| Requirement | Version |
|---|---|
| **UnoPim** | 3.0 or newer (tested on **3.1.3**) |
| **PHP** | 8.4.1 or newer |
| **Cron** | One server cron entry (see [Installation](./installation)) |
| **Queue worker** | Any queue driver: database, redis, sqs, and so on |
