# Translate after import or save

When auto-translate is on, DeepL fills missing translations for you - no extra clicks.

> **Before you start.** Set up auto-translate on your default key - see [Credentials > Settings](./credentials), turn on **Enable Auto Translate**, and fill in the **Mapping**. Tick **AI Translate** on every field that should be auto-translated (see [Mark fields](./attribute-setup)).

## After every import

Every product import ends with a translation pass:

1. Each newly imported product is queued for translation.
2. Empty target-language values get filled by DeepL.
3. If **Replace Existing Value** is on, it also overwrites values that are already filled. If off, those are left alone.

All imported products are translated in one background job. Watch it in [Watch progress](./tracker).

## After saving a product

Create or save a product - in the admin or through the API - and a translation job is queued straight away. No extra clicks.

It uses the same settings as imports: the **Mapping** on your default key, the **Attribute Mapping** list (if you set one), and **Replace Existing Value**. Only fields with **AI Translate** ticked are translated (see [Mark fields](./attribute-setup)) - anything not flagged is left alone.

Watch it in [Watch progress](./tracker).

## Turn it off

Open the default key, turn **Enable Auto Translate** off, and click **Save changes** in the save bar. Both flows stop straight away. Your mapping stays saved, so turning it back on later is one click.
