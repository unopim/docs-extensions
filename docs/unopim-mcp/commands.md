# Artisan Commands

| Command | What it does |
|---|---|
| `php artisan mcp:install` | Sets everything up. Run once after installing. |
| `php artisan mcp:start unopim-dev` | Starts the server for a local AI client. |
| `php artisan mcp:dev` | Shorthand for the line above. |
| `php artisan mcp:inspector unopim-dev` | Opens a test window to try the tools yourself. |
| `php artisan mcp:make plugin <Name>` | Creates a new plugin skeleton. |
| `php artisan mcp:make test <Package> <Class>` | Creates a test file for a class. |

## mcp:install

```bash
php artisan mcp:install
```

Publishes `config/mcp.php`, sets up OAuth, and clears your caches.

> [!WARNING]
> This overwrites `config/mcp.php`. Keep your settings in `.env` — see [Configuration](./configuration).

## mcp:start

```bash
php artisan mcp:start unopim-dev
```

Starts the local server. It will look like it's hanging — that's correct, it's waiting for your AI client. Your editor normally runs this for you.

> [!NOTE]
> Nothing else may print to the screen while this runs. A stray `dump()` left in your code will break the connection with no clear error.

## mcp:inspector

```bash
php artisan mcp:inspector unopim-dev
```

Opens a web page where you can browse the tools and run them by hand. The fastest way to check whether a problem is UnoPim's or your AI client's. Needs Node installed.

Useful options:

```bash
--host=0.0.0.0     # if you're on a remote or cloud machine
--no-auth          # skip the token prompt
```

## mcp:make

```bash
php artisan mcp:make plugin ShipStation
php artisan mcp:make plugin AdvancedPricing --type=core-extension
```

Creates a full plugin skeleton under `packages/Webkul/`. Three types are available: `connector` (the default, for integrations), `core-extension` and `generic`.

Afterwards, run `composer dump-autoload` and register the new provider in `bootstrap/providers.php`.

```bash
php artisan mcp:make test ShipStation Services/RateCalculator
```

Creates a test file for that class.

## Other useful commands

```bash
# OAuth keys, needed for remote connections
php artisan passport:keys

# Reload skills after editing one
php artisan cache:forget mcp.skills

# Apply setting changes
php artisan config:clear
```

## Next steps

- [Configuration](./configuration)
- [Troubleshooting](./troubleshooting)
