# Skills & Custom Tools

A **skill** is a set of instructions you write once and reuse. If you keep typing the same request, save it as a skill and just call it by name.

Skills are plain Markdown files. No coding needed.

## Create a skill

Add a folder under `.ai/skills/` in your project with a file called `SKILL.md`:

```
.ai/
└─ skills/
   └─ seasonal-move/
      └─ SKILL.md
```

Then write it:

````markdown
---
name: seasonal-move
description: Move a season's products into a new category and clean up the old one
parameters:
  properties:
    season:
      type: string
      description: The season to move, for example "winter"
    target_category:
      type: string
      description: Code of the destination category
  required:
    - season
    - target_category
---

# Instructions

1. Check the target category exists.
2. Find all products for the given season.
3. Move them across in batches of 50.
4. Report how many moved and list anything that failed.
````

Restart your MCP server and the skill is available as `execute_seasonal_move`.

## The two fields that matter

| Field | Notes |
|---|---|
| `name` | Required. Use lowercase with hyphens, like `seasonal-move`. A skill without a name is ignored. |
| `description` | This is what the assistant reads when deciding whether to use your skill. Write it as *"use this when…"*. |

`parameters` is optional. If you use it, keep the `properties` and `required` structure shown above — that's what tells the assistant which values to ask you for.

## Using it

Just ask for it by name:

> *"Run the seasonal-move skill for winter into seasonal-winter."*

## If a new skill doesn't appear

Skills are remembered for an hour to keep things fast. After editing one:

```bash
php artisan cache:forget mcp.skills
```

Then restart your MCP server. While you're actively writing skills, turn the cache off instead by adding this to `.env`:

```dotenv
MCP_ENABLE_CACHE=false
```

Also check the file is named exactly `SKILL.md` and that it has a `name`. Files with broken formatting are skipped without an error.

> [!CAUTION]
> Every skill in that folder becomes something the assistant can run. Review skills like you would review code, and don't let untrusted people write into `.ai/skills/`.

## Need more than a skill?

Skills give instructions. If you need real logic — a calculation, a call to another system — a developer can add a PHP tool to the package instead. The existing tools in `packages/Webkul/MCP/src/Tools/` are the pattern to follow: each one declares a name, a description, and the inputs it accepts, then gets listed in the tool registry.

## Next steps

- [The full tool list](./tool-reference)
- [What you can ask for](./workflows)
