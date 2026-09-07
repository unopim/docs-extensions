# Troubleshooting

> [!TIP]
> **Start here.** Run `php artisan mcp:inspector unopim-dev` and press **Connect**. If you see the tool list, UnoPim is working and the problem is in your AI client's settings. If you don't, it's on the UnoPim side.

## My editor won't connect

Check these in order:

1. **Does the server start on its own?** Run `php artisan mcp:start unopim-dev`. It should sit there quietly. If it errors, fix that first.
2. **Is the folder right?** The `cwd` in your editor's settings must be the folder containing `artisan`. This is the most common cause.
3. **Is something printing to the screen?** A `dump()` or `echo` left in your code will break the connection.
4. **Is it the right PHP?** Editors don't always use the same PHP as your terminal. Try the full path, like `/usr/bin/php8.4`.

## Claude can't connect remotely

- **Is your site public?** Claude connects from the internet. A local address won't work.
- **Have you generated the keys?** Run `php artisan passport:keys`. Without them the login can't complete.
- **Is the address right?** It's `https://your-site/mcp/unopim` — note there's no `/api/` in it.

## "Forbidden" when it tries to do something

The account you connected with doesn't have permission for that action. Open **Settings → Roles** in UnoPim and grant it — see [Security & Permissions](./security) for what each permission covers.

If *everything* is forbidden, the account probably has no catalog permissions at all.

## "Rate limit exceeded"

More than 60 requests in a minute for the same tool. Either wait, or raise the limit in `.env`:

```dotenv
MCP_RATE_LIMIT=120
```

It also helps to ask the assistant to work in batches rather than one product at a time.

## It said it worked, but nothing changed

When updating a product, only its attribute values are saved. Its type and attribute family are fixed when the product is created — change those in the admin panel.

## My new skill doesn't show up

1. Clear the cache: `php artisan cache:forget mcp.skills`
2. Restart the MCP server — skills load when it starts.
3. Check the file is named exactly `SKILL.md`.
4. Check it has a `name` in the block at the top. Without one it's skipped.

Files with broken formatting are skipped silently, so if it still doesn't appear, look closely at the `---` block.

## A command was refused

The developer tools only run `php artisan` and `composer`. Anything else — including combined commands with `;` or `|` — is blocked on purpose. Run those yourself.

## A file couldn't be read or written

The developer tools can only reach your project folder and the temp folder. To allow another location, add it to `allowed_paths` in `config/mcp.php` — see [Configuration](./configuration).

## Settings changes have no effect

```bash
php artisan config:clear
```

Then restart the MCP server. It reads its settings once at startup.

## Starting fresh

If you've lost track of what's set:

```bash
php artisan config:clear
php artisan cache:clear
php artisan cache:forget mcp.skills
php artisan mcp:inspector unopim-dev
```

If the Inspector connects and lists tools, UnoPim is fine — go back and check your AI client's settings.

Still stuck? [Contact Support](./contact-support).
