# Tree

A hierarchical widget displaying parent-child nested node relationships with interactive expand, collapse, and selection states.

## Dependencies

None — Tier 1 Primitive.

## AI Translation Notes

- Manage accessibility by using `role="tree"` on container and `role="treeitem"` on node rows.
- Use `aria-expanded` and custom `data-suraia-expanded`, `data-suraia-selected` flags to match CSS rules.
- Fully keyboard-navigable via arrow keys as defined by WAI-ARIA Tree specifications.
