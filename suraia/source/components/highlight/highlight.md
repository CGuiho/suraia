# Highlight

Highlights matching substrings in a text block.

## AI Translation Notes
- Splits the `text` attribute into chunks using the queries in the `highlight` attribute.
- Match is case-insensitive.
- Special regex characters are escaped before running matches.
- Renders normal chunks as plain text or spans, and highlighted chunks as `<mark class="suraia-highlight-mark">`.
