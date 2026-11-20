# Translate after import or save

When auto-translate is on, DeepL fills missing translations for you — no extra clicks.

> **Before you start.** Set up auto-translate on your default key — see [Credentials → Settings](./credentials), turn on **Enable Auto Translate**, and fill in the **Mapping**. Tick **AI Translate** on every field that should be auto-translated (see [Mark fields](./attribute-setup)).

## After every import

Every product import ends with a translation pass:

1. All products from the import's processed batches are queued as **one** background translation job.
2. Empty target-language values get filled by DeepL.
3. If **Replace Existing Value** is on, it also overwrites values that are already filled. If off, those are left alone.

Watch the runs in [Watch progress](./tracker).

## After saving a product

Every time a product is created or saved, a background translation job is queued automatically using the default key's **Mapping**. There is no prompt.

Only fields with **AI Translate** ticked are translated (see [Mark fields](./attribute-setup)). If **Attributes to auto-translate** is filled on the key, only those fields are translated. **Replace Existing Value** works the same way as for imports.

> [!WARNING]
> Each product save sends the product's text to DeepL again and uses DeepL quota. Turn off **Enable Auto Translate** before large manual editing sessions if you don't want this.

Watch it in [Watch progress](./tracker).

## Turn it off

Open the default key and turn **Enable Auto Translate** off. Both flows stop straight away. Your mapping stays saved, so turning it back on later is one click.
