# Configuration

Settings live in `config/mcp.php`, published when you run `php artisan mcp:install`.

Most of them can be set in `.env` instead, which is the better place — `mcp:install` overwrites `config/mcp.php` if you run it again.

## Settings

| Add to `.env` | Default | What it does |
|---|---|---|
| `MCP_API_AUTH` | `true` | Requires a login for remote connections. Leave this on. |
| `MCP_RATE_LIMIT` | `60` | Maximum requests per minute, per tool. Raise it if your assistant works through large catalogs. |
| `MCP_AUDIT_LOGGING` | `true` | Records every change in your log. |
| `MCP_SKILLS_PATH` | `.ai/skills` | Where your [skills](./skills) live. |
| `MCP_ENABLE_CACHE` | `true` | Remembers your skills for speed. Turn off while writing them. |
| `MCP_CACHE_TTL` | `3600` | How long skills are remembered, in seconds. |

> [!CAUTION]
> Never set `MCP_API_AUTH=false` on a live site. It removes both the login **and** the permission checks from your public address, letting anyone who finds the URL change your catalog.

## File access

One setting isn't in `.env` — `allowed_paths` in `config/mcp.php`. It controls which folders the developer tools may read and write:

```php
'allowed_paths' => [
    base_path(),        // your project
    sys_get_temp_dir(), // temporary files
],
```

The defaults are sensible. Only add a folder if the assistant genuinely needs it, because anything listed here becomes readable and writable.

## For a live site

```dotenv
MCP_API_AUTH=true
MCP_AUDIT_LOGGING=true
```

Plus: serve over HTTPS, generate the OAuth keys with `php artisan passport:keys`, and check that nobody has the **Settings** permission unless they should. See [Security & Permissions](./security).

## For local development

```dotenv
MCP_ENABLE_CACHE=false
```

That's all you need — working locally doesn't involve logins or permissions.

## After changing anything

```bash
php artisan config:clear
```

Then restart your MCP server, since it reads the settings once when it starts.

## Next steps

- [Security & Permissions](./security)
- [Artisan commands](./commands)
