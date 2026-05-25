# SemiCircleProgress

A semi-circular progress/gauge indicator built with SVG.

## AI Translation Notes
- Renders a semi-circle gauge arc using SVG path data.
- The path is drawn over the top, starting at `x = thickness/2` and ending at `x = size - thickness/2`.
- Active segment arc length is calculated dynamically using `stroke-dasharray` and `stroke-dashoffset`.
- The gauge width is `size`, and the container height is cropped to `size / 2 + thickness / 2`.
- ARIA semantics default to a standard `role="progressbar"`.
