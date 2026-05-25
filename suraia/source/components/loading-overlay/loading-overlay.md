# LoadingOverlay

An overlay that covers the parent element to prevent interaction while loading.

## Dependencies
- Overlay (Tier 1)
- Loader (Tier 1)

## AI Translation Notes
- Designed to fit absolute boundaries, meaning the parent container must have `position: relative` style set.
- Controls visible state via `[data-suraia-visible]` attribute toggle.
- Backdrop background color, opacity, and blur are dynamically modified using CSS custom variables computed by the controller.
- Standard default `z-index` is `400` to rest above page layouts but remain below full modal overlays.
