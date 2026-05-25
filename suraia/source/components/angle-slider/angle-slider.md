# AngleSlider

A circular dial component to select an angle (0-360 degrees) by rotating a needle.

## AI Translation Notes
- Renders a circular dial containing a needle rotated to `value` degrees.
- Drag interactions calculate client coords relative to the dial center:
  - Uses `calculateAngleFromCoords(x, y, cx, cy)` to compute angle using `Math.atan2`.
  - Rotates 0-degree point to top (12 o'clock) by offsetting the calculation by `Math.PI / 2`.
- Snap and wrap-around logic are executed in degrees.
- Supports keyboard navigation to adjust value by `step`.
