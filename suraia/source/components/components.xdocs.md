---
subject: suraia-source-components
description: 'Component blueprints — 107 framework-agnostic UI component definitions. Each component is a directory containing: `.json` metadata, `.structure.html` anatomy, `.css` styles, `.ts` behavior controller, `.test.ts` tests, and `.md` documentation.'
parent: suraia-source
children: []
files: {}
documents: {}
tags:
  - components
  - blueprints
keywords:
  - components
  - ui-components
  - blueprint
  - button
  - input
  - dialog
  - card
  - table
  - form
flags: []
status: draft
---

# Component Blueprints

Each subdirectory under `components/` is a single component blueprint containing:

| File | Purpose |
|------|---------|
| `<name>.json` | Machine-readable metadata: variants, states, slots, attributes, accessibility contract. |
| `<name>.structure.html` | Reference HTML anatomy showing slot positions and class names. |
| `<name>.css` | Base layout styles, state-driven styling, custom property references. |
| `<name>.ts` | Framework-agnostic `*Controller` class for interaction/state behavior. |
| `<name>.test.ts` | Tests for the component behavior controller. |
| `<name>.md` | Human-readable component documentation (usage, variants, accessibility). |

## Component Catalog

accordion, action-icon, affix, alert, alpha-slider, anchor, angle-slider, app-shell,
aspect-ratio, autocomplete, avatar, background-image, badge, blockquote, box,
breadcrumbs, burger, button, card, center, checkbox, chip, close-button, code,
collapse, color-input, color-picker, color-swatch, combobox, container, copy-button,
dialog, divider, drawer, fieldset, file-button, file-input, flex, floating-indicator,
floating-window, focus-trap, grid, group, highlight, hover-card, hue-slider, image,
indicator, input, json-input, kbd, list, loader, loading-overlay, mark, marquee,
mask-input, menu, modal, multi-select, native-select, nav-link, notification,
number-formatter, number-input, overflow-list, overlay, pagination, paper,
password-input, pill, pills-input, pin-input, popover, portal, progress, radio,
range-slider, rating, ring-progress, rolling-number, scroll-area, scroller,
segmented-control, select, semi-circle-progress, simple-grid, skeleton, slider,
space, spoiler, stack, stepper, switch, table, table-of-contents, tabs, tags-input,
text, textarea, text-input, theme-icon, timeline, title, tooltip, transition, tree,
tree-select, typography, unstyled-button, visually-hidden
