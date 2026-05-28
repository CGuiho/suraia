/** @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved. */

export { createComponentPage };

import type { BlueprintRecord } from "../blueprints/types";
import {
  renderPreviewHtml,
} from "../preview/render-preview";
import { renderMatrix } from "../preview/render-matrix";
import {
  getDefaultControlState,
} from "../preview/apply-controls";
import type { ControlState } from "../preview/apply-controls";
import { createControlsPanel } from "./controls-panel";
import { createCodePanel } from "./code-panel";
import { createDependencyPanel } from "./dependency-panel";

function createComponentPage(
  blueprint: BlueprintRecord,
  allBlueprints: BlueprintRecord[],
  onNavigate: (slug: string) => void
): HTMLElement {
  const page = document.createElement("div");
  page.className = "wb-page";

  const header = createHeader(blueprint);
  page.appendChild(header);

  const body = document.createElement("div");
  body.className = "wb-page-body";
  page.appendChild(body);

  const mainArea = document.createElement("div");
  mainArea.className = "wb-page-main";
  body.appendChild(mainArea);

  const canvasWrapper = document.createElement("div");
  canvasWrapper.className = "wb-canvas-wrapper";
  mainArea.appendChild(canvasWrapper);

  const codePanel = createCodePanel(blueprint);
  mainArea.appendChild(codePanel);

  const rightPanel = document.createElement("div");
  rightPanel.className = "wb-page-right";
  body.appendChild(rightPanel);

  let controls = getDefaultControlState(blueprint);

  const controlsPanel = createControlsPanel(
    blueprint,
    controls,
    (newState) => {
      controls = newState;
      updatePreview(canvasWrapper, blueprint, newState);
    }
  );
  rightPanel.appendChild(controlsPanel);

  const depPanel = createDependencyPanel(
    blueprint,
    allBlueprints,
    (slug) => onNavigate(slug)
  );
  rightPanel.appendChild(depPanel);

  updatePreview(canvasWrapper, blueprint, controls);

  const matrixWrapper = document.createElement("div");
  matrixWrapper.className = "wb-matrix-container";
  matrixWrapper.style.display = "none";
  mainArea.appendChild(matrixWrapper);
  renderMatrixContent(matrixWrapper, blueprint);

  codePanel.addEventListener("tabchange", ((e: Event) => {
    const detail = (e as CustomEvent).detail as { tab: string };
    if (detail.tab === "preview") {
      canvasWrapper.style.display = "";
      matrixWrapper.style.display = "none";
    } else if (detail.tab === "matrix") {
      canvasWrapper.style.display = "none";
      matrixWrapper.style.display = "";
      renderMatrixContent(matrixWrapper, blueprint);
    } else {
      canvasWrapper.style.display = "none";
      matrixWrapper.style.display = "none";
    }
  }) as EventListener);

  return page;
}

function createHeader(blueprint: BlueprintRecord): HTMLElement {
  const header = document.createElement("header");
  header.className = "wb-page-header";

  const left = document.createElement("div");
  left.className = "wb-page-header-left";

  const name = document.createElement("h2");
  name.className = "wb-page-title";
  name.textContent = blueprint.name;
  left.appendChild(name);

  const desc = document.createElement("p");
  desc.className = "wb-page-desc";
  desc.textContent = blueprint.description;
  left.appendChild(desc);

  header.appendChild(left);

  const right = document.createElement("div");
  right.className = "wb-page-header-right";

  const tier = document.createElement("span");
  tier.className = "wb-badge wb-badge-tier";
  tier.textContent = `Tier ${blueprint.tier}`;
  right.appendChild(tier);

  const cat = document.createElement("span");
  cat.className = "wb-badge wb-badge-category";
  cat.textContent = blueprint.category;
  right.appendChild(cat);

  const depCount = document.createElement("span");
  depCount.className = "wb-badge wb-badge-deps";
  depCount.textContent = `${blueprint.dependencies.length} deps`;
  right.appendChild(depCount);

  const fileCount = 6 - blueprint.problems.length;
  const healthLabel =
    fileCount === 6 ? `${fileCount}/6 files` : `${fileCount}/6 files`;
  const health = document.createElement("span");
  health.className = `wb-badge wb-badge-health ${
    blueprint.problems.length > 0 ? "wb-badge-warn" : "wb-badge-ok"
  }`;
  health.textContent = healthLabel;
  if (blueprint.problems.length > 0) {
    health.title = blueprint.problems.join("; ");
  }
  right.appendChild(health);

  header.appendChild(right);

  return header;
}

function updatePreview(
  wrapper: HTMLElement,
  blueprint: BlueprintRecord,
  controls: ControlState
): void {
  const iframe = wrapper.querySelector("iframe");
  const html = renderPreviewHtml(blueprint, {
    variants: controls.variants,
    states: controls.states,
    attributes: controls.attributes,
    colorScheme: controls.colorScheme,
    width: controls.width,
  });

  if (iframe) {
    iframe.srcdoc = html;
    iframe.style.maxWidth = controls.width;
  } else {
    wrapper.innerHTML = "";
    const newIframe = document.createElement("iframe");
    newIframe.className = "wb-preview-iframe";
    newIframe.srcdoc = html;
    newIframe.style.maxWidth = controls.width;
    newIframe.style.width = "100%";
    newIframe.style.border = "none";
    newIframe.sandbox.add("allow-scripts");
    wrapper.appendChild(newIframe);
  }
}

function renderMatrixContent(
  container: HTMLElement,
  blueprint: BlueprintRecord
): void {
  container.innerHTML = "";

  const cells = renderMatrix(blueprint);

  if (cells.length > 0 && cells[0]?.label === "" && cells[0]?.html === "") {
    const notice = document.createElement("div");
    notice.className = "wb-matrix-notice";
    notice.textContent =
      "Matrix truncated. Too many variant combinations to display.";
    container.appendChild(notice);
    return;
  }

  for (const cell of cells) {
    const card = document.createElement("div");
    card.className = "wb-matrix-cell";

    const label = document.createElement("div");
    label.className = "wb-matrix-cell-label";
    label.textContent = cell.label;
    card.appendChild(label);

    const iframe = document.createElement("iframe");
    iframe.className = "wb-matrix-cell-iframe";
    iframe.srcdoc = cell.html;
    iframe.sandbox.add("allow-scripts");
    card.appendChild(iframe);

    container.appendChild(card);
  }
}
