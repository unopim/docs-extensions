# Extending DAM

DAM exposes several extension points so you can add behaviour without forking the package or editing its files. This page is for developers building on top of DAM.

---

## View Render Events

DAM's main asset screen is peppered with `view_render_event` hooks. Listen to one and your Blade output is injected at that exact point — no view overrides, no publishing.

| Event | Where it renders |
|---|---|
| `unopim.dam.admin.main.before` | Before the entire DAM page |
| `unopim.dam.admin.main.after` | After the entire DAM page |
| `dam.admin.main.form.before` | Before the main form wrapper |
| `dam.admin.main.form.after` | After the main form wrapper |
| `dam.admin.main.form.directory.before` | Before the directory tree panel |
| `dam.admin.main.form.directory.after` | After the directory tree panel |
| `dam.admin.main.form.grid.before` | Before the asset grid |
| `dam.admin.main.form.grid.after` | After the asset grid |
| `unopim.admin.dam.assets.list.before` | Before the asset list |
| `unopim.admin.dam.assets.list.after` | After the asset list |

Register a listener in your own package's service provider:

```php
use Illuminate\Support\Facades\Event;

Event::listen('dam.admin.main.form.grid.before', function ($viewRenderEventManager) {
    $viewRenderEventManager->addTemplate('my-package::dam.grid-banner');
});
```

> [!TIP]
> `dam.admin.main.form.grid.before` is the usual place for a custom toolbar or a banner above the gallery. `dam.admin.main.form.directory.after` suits anything that belongs alongside the folder tree.

---

## DAM Events

DAM dispatches events around the actions that change data, so you can sync to an external system, write an audit trail, or invalidate a cache.

| Event | Fired when | Payload |
|---|---|---|
| `dam.asset.update.before` | Immediately before an asset is updated | Asset ID |
| `dam.asset.update.after` | Immediately after an asset is updated | Asset ID |
| `dam.asset.delete.before` | Before an asset is deleted | Asset ID |
| `dam.asset.delete.after` | After an asset is deleted | Asset ID |
| `dam.asset.property.delete.before` | Before a property is deleted | Property ID |
| `dam.asset.property.delete.after` | After a property is deleted | Property ID |
| `core.model.proxy.sync.tag` | Whenever an asset's tags change | `old_values`, `new_values`, `model` |

```php
Event::listen('dam.asset.update.after', function ($assetId) {
    // push the change to a downstream system
});
```

The tag event carries the before and after tag names, which is what DAM's own [history tracking](./directory-and-asset-management.md) uses — handy if you need to diff rather than just react.

### Triggering events without changing data

There is a **mass update** endpoint that changes nothing at all:

```
POST /admin/dam/assets/mass-update
```

For each asset ID you pass in `indices`, it fires `dam.asset.update.before` and `dam.asset.update.after` and returns. That is its entire job.

It exists so an integration can force a re-sync of selected assets — re-push them to a CDN, rebuild a search index — without editing every asset to make something happen.

---

## Blade Helper Functions

Five global helpers wrap the [directory permission](./directory-permissions.md) service. Use these in your own views and controllers rather than querying the permission tables yourself — they respect the same caching and bypass rules as DAM.

| Helper | Returns | Use it to |
|---|---|---|
| `dam_can_view_dir(int $id)` | `bool` | Check read access to one directory |
| `dam_can_access_dir(int $id)` | `bool` | Check act-on access to one directory |
| `dam_viewable_directory_ids()` | `array` | Get every directory ID the user can see |
| `dam_accessible_dir_ids()` | `array` | Get the directly granted directory IDs |
| `dam_acl_bypass()` | `bool` | Detect an unrestricted role (all directories) |

```blade
@if (dam_can_access_dir($directory->id))
    <button>Upload here</button>
@endif
```

> [!IMPORTANT]
> **`view` and `access` are not the same thing.** A role can be allowed to *see* a folder in the tree without being allowed to *act* on it. Use `dam_can_view_dir()` to decide whether to render something, and `dam_can_access_dir()` to decide whether to let the user change something.

Always check `dam_acl_bypass()` first if you are building a query — for an unrestricted role, `dam_accessible_dir_ids()` is not meant to be used as a whitelist.

---

## Catalog Sync Listeners

DAM keeps [linked resources](./linked-resources.md) current automatically. When a product or category is saved, a listener reconciles that record's asset mappings — adding new links, removing ones that were cleared.

This means you do **not** need to maintain `dam_asset_resource_mappings` yourself. Save the product through the normal repository and the links follow.

The asset attribute type is also validated on save. An asset ID that does not exist, or that the user cannot reach, is rejected before the product is written.

---

## Loose File Endpoints

Separate from the asset library, DAM exposes three endpoints for the plain file fields on product and category forms. These store files in private storage **without** creating a DAM asset record.

| Endpoint | Permission required |
|---|---|
| `POST /admin/dam/file/create` | `dam.asset.upload` |
| `POST /admin/dam/file/update` | `dam.asset.re_upload` |
| `DELETE /admin/dam/file/delete` | `dam.asset.destroy` |

> [!WARNING]
> The permission names do not read the way you would expect. `file/update` is gated by **`dam.asset.re_upload`**, not `dam.asset.update`, and `file/delete` by **`dam.asset.destroy`**. Granting a role `dam.asset.update` alone will not let it replace a loose file.

Paths are validated against directory traversal — any path containing `..` is rejected outright.

---

## Working With AJAX Navigation

From UnoPim 3.0 the admin navigates over AJAX rather than reloading — see [A Single-Page Experience](./index.md#a-single-page-experience). DAM runs inside that shell, so any JavaScript you add to a DAM screen has to survive pages being swapped in and out.

### What a visit actually does

A visit fetches the destination with an `X-Ajax-Nav: true` header, then replaces **only the `#app` subtree**. The Vue app is unmounted before the swap and remounted after it, inline page scripts are re-executed, and `document.title`, `<html lang>`, and `dir` are synced from the response. History is pushed with `pushState`, and `popstate` drives back and forward.

Anything you attach **outside** `#app` — a `window` listener, a global timer — survives the swap and will therefore run twice unless you clean it up.

### Events

Three events fire on `document`:

| Event | When | Notes |
|---|---|---|
| `unopim:navigate:before` | Before the fetch | **Cancelable.** Calling `preventDefault()` makes UnoPim do a full page load instead |
| `unopim:navigate:success` | After the new page has mounted | The place to re-initialise anything scoped to a page |
| `unopim:navigate:error` | The visit failed | UnoPim then falls back to a full page load |

```js
document.addEventListener('unopim:navigate:success', (event) => {
    // event.detail.url — the page that just mounted
    initialiseMyDamWidget();
});
```

### Blocking a visit

Register a guard to stop navigation — this is exactly how the unsaved-changes prompt works. Return `false` (or a promise resolving to `false`) to cancel:

```js
window.unopim.registerNavigationGuard(async (url) => {
    if (! hasUnsavedWork()) {
        return true;
    }

    return await confirmDiscard();
});
```

### Navigating programmatically

```js
window.unopim.visit('/admin/dam/assets');
```

### Opting a link out

Some links must not be intercepted — a file download, or a route that has to boot fresh:

```html
<a href="/admin/dam/export" data-no-ajax-nav>Download</a>
```

Links are also left alone automatically when they carry `download`, point at another origin, target anything other than `_self`, or are clicked with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>/<kbd>Shift</kbd>/<kbd>Alt</kbd> or the middle button.

> [!TIP]
> If a DAM screen of yours works on first load but breaks after navigating to it, the cause is almost always initialisation that ran once on `DOMContentLoaded`. Move it to `unopim:navigate:success` — or into the Vue component's own lifecycle — so it runs on every visit.

---

## Localisation

DAM ships **33 UI locales**:

`ar_AE`, `ca_ES`, `da_DK`, `de_DE`, `en_AU`, `en_GB`, `en_NZ`, `en_US`, `es_ES`, `es_VE`, `fi_FI`, `fr_FR`, `hi_IN`, `hr_HR`, `id_ID`, `it_IT`, `ja_JP`, `ko_KR`, `mn_MN`, `nl_NL`, `no_NO`, `pl_PL`, `pt_BR`, `pt_PT`, `ro_RO`, `ru_RU`, `sv_SE`, `tl_PH`, `tr_TR`, `uk_UA`, `vi_VN`, `zh_CN`, `zh_TW`

The interface follows the admin user's locale. To add or override strings, publish the language files and edit the locale you need:

```bash
php artisan vendor:publish --provider="Webkul\DAM\Providers\DAMServiceProvider" --tag=lang
```

---

## Related

- [Directory Permissions](./directory-permissions.md) — the model the helpers wrap
- [API Reference](./api-reference.md) — the REST surface and its permission keys
- [Linked Resources](./linked-resources.md) — what the catalog listeners maintain
