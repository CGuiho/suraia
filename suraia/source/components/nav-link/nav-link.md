# NavLink

Vertical navigation link with icon, description, nesting, and active state.

## AI Translation Notes
- Renders as `<a>` for links or `<div tabindex="0">` for nested triggers.
- Active link uses `aria-current="page"`.
- Nested links use `aria-expanded` and indent children with `padding-left`.
- Chevron rotates on `[aria-expanded="true"]`.
