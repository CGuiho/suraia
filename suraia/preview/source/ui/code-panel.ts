/** @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved. */

export { createCodePanel };

import type { BlueprintRecord } from "../blueprints/types";

type TabId = "preview" | "matrix" | "structure" | "spec" | "styles" | "behavior" | "guide" | "tests";

function createCodePanel(blueprint: BlueprintRecord): HTMLElement {
  const panel = document.createElement("div");
  panel.className = "wb-code-panel";

  const tabBar = document.createElement("div");
  tabBar.className = "wb-tab-bar";
  panel.appendChild(tabBar);

  const content = document.createElement("div");
  content.className = "wb-tab-content";
  panel.appendChild(content);

  const tabs: { id: TabId; label: string; render: () => void }[] = [
    {
      id: "preview",
      label: "Preview",
      render: () => {
        content.innerHTML = "";
        const ph = document.createElement("div");
        ph.className = "wb-tab-preview-placeholder";
        ph.textContent = "Preview rendered in canvas area";
        ph.dataset["previewTab"] = "true";
        content.appendChild(ph);
      },
    },
    {
      id: "matrix",
      label: "Matrix",
      render: () => {
        content.innerHTML = "";
        const ph = document.createElement("div");
        ph.className = "wb-tab-matrix-placeholder";
        ph.textContent = "Matrix rendered in canvas area";
        ph.dataset["matrixTab"] = "true";
        content.appendChild(ph);
      },
    },
    {
      id: "structure",
      label: "Structure",
      render: () => renderCodeContent(content, blueprint.structureHtml, "html"),
    },
    {
      id: "spec",
      label: "Spec",
      render: () => {
        renderCodeContent(
          content,
          JSON.stringify(blueprint.variants || blueprint, null, 2),
          "json"
        );
      },
    },
    {
      id: "styles",
      label: "Styles",
      render: () => renderCodeContent(content, blueprint.componentCss, "css"),
    },
    {
      id: "behavior",
      label: "Behavior",
      render: () => renderCodeContent(content, blueprint.controllerTs, "ts"),
    },
    {
      id: "guide",
      label: "Guide",
      render: () => renderGuideContent(content, blueprint.guideMarkdown),
    },
    {
      id: "tests",
      label: "Tests",
      render: () => renderCodeContent(content, blueprint.testTs, "ts"),
    },
  ];

  for (const tab of tabs) {
    const btn = document.createElement("button");
    btn.className = "wb-tab-btn";
    btn.textContent = tab.label;
        btn.dataset["tab"] = tab.id;
    btn.addEventListener("click", () => {
      for (const b of tabBar.querySelectorAll(".wb-tab-btn")) {
        b.classList.remove("wb-tab-btn--active");
      }
      btn.classList.add("wb-tab-btn--active");
      tab.render();
      panel.dispatchEvent(
        new CustomEvent("tabchange", { detail: { tab: tab.id } })
      );
    });
    if (tab.id === "preview") {
      btn.classList.add("wb-tab-btn--active");
    }
    tabBar.appendChild(btn);
  }

  tabs.find((t) => t.id === "preview")?.render();

  return panel;
}

function renderCodeContent(
  container: HTMLElement,
  code: string,
  lang: string
): void {
  container.innerHTML = "";
  if (!code) {
    const empty = document.createElement("p");
    empty.className = "wb-code-empty";
    empty.textContent = "(empty)";
    container.appendChild(empty);
    return;
  }
  const pre = document.createElement("pre");
  pre.className = "wb-code-block";
  const codeEl = document.createElement("code");
  codeEl.className = `wb-code-lang-${lang}`;
  codeEl.textContent = code;
  pre.appendChild(codeEl);
  container.appendChild(pre);
}

function renderGuideContent(container: HTMLElement, md: string): void {
  container.innerHTML = "";
  if (!md) {
    const empty = document.createElement("p");
    empty.className = "wb-code-empty";
    empty.textContent = "(empty)";
    container.appendChild(empty);
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "wb-guide-content";

  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\n\n/g, "</p><p>");
  html = html.replace(/\n/g, "<br>");
  html = `<p>${html}</p>`;

  wrapper.innerHTML = html;
  container.appendChild(wrapper);
}
