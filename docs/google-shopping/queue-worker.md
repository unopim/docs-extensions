---
editLink: false
---

# Queue Worker

Product exports and AI category mapping run on UnoPim's queue, each on its own named queue. The connector ships a single command that works all of them together:

```bash
php artisan google-shopping:queue:work
```

A plain `php artisan queue:work` only processes the default queue and silently leaves the connector's other queues unworked, so use the command above.

Common options (passed straight through to Laravel's worker):

| Option | Purpose |
|---|---|
| `--tries=3` | Attempts before a job is marked failed. |
| `--timeout=60` | Seconds a single job may run. |
| `--stop-when-empty` | Exit once every queue is drained (useful in one-shot runs). |
| `--once` | Process only the next job, then exit. |
| `--queue=` | Work this comma-separated list of queues instead of the connector's queues (`default`, `google-shopping-ai-mapping`, `google-shopping-realtime`). |
| `--include-stale` | Also work exports left on the old per-job `google-shopping-export-*` queues by earlier versions. Use it once after upgrading. |

In production, run the command under a process supervisor (Supervisor, systemd) so the worker restarts after crashes or deploys, and so export batches keep draining without manual intervention.

After upgrading the connector or changing its configuration, run `php artisan queue:restart` so running workers load the new code and values.
