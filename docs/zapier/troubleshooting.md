# Troubleshooting

The failure modes below are the ones that actually come up. Work down the list in order - the first two account for most reports.

---

## Nothing fires at all

### 1. The queue worker is not running

This is by far the most common cause, and the hardest to spot, because **nothing on screen says so**. The Zap still shows as Active on **Connected Zaps**, Zapier still shows the trigger as connected, and the Delivery Logs page simply stays empty.

Every delivery is a queued job on the dedicated `zapier` queue. No worker on that queue means no job is ever picked up.

```bash
php artisan queue:work --queue=zapier
```

Check it is alive and on the right queue:

```bash
ps aux | grep "queue:work"
```

If you changed `ZAPIER_QUEUE`, the worker's `--queue=` must match it exactly. See [Configuration](./configuration).

> [!TIP]
> A worker loads your code once at startup. After upgrading the package, run `php artisan queue:restart` or the worker keeps running the previous version. Do not run two workers on the same queue with different code - whichever grabs a job first wins, and the results look random.

### 2. The Zap is still a draft

A draft Zap never subscribes, so nothing is ever registered on the UnoPim side. Publishing the Zap is what registers the webhook.

Confirm by opening **Connected Zaps** - if the Zap is not listed there, it never subscribed.

### 3. The change was a bulk edit

Products saved through UnoPim's bulk-edit flow do **not** emit `product.updated`, so no Zap runs. Edit a single product to confirm the trigger works, and use an exporter when you need bulk changes to leave UnoPim.

### 4. No subscription exists for that event

Nothing is queued when no subscription matches, so a Zap on `product.created` will not react to a category change. Check what is actually subscribed:

```bash
php artisan tinker --execute='dump(\Webkul\Zapier\Models\ZapierSubscription::pluck("event", "id")->all());'
```

---

## Zapier rejects the credentials

You most likely used a **human admin login** in the Username field, or copied the four values from different rows.

UnoPim ties each API key's OAuth client to the generated API user on that same row. When the Username does not resolve to that client, `/oauth/token` answers **`invalid_client`** and no token is issued, so the connection never completes. A Username that was clipped when copying fails the same way - the value is 58 characters long.

**Fix:** open **Configuration → Integrations**, and copy the **API Username** (`integration+<uuid>@api.local`), **API Password**, **Client ID** and **Secret Key** from *the same row*. Paste all four into the Zapier connection. See [Connect UnoPim in Zapier](./credentials).

If the connection succeeds but one operation returns **403 This action is unauthorized**, the API key is missing a permission for that route. Grant it on the key, or set its **Permission Type** to *All*.

---

## Zapier refuses the UnoPim URL

| Message | Cause |
|---|---|
| *The UnoPim URL must start with `https://`* | Plain HTTP is refused rather than sending your Client Secret and password in the clear. |
| *"…" is not a valid UnoPim host* | The address is not a resolvable public hostname. |
| *Remove the username and password from the UnoPim URL* | You pasted `https://user:pass@host`. Put them in the fields below instead. |
| *The UnoPim URL must not contain a query string or fragment* | Paste just the address. |
| *UnoPim did not return an access token* | The URL does not point at the application root, or `/oauth/token` is not reachable there. |

A trailing slash is fine - it is stripped before every request.

---

## The Zap fired once and then went silent

This is Zapier's deduplication. Zapier caches every `id` it has seen for a trigger and **silently drops repeats** - there is no error and nothing in the Zap history.

UnoPim already guards against this: an update carries a composite id of `{id}-{updated_timestamp}-{fingerprint}` rather than the bare record id. So if you are seeing it, check:

- **Are you mapping `id` downstream?** Do not. Map `product_id` for products and `entity_id` for categories, attributes and families. The `id` field exists for deduplication and its shape changes between events.
- **Was the save a genuine no-op?** A save that changed nothing produces the same fingerprint and the same id, so it is deduplicated on purpose.

Open the delivery in [Delivery Logs](./delivery-logs) and compare the **Zapier Dedupe ID** across the two runs. Two identical ids means Zapier accepted the first and dropped the second.

---

## The Zap disappeared from Connected Zaps

Zapier answered a delivery with **HTTP 410 Gone**, which means the Zap was switched off. UnoPim treats that as the cleanup signal it is, deletes the subscription, and keeps the delivery history.

The row is logged with the status **Zap Turned Off**. Switch the Zap back on in Zapier and it re-subscribes itself.

---

## Deliveries show as Blocked

The SSRF guard refused the destination, so nothing left your server. It rejects loopback, private, link-local and cloud-metadata addresses, and it runs twice - once before the subscription is stored and again before each delivery.

In normal use the target is `hooks.zapier.com`, which is never blocked. A blocked delivery means something else subscribed to the endpoint with an internal address, or your DNS is resolving a public hostname to a private IP.

---

## One new product produces two Zap runs

Expected. UnoPim writes the product row and then saves its values, so a create through the REST API fires **both** `product.created` and `product.updated`.

If you have both triggers switched on you get two runs. Either turn one off, or add a Filter step on the `event` field.

---

## `422 Unexpected Attribute` on Create or Update Product

The attribute is stored per channel and locale in UnoPim, so it belongs in **Scoped Values** (with a Channel and Locale selected), not in **Common Values**.

| Field | What goes in it |
|---|---|
| Common Values | `url_key`, `weight`, `image` - identical everywhere |
| Scoped Values | `name`, `description`, `short_description`, `price`, `cost` - and most others |

If in doubt, use Scoped Values. The connector names the offending attribute in the error message. See [Actions](./actions).

---

## `404 No product in UnoPim has the SKU "…"`

Almost always a SKU that was **typed** into the step instead of mapped from an earlier one. Pick the value from the earlier step's dropdown.

To handle a genuinely missing product, put a **Find Product** search before the Update step and let it create the product when the search comes back empty.

---

## Fields I mapped arrive empty

Check the flattened key names. UnoPim collapses `(attribute, channel, locale)` onto one namespace in the order **`attribute__channel__locale`**:

```
values.common.name                                  ->  name
values.locale_specific.en_US.description            ->  description__en_US
values.channel_specific.default.cost                ->  cost__default
values.channel_locale_specific.default.en_US.price  ->  price__default__en_US
```

If you set a **Channel** or **Locale** on the trigger, values outside that scope are not sent at all.

Open the delivery in [Delivery Logs](./delivery-logs) and read the **Sent Payload** - that is the exact JSON that left, so whatever is not in it was never sent.

---

## The payload says `_truncated: true`

The flattened payload hit `ZAPIER_MAX_PAYLOAD_KEYS` (250 by default) and was cut off.

The right fix is usually to narrow the trigger with a **Channel** and **Locale** rather than to raise the cap - Zapier's field mapper struggles with very wide payloads regardless. See [Configuration](./configuration).

A separate `_log_truncated` flag means only the **stored log copy** was capped at `ZAPIER_LOG_MAX_PAYLOAD_KEYS` (60). The delivery itself was complete.

---

## The Health column shows an error

The last delivery to that subscription failed, and the message is kept on the row until the next success clears it. Open [Delivery Logs](./delivery-logs), filter on that event, and read the failing row's response.

---

## Nothing in the Delivery Logs at all

| Check | |
|---|---|
| Is a worker running on the `zapier` queue? | See the top of this page. |
| Is `ZAPIER_LOGGING` set to `false`? | Deliveries still happen, but nothing is recorded. |
| Have the rows been pruned? | The default window is 30 days. Widen the overview with `?days=30`, and check `ZAPIER_LOG_RETENTION_DAYS`. |
| Does any subscription exist? | Nothing is queued when nothing is listening. |

---

## Useful commands

```bash
php artisan queue:work --queue=zapier
php artisan queue:restart
php artisan optimize:clear
php artisan schedule:list
php artisan zapier:logs:prune --days=7
```

Inspect state directly:

```bash
php artisan tinker --execute='dump(\Webkul\Zapier\Models\ZapierSubscription::pluck("event", "id")->all());'
php artisan tinker --execute='dump(\Webkul\Zapier\Models\ZapierDeliveryLog::latest("id")->first()?->toArray());'
```

Zapier's own view of what happened is [Zap History](https://zapier.com/app/history).

Still stuck? See [Contact Support](./contact-support).
