# RingProgress

A circular progress indicator built with SVG.

## AI Translation Notes
- Renders an SVG structure with background track circle and animated value/section circles.
- Supports single `value` or multi-segment progress via `sections`.
- Radii, circumference, dash arrays, dash offsets, and center rotation are calculated dynamically.
- `getSectionCalculations()` returns parameters for drawing circle arcs for each segment sequentially.
- Starts from top (12 o'clock, which maps to -90 degrees in SVG coordinates).
