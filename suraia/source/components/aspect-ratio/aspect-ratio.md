# AspectRatio

Forces content to maintain a fixed width-to-height aspect ratio.

## AI Translation Notes
- Renders as a wrapper box with `aspect-ratio: var(--suraia-ratio)`.
- If children include `img`, `video`, or `iframe`, they are automatically scaled to `width: 100%; height: 100%; object-fit: cover;`.
