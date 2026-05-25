# RangeSlider

A range slider for selecting a range of numeric values by dragging two thumbs along a track.

## AI Translation Notes
- Track: full-width bar. Bar: filled portion between the first and second thumb value.
- First Thumb: draggable circle representing lower bound.
- Second Thumb: draggable circle representing upper bound.
- Values of thumbs are constrained so they cannot cross (first <= second).
- Value labels appear above active thumbs on hover.
- Marks are dots on the track at specific values, with optional labels below.
- Marks between the lower and upper bounds get `[data-suraia-filled]`.
- Key events are captured on each thumb independently.
