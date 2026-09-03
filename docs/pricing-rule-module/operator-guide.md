# Operator Guide

A **Rule Operator** is an admin user who runs saved pricing rules and verifies the results. This guide covers how to execute rules, monitor their progress, and read the logs they produce.

::: warning
Only users with the `pricingrulemodule.execute` permission can run rules. The Execute button and the play icon in the grid are hidden for users without this permission.
:::

## Running rules from the admin grid

Navigate to **Pricing Rule** in the sidebar to open the listing page. Two execution paths are available from the grid:

### Run a single rule

Click the **play** icon on the rule's row. The controller dispatches the `ApplyPriceRule` job to the queue and shows a confirmation flash message.

### Run multiple rules together

1. Select the checkbox on each rule you want to run.
2. Open the mass-action dropdown.
3. Choose **Mass Execute**.

Each selected rule is dispatched as its own job — they do not run sequentially or share state. If some selected rules are incomplete (missing conditions or actions), those are skipped. The response message reports how many rules were dispatched and how many were skipped.

## Running a rule from the rule editor

An **Execute** button appears in the page header while you are inside the rule editor (on both the Create and Edit screens). Clicking it dispatches the rule immediately without leaving the editor. This is useful for testing a rule right after saving new conditions or actions.

The button is disabled while a dispatch is in progress to prevent double submission.

## Running rules from the CLI

The module provides one Artisan command:

```bash
php artisan unopim:price-rule:run {rule_id}
```

Example:

```bash
php artisan unopim:price-rule:run 5
```

What the command does:

- Accepts one required argument: `rule_id`.
- Dispatches the `ApplyPriceRule` job to the queue.
- Prints a confirmation message in the terminal.

The command returns immediately — actual product updates happen asynchronously in the queue worker.

## What happens after execution

```
Operator triggers run (grid action / editor button / mass execute / CLI)
        ↓
Controller or command checks rule is executable (has conditions + actions)
        ↓
ApplyPriceRule job dispatched to queue
        ↓
ApplyPriceRule finds matching products using the rule's conditions
        ↓
Product IDs are split into chunks of 1,000
        ↓
Each chunk dispatches ApplyPriceRuleToProducts
        ↓
Chunk job writes the action value into each product's price attribute
        ↓
Execution log written at storage/logs/rule-tracker/{execution_id}/rule.log
```

Because everything runs through the queue, the queue worker **must** be active — without it, jobs sit unprocessed and no product values change.

## Monitoring execution

### Per-execution tracker logs

Every run creates its own log folder:

```text
storage/logs/rule-tracker/{execution_id}/rule.log
```

Open the latest folder to see what the run did — which products were matched, which attributes were updated, and any errors that occurred per product. Per-product failures are logged and skipped without aborting the rest of the batch.

### Default Laravel log

High-level messages also appear in `storage/logs/laravel.log` (or wherever your default channel writes). Use this to spot failed jobs or queue exceptions.

### Rule history tab

Each rule has a **History** tab in its editor. This tracks changes to the rule record itself (conditions/actions edited, code changed), not individual run results — useful when correlating "this rule was changed before today's run."

## Verifying a run

After a run completes:

1. Open one of the products you expected to be affected.
2. Switch to the channel, locale, and currency targeted by the rule's action.
3. Confirm the price attribute shows the new value.

If the value did not update, check the troubleshooting section below.

## Troubleshooting

### Rule runs but no products are updated

Check, in order:

1. The rule has both saved conditions **and** saved actions — incomplete rules are rejected at dispatch time.
2. The condition attribute names exactly match the attributes used on your products.
3. The chosen channel and locale match real product data.
4. The queue worker is running (`php artisan queue:work`).
5. The action attribute is a valid `price`-type attribute.

### Execution is rejected with an error

The Execute button shows an error flash if the rule is not executable. This happens when either conditions or actions are missing. Save both tabs in the rule editor before trying again.

### Rule execution starts but changes do not appear

Check:

1. The price value is being saved on the expected channel + locale + currency path.
2. The queue worker processed the job (check `storage/logs/laravel.log` for job failures).
3. No later process (import, another rule, an observer) is overwriting the value after the job completes.

### Condition matching feels too limited

Expected. The current version supports only:

- `Contain` — partial, case-insensitive match
- `Is Equal to` — exact, case-insensitive match

Operators like greater-than, less-than, range, or category-based matching are not available in the current release.

### The rule does not appear in the grid

Incomplete rules are hidden from the listing. If a rule was created with a code but conditions or actions were never saved, finish the editor tabs and save both — the rule will then appear.

## What operators cannot do

- Edit a rule's conditions or actions — that requires the `pricingrulemodule.edit` permission.
- Pause or cancel a queued run from the UI — once dispatched, stop the queue worker (or wait for the job to finish) to halt processing.
- Roll back a run automatically — there is no undo. Restore product prices manually or by running a corrective rule.

## Best practices

1. Always run a new rule against a known, small product set first before applying it to your full catalog.
2. Watch the queue worker (`php artisan queue:work`) when running large rules — failures show up immediately.
3. Review `storage/logs/rule-tracker/{execution_id}/rule.log` after large runs to confirm all products were processed.
4. Back up product price data before bulk runs in production.
5. Keep queue workers monitored under a process supervisor in production.
