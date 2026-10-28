# Supported languages

DeepL only translates between certain languages. The extension asks DeepL which languages your key supports, so when DeepL adds a new language it works straight away - no update needed.

- The list is fetched with your API key and remembered for 24 hours.
- If DeepL can't be reached, the extension falls back to a built-in list and tries DeepL again next time.

## How UnoPim languages are matched

Most locales are matched by their language - `fr_FR` is French, `ja_JP` is Japanese, and so on. A few regional locales are mapped to the closest DeepL variant:

| UnoPim locale | Translated as |
|--|--|
| `en_US`, `en_PH` | English (American) |
| `en_GB`, `en_AU`, `en_CA`, `en_IE`, `en_IN`, `en_NZ`, `en_ZA` and other English locales | English (British) |
| `pt_BR` | Portuguese (Brazilian) |
| `pt_PT` | Portuguese (European) |
| `es_MX`, `es_AR`, `es_CO`, `es_US` and other Latin American Spanish locales | Spanish (Latin American) |
| `zh_CN`, `zh_SG` | Chinese (Simplified) |
| `zh_TW`, `zh_HK`, `zh_MO` | Chinese (Traditional) |
| `fr_CA` | French (Canadian) |
| `de_CH` | German (Swiss) |
| `nb_NO`, `no_NO` | Norwegian (Bokmål) |

## When a language isn't supported

- **Some target languages unsupported** - those are skipped and the rest are translated. You'll see *DeepL does not support …, so they were skipped.*
- **Source language, or every target language, unsupported** - nothing is translated. You'll see *DeepL does not support locale "…".*

To see every language DeepL offers, check DeepL's [supported languages page](https://developers.deepl.com/docs/getting-started/supported-languages).

## Rich text

If a field uses a rich-text editor (bold, links, headings, etc.), DeepL keeps the formatting intact when translating. You don't need to tick anything extra - the extension detects rich text on its own.
