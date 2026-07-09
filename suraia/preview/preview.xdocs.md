---
subject: suraia-preview
description: Interactive component preview playground — Vite + TypeScript app for browsing, testing, and rendering suraia component blueprints with live controls.
parent: suraia
children: []
files:
  index.html: Entry point HTML for the preview playground.
  vite.config.ts: Vite configuration — root at `preview/`, allows fs access to `../source`.
  tsconfig.json: TypeScript configuration for the preview app.
documents: {}
tags:
  - preview
  - playground
  - vite
keywords:
  - preview
  - playground
  - component-preview
  - vite
flags: []
status: draft
---

# Preview Playground

A Vite-based single-page application for interactively browsing and testing
suraia component blueprints. Sources are under `preview/source/` organized into:

- **blueprints/** — Blueprint loading, normalization, categorization (`load-blueprints.ts`, `normalize-blueprint.ts`, `types.ts`).
- **preview/** — Preview rendering, control application, render matrix (`render-preview.ts`, `apply-controls.ts`, `render-matrix.ts`).
- **ui/** — UI panels: sidebar, component page, controls, code panel, dependency panel.
- **styles/** — Workbench CSS (`workbench.css`).
