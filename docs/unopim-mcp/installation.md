# Installation

Five steps. You'll need terminal access to your UnoPim server.

## 1. Add the package

Copy the package folder into your project:

```
packages/Webkul/MCP
```

## 2. Register the namespace

In your project's root `composer.json`, under `autoload` → `psr-4`:

```json
"autoload": {
    "psr-4": {
        "Webkul\\MCP\\": "packages/Webkul/MCP/src"
    }
}
```

## 3. Register the service provider

In `bootstrap/providers.php`:

```php
use Webkul\MCP\Providers\MCPServiceProvider;

return [
    // ...existing providers...
    MCPServiceProvider::class,
];
```

## 4. Run the install command

```bash
composer dump-autoload
php artisan mcp:install
```

This publishes `config/mcp.php`, sets up OAuth, and clears your caches.

> [!WARNING]
> Running `mcp:install` again will overwrite `config/mcp.php`. Keep your settings in `.env` instead — see [Configuration](./configuration).

## Check it worked

Start the server:

```bash
php artisan mcp:start unopim-dev
```

It should sit there quietly, waiting. That's correct — press `Ctrl+C` to stop it.

To see the actual tools, run the MCP Inspector:

```bash
php artisan mcp:inspector unopim-dev
```

Press **Connect**, open the **Tools** tab, then **List Tools**. You should see 25 tools:

<br>

![MCP Inspector showing the UnoPim tool list and a successful product search](./assets/connect/inspector-tools.png)

<br>

> [!TIP]
> The Inspector is the quickest way to tell whether a problem is with UnoPim or with your AI client's settings. If the Inspector works, UnoPim is fine.

## Connecting remotely?

If your assistant runs online rather than on your computer, generate the OAuth keys too:

```bash
php artisan passport:keys
```

Then follow [Connect Claude](./claude).

## Next steps

- [Connect Claude](./claude)
- [Connect Copilot, Cursor or Windsurf](./connect-a-client)
- [Set who can do what](./security)
