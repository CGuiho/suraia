/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import type { CSSProperties, FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";

export { App };

type PageId = "overview" | "composer" | "components" | "instructions";
type BuildState = "idle" | "loading" | "success" | "error";
type TargetId = "react" | "vanilla" | "arrow" | "remix";
type TabId = "structure" | "behavior" | "tokens";

interface GeneratedButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

interface GeneratedDialogProps {
  opened: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

interface Metric {
  label: string;
  value: string;
  detail: string;
}

const enUS = {
  brand: {
    title: "Suraia",
    subtitle: "React TypeScript",
  },
  nav: {
    overview: "Overview",
    composer: "Composer",
    components: "Components",
    instructions: "Instructions",
  },
  hero: {
    eyebrow: "Bun React target",
    title: "Blueprints compiled into local React components.",
    body:
      "This app follows Bun's React dev-server structure and demonstrates generated local TSX components rather than importing a Suraia runtime.",
    primaryAction: "Compose component",
    secondaryAction: "Open dialog",
  },
  composer: {
    eyebrow: "Dependency resolver",
    title: "Select a blueprint, resolve dependencies, then generate local files.",
    componentLabel: "Component",
    targetLabel: "Target",
    run: "Run generation",
    fail: "Test blocked target",
    emptyTitle: "No output yet.",
    emptyBody: "Run the generator to see loading, success, and blocked-target states.",
    successTitle: "Generated local files.",
    successBody: "The selected blueprint was translated into target-owned code and styles.",
    errorTitle: "Target is documented for later.",
    errorBody: "Use React or Vanilla today. Arrow.js and Remix SQL generation are listed as planned targets.",
  },
  components: {
    eyebrow: "Generated UI kit",
    title: "React components created from the same blueprint contracts.",
    formLabel: "Blueprint consumer",
    formHelp: "The generated field keeps label, helper text, and error text in predictable positions.",
    submit: "Validate",
    formError: "Use at least three characters.",
    formSuccess: "Input accepted by generated React state.",
  },
  instructions: {
    eyebrow: "Usage path",
    title: "React and Vanilla are active examples. Arrow.js and Remix are next-generation targets.",
  },
  dialog: {
    title: "Generated React Dialog",
    body: "This dialog is controlled by local React state and follows the Suraia accessibility contract for modal disclosure.",
    close: "Close",
    confirm: "Confirm",
  },
};

const t = enUS;

const metrics: Metric[] = [
  { label: "Blueprints", value: "111", detail: "component contracts completed" },
  { label: "Runtime imports", value: "0", detail: "generated app owns final code" },
  { label: "Bun target", value: "HTML", detail: "dev server and static build" },
  { label: "States", value: "5", detail: "idle, loading, success, error, dialog" },
];

const componentOptions = ["Button", "Dialog", "Tabs", "ColorInput", "Stepper", "Table"] as const;

function App() {
  const [page, setPage] = useState<PageId>("overview");
  const [scheme, setScheme] = useState<"light" | "dark">("light");
  const [dialogOpened, setDialogOpened] = useState(false);
  const [componentName, setComponentName] = useState<(typeof componentOptions)[number]>("Dialog");
  const [target, setTarget] = useState<TargetId>("react");
  const [buildState, setBuildState] = useState<BuildState>("idle");
  const [progress, setProgress] = useState(62);
  const [activeTab, setActiveTab] = useState<TabId>("structure");
  const [name, setName] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const id = window.setTimeout(() => {
      setToast("");
    }, 2200);

    return () => {
      window.clearTimeout(id);
    };
  }, [toast]);

  useEffect(() => {
    if (buildState !== "loading") {
      return undefined;
    }

    const id = window.setTimeout(() => {
      const blocked = target === "arrow" || target === "remix";
      setBuildState(blocked ? "error" : "success");
      setProgress(blocked ? progress : 100);
    }, 650);

    return () => {
      window.clearTimeout(id);
    };
  }, [buildState, progress, target]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 3) {
      setFormMessage(t.components.formError);
      return;
    }
    setFormMessage(t.components.formSuccess);
    setToast(t.components.formSuccess);
  }

  return (
    <main className="suraia-root shell" data-suraia-color-scheme={scheme}>
      <header className="topbar">
        <button className="brand" type="button" onClick={() => setPage("overview")} aria-label="Suraia React home">
          <span className="brand-mark" aria-hidden="true" />
          <span>
            <strong>{t.brand.title}</strong>
            <small>{t.brand.subtitle}</small>
          </span>
        </button>
        <nav className="nav" aria-label="Example pages">
          {toPageEntries(t.nav).map(item => (
            <button
              className={`nav-link ${page === item.id ? "is-active" : ""}`}
              key={item.id}
              type="button"
              onClick={() => setPage(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <GeneratedButton variant="secondary" onClick={() => setScheme(scheme === "light" ? "dark" : "light")}>
          {scheme === "light" ? "Dark scheme" : "Light scheme"}
        </GeneratedButton>
      </header>

      {page === "overview" ? (
        <OverviewPage onCompose={() => setPage("composer")} onDialog={() => setDialogOpened(true)} />
      ) : null}
      {page === "composer" ? (
        <ComposerPage
          buildState={buildState}
          componentName={componentName}
          progress={progress}
          target={target}
          onAdvance={() => setProgress(progress >= 100 ? 18 : Math.min(100, progress + 13))}
          onComponentChange={setComponentName}
          onRun={() => setBuildState("loading")}
          onTargetChange={setTarget}
        />
      ) : null}
      {page === "components" ? (
        <ComponentsPage
          activeTab={activeTab}
          formMessage={formMessage}
          name={name}
          onNameChange={setName}
          onSubmit={handleSubmit}
          onTabChange={setActiveTab}
        />
      ) : null}
      {page === "instructions" ? <InstructionsPage /> : null}

      <GeneratedDialog opened={dialogOpened} title={t.dialog.title} onClose={() => setDialogOpened(false)}>
        <p>{t.dialog.body}</p>
        <div className="actions">
          <GeneratedButton variant="secondary" onClick={() => setDialogOpened(false)}>
            {t.dialog.close}
          </GeneratedButton>
          <GeneratedButton
            onClick={() => {
              setDialogOpened(false);
              setToast("Dialog action confirmed.");
            }}
          >
            {t.dialog.confirm}
          </GeneratedButton>
        </div>
      </GeneratedDialog>

      {toast ? (
        <div className="toast" role="status">
          {toast}
        </div>
      ) : null}
    </main>
  );
}

function OverviewPage(props: { onCompose: () => void; onDialog: () => void }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy reveal" style={delayStyle("0ms")}>
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>{t.hero.title}</h1>
          <p className="lede">{t.hero.body}</p>
          <div className="actions">
            <GeneratedButton onClick={props.onCompose}>{t.hero.primaryAction}</GeneratedButton>
            <GeneratedButton variant="secondary" onClick={props.onDialog}>
              {t.hero.secondaryAction}
            </GeneratedButton>
          </div>
        </div>
        <aside className="blueprint-panel reveal" style={delayStyle("90ms")} aria-label="React blueprint output">
          <div className="panel-header">
            <span>generated/components/Dialog.tsx</span>
            <strong>Owned locally</strong>
          </div>
          <pre>
            <code>{`export function Dialog(props) {
  return <section role="dialog" />;
}

// Imported by the app, not by Suraia.`}</code>
          </pre>
        </aside>
      </section>
      <section className="metric-grid" aria-label="React example metrics">
        {metrics.map((metric, index) => (
          <article className="metric-card reveal" key={metric.label} style={delayStyle(`${120 + index * 45}ms`)}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <p>{metric.detail}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function ComposerPage(props: {
  buildState: BuildState;
  componentName: string;
  progress: number;
  target: TargetId;
  onAdvance: () => void;
  onComponentChange: (value: (typeof componentOptions)[number]) => void;
  onRun: () => void;
  onTargetChange: (value: TargetId) => void;
}) {
  return (
    <section className="workspace-grid">
      <article className="workspace-card wide">
        <p className="eyebrow">{t.composer.eyebrow}</p>
        <h2>{t.composer.title}</h2>
        <div className="form-grid">
          <label className="field">
            <span>{t.composer.componentLabel}</span>
            <select
              value={props.componentName}
              onChange={event => props.onComponentChange(normalizeComponent(event.currentTarget.value))}
            >
              {componentOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>{t.composer.targetLabel}</span>
            <select value={props.target} onChange={event => props.onTargetChange(normalizeTarget(event.currentTarget.value))}>
              <option value="react">React TypeScript</option>
              <option value="vanilla">Vanilla TypeScript</option>
              <option value="arrow">Arrow.js later</option>
              <option value="remix">Remix SQL generation later</option>
            </select>
          </label>
        </div>
        <div className="actions">
          <GeneratedButton onClick={props.onRun} disabled={props.buildState === "loading"}>
            {t.composer.run}
          </GeneratedButton>
          <GeneratedButton variant="ghost" onClick={() => props.onTargetChange("remix")}>
            {t.composer.fail}
          </GeneratedButton>
        </div>
        <GenerationState state={props.buildState} />
      </article>
      <aside className="workspace-card">
        <h3>Static build progress</h3>
        <GeneratedProgress value={props.progress} />
        <p className="muted">Bun builds `src/index.html` into static browser assets while the dev server serves the React app with HMR.</p>
        <GeneratedButton variant="secondary" onClick={props.onAdvance}>
          Advance progress
        </GeneratedButton>
      </aside>
    </section>
  );
}

function GenerationState(props: { state: BuildState }) {
  if (props.state === "loading") {
    return (
      <div className="state-box loading-state">
        <span className="skeleton-line long" />
        <span className="skeleton-line medium" />
        <span className="skeleton-line short" />
      </div>
    );
  }

  if (props.state === "success") {
    return (
      <div className="state-box success-state">
        <strong>{t.composer.successTitle}</strong>
        <p>{t.composer.successBody}</p>
      </div>
    );
  }

  if (props.state === "error") {
    return (
      <div className="state-box error-state">
        <strong>{t.composer.errorTitle}</strong>
        <p>{t.composer.errorBody}</p>
      </div>
    );
  }

  return (
    <div className="state-box empty-state">
      <strong>{t.composer.emptyTitle}</strong>
      <p>{t.composer.emptyBody}</p>
    </div>
  );
}

function ComponentsPage(props: {
  activeTab: TabId;
  formMessage: string;
  name: string;
  onNameChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onTabChange: (tab: TabId) => void;
}) {
  const tabs: Array<{ id: TabId; label: string }> = [
    { id: "structure", label: "Structure" },
    { id: "behavior", label: "Behavior" },
    { id: "tokens", label: "Tokens" },
  ];

  return (
    <section className="component-layout">
      <article className="component-demo">
        <p className="eyebrow">{t.components.eyebrow}</p>
        <h2>{t.components.title}</h2>
        <div className="tab-list" role="tablist" aria-label="React generated component details">
          {tabs.map(tab => (
            <button
              className={`tab ${props.activeTab === tab.id ? "is-active" : ""}`}
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={props.activeTab === tab.id}
              onClick={() => props.onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="tab-panel" role="tabpanel">
          {tabContent(props.activeTab)}
        </div>
        <form className="signup-form" onSubmit={props.onSubmit}>
          <label className="field">
            <span>{t.components.formLabel}</span>
            <input value={props.name} onChange={event => props.onNameChange(event.currentTarget.value)} />
            <small>{t.components.formHelp}</small>
            {props.formMessage ? <em>{props.formMessage}</em> : null}
          </label>
          <GeneratedButton type="submit">{t.components.submit}</GeneratedButton>
        </form>
      </article>
      <aside className="component-list" aria-label="React component list">
        {["Button", "Dialog", "Tabs", "Progress", "Input", "Card"].map((name, index) => (
          <article className="component-row" key={name}>
            <span>{name}</span>
            <small>{index < 2 ? "Generated composite" : "Generated primitive"}</small>
            <strong>{index % 2 === 0 ? "Interactive" : "Styled"}</strong>
          </article>
        ))}
      </aside>
    </section>
  );
}

function InstructionsPage() {
  return (
    <section className="instructions">
      <article>
        <p className="eyebrow">{t.instructions.eyebrow}</p>
        <h2>{t.instructions.title}</h2>
        <ol className="instruction-list">
          <li>
            <strong>Install Suraia as a devDependency.</strong> The target app owns generated component files.
          </li>
          <li>
            <strong>Read component JSON first.</strong> Resolve dependencies before generating a composite.
          </li>
          <li>
            <strong>Generate TSX and CSS locally.</strong> Keep Suraia out of production imports.
          </li>
          <li>
            <strong>Run Bun verification.</strong> Use typecheck, build, dev, and production start scripts.
          </li>
        </ol>
      </article>
      <aside className="instruction-note">
        <strong>Later targets</strong>
        <p>Arrow.js should receive templates and reactive bindings. Remix SQL generation should map routes, actions, loaders, and typed SQL scaffolds after the React and Vanilla examples stabilize.</p>
      </aside>
    </section>
  );
}

function GeneratedButton(props: GeneratedButtonProps) {
  return (
    <button className={`suraia-button ${props.variant ?? "primary"}`} type={props.type ?? "button"} disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

function GeneratedDialog(props: GeneratedDialogProps) {
  if (!props.opened) {
    return null;
  }

  return (
    <div className="overlay" role="presentation" onClick={props.onClose}>
      <section className="dialog" role="dialog" aria-modal="true" aria-labelledby="generated-dialog-title" onClick={event => event.stopPropagation()}>
        <p className="eyebrow">Generated dialog</p>
        <h2 id="generated-dialog-title">{props.title}</h2>
        {props.children}
      </section>
    </div>
  );
}

function GeneratedProgress(props: { value: number }) {
  return (
    <div className="progress-shell" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={props.value}>
      <span style={{ width: `${props.value}%` }} />
    </div>
  );
}

function tabContent(tab: TabId): string {
  if (tab === "behavior") {
    return "Generated components keep event handlers, validation, disclosure, and selection logic in target-owned React state.";
  }
  if (tab === "tokens") {
    return "CSS custom properties preserve Suraia tokens while letting the target app override visual profiles locally.";
  }
  return "Generated TSX follows blueprint anatomy, including slots, data attributes, ARIA roles, and semantic elements.";
}

function normalizeTarget(value: string): TargetId {
  if (value === "vanilla" || value === "arrow" || value === "remix") {
    return value;
  }
  return "react";
}

function normalizeComponent(value: string): (typeof componentOptions)[number] {
  const found = componentOptions.find(option => option === value);
  return found ?? "Dialog";
}

function toPageEntries(nav: typeof t.nav): Array<{ id: PageId; label: string }> {
  return [
    { id: "overview", label: nav.overview },
    { id: "composer", label: nav.composer },
    { id: "components", label: nav.components },
    { id: "instructions", label: nav.instructions },
  ];
}

function delayStyle(value: string): CSSProperties {
  return { "--delay": value } as CSSProperties;
}
