# What You Can Ask For

Real examples you can type straight into your assistant.

> [!TIP]
> Start a session with *"Read the UnoPim catalog schema first."* This tells the assistant which of **your** attributes it can search on, and stops it guessing at field names.

## Finding things

> *"List every product in Electronics with no value for voltage."*

> *"Which products were created this week without a French description?"*

> *"Show me all products whose SKU starts with HALDEN."*

## Making changes

> *"Create a Material attribute with the options Cotton, Silk and Wool."*

> *"Write a short description for each of these 20 products and save them."*

> *"Move everything in Winter Wear into the new Seasonal › Winter category."*

> [!TIP]
> Ask for a sample before a big change: *"Show me what you'd write for the first three, then stop."* Review those, then let it continue.

## Settings

> *"Does the French locale exist? If not, add it and enable it for the B2C channel."*

> *"Add the Swedish krona as a currency."*

## Checking imports

> *"Did last night's product import finish? What failed?"*

You'll get the row counts and the actual errors, rather than having to dig through a log.

## For developers

> *"Scaffold a connector plugin called ShipStation."*

> *"Read the ShipStation service provider and add route loading."*

> *"Run php artisan migrate and tell me what changed."*

> *"Show me the last 100 log lines and what's throwing."*

## Reports

> *"How complete are the Lighting products for the B2C channel? Which three attributes are missing most often?"*

## What it isn't for

- **Moving thousands of products.** Changes happen in batches of 50, so a full migration is slow. Use UnoPim's own import and export instead.
- **Scheduled jobs.** The assistant only acts when you ask. For recurring work, use the Job Scheduler extension.
- **Anything the account can't do.** The assistant has the same permissions as the person who connected it.

## Getting better answers

- **Keep changes under 50 records at a time.** That's the limit per request, and smaller batches give clearer errors.
- **Ask what it searched for.** If a result looks wrong, *"what filter did you use?"* usually shows a wrong field name straight away.
- **Repeating yourself? Save it as a skill.** If you've typed the same instructions twice, write them once — see [Skills](./skills).

## Next steps

- [The full tool list](./tool-reference)
- [Save your own instructions as a skill](./skills)
