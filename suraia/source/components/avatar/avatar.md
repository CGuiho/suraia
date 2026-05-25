# Avatar

Displays a user avatar — image, initials fallback, or placeholder icon.

## Dependencies
None — Tier 1 Primitive.

## AI Translation Notes
- When `src` is provided and loads, render an `<img>` element.
- When `src` fails (`onerror`) or is missing, show initials from `name` prop.
- Initials are derived: first char of first word + first char of last word, uppercased.
- Default variant is `light` (translucent tinted background).
- `border-radius: full` makes it circular by default.
