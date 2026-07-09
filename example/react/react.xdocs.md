---
subject: example-react
description: 'React 19 example app — demonstrates suraia blueprint consumption with React components, component composer UI, and preview panels.'
parent: examples
children: []
files:
  package.json: 'Package manifest — `@guiho/suraia-example-react`, React 19 + TypeScript, dev server via Bun.'
  tsconfig.json: TypeScript configuration.
  bunfig.toml: Bun configuration file.
  bun.lock: Bun lockfile.
  suraia.config.toml: Suraia configuration for the example app.
  README.md: Example app documentation.
documents:
  README.md: React example app documentation.
tags:
  - example
  - react
keywords:
  - react
  - example
  - component-composer
  - suraia-blueprint
flags: []
status: draft
---

# React Example

A React 19 application consuming `@guiho/suraia` as a file-based devDependency.
Source in `src/`:

- **App.tsx** — Main application with component composer, overview, and preview pages.
- **frontend.tsx** — Client-side React entry point.
- **index.ts** — Bun HTTP server entry point (SSR).
- **index.html** — HTML shell.
- **index.css** — Global styles.
