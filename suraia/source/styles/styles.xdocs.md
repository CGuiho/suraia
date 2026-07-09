---
subject: suraia-source-styles
description: Global styles — CSS custom properties, color tokens, font definitions, responsive utility functions, CSS reset, and TypeScript re-exports of all token values.
parent: suraia-source
children: []
files:
  colors.css: CSS custom property color tokens (`--suraia-color-*`).
  colors.ts: TypeScript color token exports mirroring `colors.css`.
  fonts.css: CSS font family custom properties (`--suraia-font-*`).
  fonts.ts: TypeScript font token exports mirroring `fonts.css`.
  functions.css: 'CSS utility functions — `rem()`, `fluid()`, `alpha()` as custom properties.'
  functions.ts: 'TypeScript responsive utility functions — exports `rem()`, `fluid()`, `alpha()`.'
  functions.test.ts: Tests for the `functions.ts` utility exports.
  reset.css: CSS reset / normalize baseline for suraia components.
  vars.css: CSS custom property variable definitions and fallbacks.
  vars.ts: TypeScript variable token exports mirroring `vars.css`.
documents: {}
tags:
  - styles
  - css
  - tokens
keywords:
  - styles
  - colors
  - fonts
  - css-custom-properties
  - design-tokens
  - fluid-typography
flags: []
status: draft
---

# Global Styles

CSS-first styling system with TypeScript mirrors. Every token defined in CSS
is also exported as a TypeScript constant for CSS-in-JS and build-time usage.
