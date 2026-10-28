# Watch progress

Background translation jobs show up in **Settings > Data Transfer > Tracker**.

![Watch progress on the Tracker page](./images/watch-progress.png)

All DeepL jobs are listed under one job named **deepl_translation**. Each row shows:

- Status - pending / processing / completed / failed.
- A progress counter.
- A summary when it finishes (*Records Created / Updated / Deleted*).

## While a job is running

Open a running job and you'll see the standard processing box - the same one Import and Export use - titled *DeepL Translation In Process*.

<!-- TODO: capture screenshot - tracker-processing.png - processing box on a running DeepL job -->

## Download the log

Every job writes its own log. Open the job and click **Download log file**. It lists, product by product, what was updated and why something was skipped - for example:

```
Product #42 (sku=ABC): updated - name=[default/fr_FR], description=[default/de_DE]
Product #43 (sku=DEF): not updated - no translatable source content found for the configured (channel, locale).
Product #44 (sku=GHI): not updated - all writes skipped - target_already_filled=4.
```

## What creates a row

| Translation flow | Rows it creates |
|--|--|
| [Translate many products](./bulk-translate) | One row for the whole run. |
| [Translate one product](./product-wizard) | One row per target channel. |
| [After import](./auto-translate) | One row for the imported batch. |
| [After save](./auto-translate) | One row per saved product. |
| [AI agent](./agentic-pim) | One row per source field. |

## Notifications

When a job finishes you get a notification in the bell icon. Click it to open the job in the Tracker.

- *DeepL translation completed* - *X product(s) updated.*
- *DeepL translation failed* - with the error message.

The notification goes to the admin who started the job. Jobs that run on their own (such as after an import) notify every admin with full access.

## When jobs are stuck on *queued*

The background worker isn't running. Ask your developer to start it (`php artisan queue:work`) or to check Supervisor / Horizon in production. Without it, no translation job ever runs.
