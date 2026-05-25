# Slider

A range slider for selecting a numeric value by dragging a thumb along a track.

## AI Translation Notes
- Track: full-width bar. Bar: filled portion (0 to value%). Thumb: draggable circle.
- Value label appears above thumb on hover (or always with `labelAlwaysOn`).
- Marks are dots on the track at specific values, with optional labels below.
- Marks before the current value get `[data-suraia-filled]`.
- Drag interaction: track `mousedown`/`touchstart` → compute position as % → snap to step.
- `onChangeEnd` fires on `mouseup`/`touchend` for final commit.
