# Typography

A structural primitive providing consistent textual styling (headings, lead text, paragraphs, quotes, inline code blocks) aligned with system design token presets.

## Dependencies

None — this is a Tier 1 Primitive.

## AI Translation Notes

- Maps variants like `h1`, `h2` to their semantic DOM elements tags when generating components (e.g. `<h1>` for variant `h1`).
- Applies CSS classes `.suraia-typography` and data attributes to set font families, line heights, weights, and text alignments.
