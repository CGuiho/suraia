/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import "./styles.css";

type PageId = "overview" | "generator" | "components" | "instructions";
type GeneratorStatus = "idle" | "loading" | "success" | "error";

interface Metric {
  label: string;
  value: string;
  detail: string;
}

interface ComponentRecord {
  name: string;
  tier: string;
  status: string;
}

interface ExampleState {
  page: PageId;
  theme: "light" | "dark";
  activeTab: "anatomy" | "behavior" | "accessibility";
  dialogOpen: boolean;
  generatorStatus: GeneratorStatus;
  selectedComponent: string;
  selectedTarget: "vanilla" | "react" | "arrow" | "remix";
  progress: number;
  formName: string;
  formError: string;
  toast: string;
}

const metrics: Metric[] = [
  { label: "Blueprints", value: "111", detail: "complete component contracts" },
  { label: "Generated files", value: "666", detail: "json, html, css, ts, md, tests" },
  { label: "Runtime import", value: "0", detail: "Suraia remains a devDependency" },
  { label: "Example mode", value: "TS", detail: "local generated behavior" },
];

const components: ComponentRecord[] = [
  { name: "Button", tier: "Tier 1", status: "Generated locally" },
  { name: "Dialog", tier: "Tier 2", status: "Focus and escape behavior" },
  { name: "Tabs", tier: "Tier 2", status: "Keyboard-ready anatomy" },
  { name: "Stepper", tier: "Tier 2", status: "Workflow navigation" },
  { name: "Table", tier: "Tier 1", status: "Data display contract" },
  { name: "ColorInput", tier: "Tier 2", status: "Validation and preview" },
];

const state: ExampleState = {
  page: "overview",
  theme: "light",
  activeTab: "anatomy",
  dialogOpen: false,
  generatorStatus: "idle",
  selectedComponent: "Dialog",
  selectedTarget: "vanilla",
  progress: 47,
  formName: "",
  formError: "",
  toast: "",
};

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  document.body.textContent = "Missing application root.";
} else {
  render();
}

function render(): void {
  if (!app) {
    return;
  }

  app.innerHTML = `
    <main class="suraia-root shell" data-suraia-color-scheme="${state.theme}">
      ${renderHeader()}
      ${renderPage()}
      ${renderDialog()}
      ${renderToast()}
    </main>
  `;

  bindEvents();
}

function renderHeader(): string {
  const navItems: Array<{ id: PageId; label: string }> = [
    { id: "overview", label: "Overview" },
    { id: "generator", label: "Generator" },
    { id: "components", label: "Components" },
    { id: "instructions", label: "Instructions" },
  ];

  return `
    <header class="topbar">
      <a class="brand" href="#" data-action="page" data-page="overview" aria-label="Suraia example home">
        <span class="brand-mark" aria-hidden="true"></span>
        <span>
          <strong>Suraia</strong>
          <small>Vanilla TypeScript</small>
        </span>
      </a>
      <nav class="nav" aria-label="Example pages">
        ${navItems
          .map(
            item => `
              <button class="nav-link ${state.page === item.id ? "is-active" : ""}" type="button" data-action="page" data-page="${item.id}">
                ${item.label}
              </button>
            `
          )
          .join("")}
      </nav>
      <button class="theme-toggle" type="button" data-action="theme">
        ${state.theme === "light" ? "Dark scheme" : "Light scheme"}
      </button>
    </header>
  `;
}

function renderPage(): string {
  if (state.page === "generator") {
    return renderGeneratorPage();
  }
  if (state.page === "components") {
    return renderComponentsPage();
  }
  if (state.page === "instructions") {
    return renderInstructionsPage();
  }
  return renderOverviewPage();
}

function renderOverviewPage(): string {
  return `
    <section class="hero">
      <div class="hero-copy reveal" style="--delay: 0ms">
        <p class="eyebrow">Blueprints compiled into local code</p>
        <h1>Framework-neutral UI, generated into plain TypeScript.</h1>
        <p class="lede">
          This example behaves like a target application after an AI assistant has read Suraia blueprints and generated local Vanilla code.
          The app imports no production Suraia runtime.
        </p>
        <div class="actions">
          <button class="suraia-button primary" type="button" data-action="page" data-page="generator">Generate a component</button>
          <button class="suraia-button secondary" type="button" data-action="dialog">Open generated dialog</button>
        </div>
      </div>
      <aside class="blueprint-panel reveal" style="--delay: 90ms" aria-label="Blueprint contract preview">
        <div class="panel-header">
          <span>component/dialog/dialog.json</span>
          <strong>Resolved</strong>
        </div>
        <pre><code>{
  "name": "Dialog",
  "dependencies": ["Button", "Overlay"],
  "states": ["opened", "closed"],
  "accessibility": "focus trap + escape"
}</code></pre>
      </aside>
    </section>
    <section class="metric-grid" aria-label="Example metrics">
      ${metrics
        .map(
          (metric, index) => `
            <article class="metric-card reveal" style="--delay: ${120 + index * 45}ms">
              <span>${metric.label}</span>
              <strong>${metric.value}</strong>
              <p>${metric.detail}</p>
            </article>
          `
        )
        .join("")}
    </section>
  `;
}

function renderGeneratorPage(): string {
  const statusBlock = renderGeneratorStatus();

  return `
    <section class="workspace-grid">
      <article class="workspace-card wide">
        <p class="eyebrow">Local generation contract</p>
        <h2>Choose a blueprint and compile it into a target shape.</h2>
        <div class="form-grid">
          <label class="field">
            <span>Component</span>
            <select data-action="component-select">
              ${["Button", "Dialog", "Tabs", "ColorInput", "Table", "Stepper"]
                .map(name => `<option value="${name}" ${state.selectedComponent === name ? "selected" : ""}>${name}</option>`)
                .join("")}
            </select>
          </label>
          <label class="field">
            <span>Target</span>
            <select data-action="target-select">
              <option value="vanilla" ${state.selectedTarget === "vanilla" ? "selected" : ""}>Vanilla TypeScript</option>
              <option value="react" ${state.selectedTarget === "react" ? "selected" : ""}>React TypeScript</option>
              <option value="arrow" ${state.selectedTarget === "arrow" ? "selected" : ""}>Arrow.js later</option>
              <option value="remix" ${state.selectedTarget === "remix" ? "selected" : ""}>Remix SQL generation later</option>
            </select>
          </label>
        </div>
        <div class="actions">
          <button class="suraia-button primary" type="button" data-action="generate">Run generated flow</button>
          <button class="suraia-button ghost" type="button" data-action="simulate-error">Test error state</button>
        </div>
        ${statusBlock}
      </article>
      <aside class="workspace-card">
        <h3>Workflow progress</h3>
        <div class="progress-shell" aria-label="Generation progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${state.progress}">
          <span style="width: ${state.progress}%"></span>
        </div>
        <p class="muted">Progress is controlled by local TypeScript state, mirroring Suraia controller behavior.</p>
        <button class="suraia-button secondary full" type="button" data-action="progress">Advance progress</button>
      </aside>
    </section>
  `;
}

function renderGeneratorStatus(): string {
  if (state.generatorStatus === "loading") {
    return `
      <div class="state-box loading-state">
        <span class="skeleton-line long"></span>
        <span class="skeleton-line medium"></span>
        <span class="skeleton-line short"></span>
      </div>
    `;
  }

  if (state.generatorStatus === "success") {
    return `
      <div class="state-box success-state">
        <strong>${state.selectedComponent} generated for ${targetLabel(state.selectedTarget)}</strong>
        <p>Dependencies resolved, local files written, and behavior attached without a production Suraia import.</p>
      </div>
    `;
  }

  if (state.generatorStatus === "error") {
    return `
      <div class="state-box error-state">
        <strong>Generation blocked by a missing target instruction.</strong>
        <p>Use the React or Vanilla instructions today. Arrow.js and Remix instructions are documented as later targets.</p>
      </div>
    `;
  }

  return `
    <div class="state-box empty-state">
      <strong>No generated output yet.</strong>
      <p>Select a component and run the flow to see success, loading, and error states.</p>
    </div>
  `;
}

function renderComponentsPage(): string {
  return `
    <section class="component-layout">
      <article class="component-demo">
        <p class="eyebrow">Generated primitives and composites</p>
        <h2>Local components composed from blueprint anatomy.</h2>
        <div class="tab-list" role="tablist" aria-label="Blueprint details">
          ${(["anatomy", "behavior", "accessibility"] as const)
            .map(
              tab => `
                <button class="tab ${state.activeTab === tab ? "is-active" : ""}" type="button" role="tab" aria-selected="${state.activeTab === tab}" data-action="tab" data-tab="${tab}">
                  ${capitalize(tab)}
                </button>
              `
            )
            .join("")}
        </div>
        <div class="tab-panel" role="tabpanel">
          ${renderTabPanel()}
        </div>
        <form class="signup-form" data-action="form">
          <label class="field">
            <span>Generated input label</span>
            <input type="text" name="name" value="${escapeHtml(state.formName)}" placeholder="Blueprint consumer name" />
            <small>Labels stay above inputs, with helper and error text below.</small>
            ${state.formError ? `<em>${state.formError}</em>` : ""}
          </label>
          <button class="suraia-button primary" type="submit">Validate input</button>
        </form>
      </article>
      <aside class="component-list" aria-label="Implemented components">
        ${components
          .map(
            item => `
              <article class="component-row">
                <span>${item.name}</span>
                <small>${item.tier}</small>
                <strong>${item.status}</strong>
              </article>
            `
          )
          .join("")}
      </aside>
    </section>
  `;
}

function renderTabPanel(): string {
  if (state.activeTab === "behavior") {
    return "Controllers attach click, keyboard, validation, selection, and disclosure behavior with plain TypeScript.";
  }
  if (state.activeTab === "accessibility") {
    return "ARIA labels, roles, focus order, and escape handling are generated from each component blueprint contract.";
  }
  return "HTML structure follows the .structure.html files, including slots, data attributes, and semantic elements.";
}

function renderInstructionsPage(): string {
  return `
    <section class="instructions">
      <article>
        <p class="eyebrow">How to use the examples</p>
        <h2>Vanilla and React are active targets. Arrow.js and Remix are reserved for the next pass.</h2>
        <ol class="instruction-list">
          <li><strong>Install Suraia as a devDependency.</strong> The generated app owns its final component files.</li>
          <li><strong>Read the component blueprint.</strong> Resolve dependencies from the JSON contract before generating the requested component.</li>
          <li><strong>Copy anatomy, styles, and behavior locally.</strong> Do not import Suraia at production runtime.</li>
          <li><strong>Verify with Bun.</strong> Run typecheck, build, and the example preview for the selected target.</li>
        </ol>
      </article>
      <aside class="instruction-note">
        <strong>Later targets</strong>
        <p>Arrow.js should compile the same generated anatomy into Arrow templates. Remix SQL generation should connect blueprint-driven UI to route modules, actions, loaders, and typed SQL scaffolds.</p>
      </aside>
    </section>
  `;
}

function renderDialog(): string {
  if (!state.dialogOpen) {
    return "";
  }

  return `
    <div class="overlay" data-action="close-dialog" role="presentation">
      <section class="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <div>
          <p class="eyebrow">Generated Dialog</p>
          <h2 id="dialog-title">Blueprint behavior is local.</h2>
          <p>This dialog is controlled by Vanilla TypeScript. Escape, overlay click, and close actions are wired in this generated app.</p>
        </div>
        <div class="actions">
          <button class="suraia-button secondary" type="button" data-action="close-dialog">Close</button>
          <button class="suraia-button primary" type="button" data-action="toast">Confirm</button>
        </div>
      </section>
    </div>
  `;
}

function renderToast(): string {
  if (!state.toast) {
    return "";
  }

  return `<div class="toast" role="status">${state.toast}</div>`;
}

function bindEvents(): void {
  document.querySelectorAll<HTMLElement>("[data-action]").forEach(element => {
    element.addEventListener("click", handleAction);
  });

  document.querySelector<HTMLSelectElement>("[data-action='component-select']")?.addEventListener("change", event => {
    const target = event.currentTarget;
    if (!(target instanceof HTMLSelectElement)) {
      return;
    }
    state.selectedComponent = target.value;
    render();
  });

  document.querySelector<HTMLSelectElement>("[data-action='target-select']")?.addEventListener("change", event => {
    const target = event.currentTarget;
    if (!(target instanceof HTMLSelectElement)) {
      return;
    }
    state.selectedTarget = normalizeTarget(target.value);
    render();
  });

  document.querySelector<HTMLFormElement>(".signup-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!(form instanceof HTMLFormElement)) {
      return;
    }
    const data = new FormData(form);
    const value = String(data.get("name") ?? "").trim();
    state.formName = value;
    state.formError = value.length < 3 ? "Use at least three characters." : "";
    state.toast = state.formError ? "" : "Input validated by generated TypeScript.";
    render();
    scheduleToastClear();
  });

  document.addEventListener("keydown", handleKeydown, { once: true });
}

function handleAction(event: Event): void {
  const target = event.currentTarget;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const action = target.dataset["action"];

  if (action === "page") {
    event.preventDefault();
    state.page = normalizePage(target.dataset["page"]);
    render();
    return;
  }

  if (action === "theme") {
    state.theme = state.theme === "light" ? "dark" : "light";
    render();
    return;
  }

  if (action === "dialog") {
    state.dialogOpen = true;
    render();
    return;
  }

  if (action === "close-dialog") {
    state.dialogOpen = false;
    render();
    return;
  }

  if (action === "toast") {
    state.dialogOpen = false;
    state.toast = "Dialog action confirmed.";
    render();
    scheduleToastClear();
    return;
  }

  if (action === "generate") {
    runGeneration(false);
    return;
  }

  if (action === "simulate-error") {
    runGeneration(true);
    return;
  }

  if (action === "progress") {
    state.progress = state.progress >= 100 ? 12 : Math.min(100, state.progress + 17);
    render();
    return;
  }

  if (action === "tab") {
    state.activeTab = normalizeTab(target.dataset["tab"]);
    render();
  }
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === "Escape" && state.dialogOpen) {
    state.dialogOpen = false;
    render();
    return;
  }

  document.addEventListener("keydown", handleKeydown, { once: true });
}

function runGeneration(forceError: boolean): void {
  state.generatorStatus = "loading";
  render();

  window.setTimeout(() => {
    state.generatorStatus = forceError || state.selectedTarget === "arrow" || state.selectedTarget === "remix" ? "error" : "success";
    state.progress = state.generatorStatus === "success" ? 100 : state.progress;
    render();
  }, 650);
}

function scheduleToastClear(): void {
  window.setTimeout(() => {
    state.toast = "";
    render();
  }, 2200);
}

function normalizePage(value: string | undefined): PageId {
  if (value === "generator" || value === "components" || value === "instructions") {
    return value;
  }
  return "overview";
}

function normalizeTarget(value: string): ExampleState["selectedTarget"] {
  if (value === "react" || value === "arrow" || value === "remix") {
    return value;
  }
  return "vanilla";
}

function normalizeTab(value: string | undefined): ExampleState["activeTab"] {
  if (value === "behavior" || value === "accessibility") {
    return value;
  }
  return "anatomy";
}

function targetLabel(value: ExampleState["selectedTarget"]): string {
  const labels: Record<ExampleState["selectedTarget"], string> = {
    vanilla: "Vanilla TypeScript",
    react: "React TypeScript",
    arrow: "Arrow.js",
    remix: "Remix SQL generation",
  };
  return labels[value];
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
