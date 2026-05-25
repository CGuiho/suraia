# TreeSelect

A dropdown select input for choosing single or multiple values from a hierarchical tree structure. It supports toggleable folder/parent nodes, nested indentations, disabled states, and full keyboard navigation.

## Dependencies
- Input, Popover

## AI Translation Notes
- Implements ARIA `role="combobox"` on the input trigger.
- Dropdown container behaves as a `role="tree"` widget, containing hierarchical nested `role="treeitem"` options.
- The `aria-expanded` attribute on parent nodes controls folder toggles.
- Supports comprehensive keyboard interaction: Arrow navigation (`ArrowDown`, `ArrowUp`), expand/collapse control (`ArrowRight`, `ArrowLeft`), and node selection (`Enter`).
