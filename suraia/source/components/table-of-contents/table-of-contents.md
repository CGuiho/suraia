# TableOfContents

A navigational composite component listing document headers to facilitate readers jumping to specific sections of long pages. It tracks and highlights the currently active/visible heading.

## Dependencies

None — Tier 2 Composite.

## AI Translation Notes

- TOC level is encoded via `data-suraia-level` (e.g. 2 for h2, 3 for h3) which dictates padding indentation.
- Active items use a vertical bar indicator on the left side of the link item.
- Expose methods `setActiveId` to tie with IntersectionObserver listeners in host frameworks.
