# FloatingIndicator

FloatingIndicator is a decorative active-target marker that animates between measured rectangles.

## Dependencies

None - Tier 1 Primitive.

## AI Translation Notes

- Measure target and root rectangles in the generated framework, then pass relative values to the controller.
- Keep the indicator `aria-hidden` because it is visual decoration.
- Use CSS custom properties for position, dimensions, opacity, and duration.
- Prefer transform-based movement to avoid layout thrash.
