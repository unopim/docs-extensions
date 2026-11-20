# Supported languages

DeepL only translates between certain languages. The extension asks the DeepL API which source and target languages your key supports, and caches that list for 24 hours. Languages DeepL adds later work without an extension update.

A UnoPim locale is matched to DeepL by its language part (for example `fr_FR` → `FR`). Regional targets such as `en_GB`, `en_US`, `pt_BR`, `pt_PT`, `zh_CN` and `zh_TW` map to DeepL's regional variants.

If the DeepL API can't be reached, a built-in list of language codes is used for that request and the API is tried again next time.

Languages that aren't supported are skipped — you'll see a message saying DeepL doesn't support that language, and the skip is written to the log.

To see which languages DeepL supports, check DeepL's [supported languages page](https://developers.deepl.com/docs/getting-started/supported-languages).

## Rich text

If a field uses a rich-text editor (bold, links, headings, etc.), DeepL keeps the formatting intact when translating. You don't need to tick anything extra — the extension detects rich text on its own.
