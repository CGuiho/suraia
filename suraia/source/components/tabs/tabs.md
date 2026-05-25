# Tabs

A tabbed interface for organizing content into selectable panels.

## Dependencies
None — Tier 2 Composite.

## Variants
- `default` — Underline indicator (default)
- `outline` — Bordered tab with open bottom
- `pills` — Filled rounded tabs

## AI Translation Notes
- Each tab trigger has `role="tab"`, panels have `role="tabpanel"`.
- `aria-selected="true"` on the active tab, `tabindex="0"` on active, `-1` on others.
- `aria-controls` links tab to its panel; `aria-labelledby` links panel to its tab.
- Inactive panels get `hidden` attribute.
- Keyboard: Arrow keys cycle tabs, Home/End jump to first/last.
- Vertical orientation changes arrow key binding from Left/Right to Up/Down.
