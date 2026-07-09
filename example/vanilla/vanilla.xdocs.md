---
subject: example-vanilla
description: Vanilla TypeScript example app — demonstrates suraia blueprint consumption with plain HTML, CSS, and JavaScript (Bun dev server).
parent: examples
children: []
files:
  package.json: 'Package manifest — `@guiho/suraia-example-vanilla`, TypeScript, Bun dev server.'
  tsconfig.json: TypeScript configuration.
  bunfig.toml: Bun configuration file.
  bun.lock: Bun lockfile.
  index.html: Entry HTML shell for the vanilla example.
  README.md: Example app documentation.
documents:
  README.md: Vanilla example app documentation.
tags:
  - example
  - vanilla
keywords:
  - vanilla
  - example
  - html
  - css
  - javascript
flags: []
status: draft
---

# Vanilla Example

A vanilla TypeScript app (no framework) consuming suraia blueprint CSS and
token definitions. Source in `src/`:

- **main.ts** — Client-side application logic, component rendering, generator UI.
- **server.ts** — Bun HTTP dev server.
- **styles.css** — Application-level styles.
- **global.d.ts** — TypeScript global type declarations.
