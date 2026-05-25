# Image

An image container with support for border-radius, object-fit options, and fallback sources.

## AI Translation Notes
- Renders as an `<img>` tag.
- The `src` and `alt` attributes are mapped to their native counterparts.
- Uses `data-suraia-fit` to apply `object-fit` styles.
- Listens to the native `onerror` event to handle image load failure and switch to the `fallbackSrc`.
