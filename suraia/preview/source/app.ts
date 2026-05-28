/** @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved. */

export { initApp };

import { loadAllBlueprints } from "./blueprints/load-blueprints";
import { createSidebar } from "./ui/sidebar";
import { createComponentPage } from "./ui/component-page";

function initApp(): void {
  const blueprints = loadAllBlueprints();

  if (blueprints.length === 0) {
    document.body.innerHTML =
      '<div class="wb-error">No blueprint components found in source/components/.</div>';
    return;
  }

  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = "";

  const container = document.createElement("div");
  container.className = "wb-container";
  app.appendChild(container);

  const sidebarEl = createSidebar(blueprints, (slug) => {
    navigateTo(slug, container, blueprints, sidebarEl);
  });
  container.appendChild(sidebarEl);

  const mainEl = document.createElement("main");
  mainEl.className = "wb-main";
  container.appendChild(mainEl);

  function handleRoute(): void {
    const hash = window.location.hash;
    let slug: string | null = null;

    if (hash.startsWith("#/components/")) {
      slug = hash.slice("#/components/".length);
    }

    if (!slug || !blueprints.find((b) => b.slug === slug)) {
      const first = blueprints[0];
      if (first) {
        window.location.hash = `#/components/${first.slug}`;
        return;
      }
    }

    if (slug) {
      const bp = blueprints.find((b) => b.slug === slug);
      if (bp) {
        renderComponent(mainEl, bp, blueprints, sidebarEl, container);
        highlightSidebarItem(sidebarEl, slug);
      }
    }
  }

  window.addEventListener("hashchange", handleRoute);
  handleRoute();
}

function navigateTo(
  slug: string,
  _container: HTMLElement,
  _blueprints: ReturnType<typeof loadAllBlueprints>,
  _sidebarEl: HTMLElement
): void {
  window.location.hash = `#/components/${slug}`;
}

function renderComponent(
  mainEl: HTMLElement,
  blueprint: ReturnType<typeof loadAllBlueprints>[number],
  allBlueprints: ReturnType<typeof loadAllBlueprints>,
  sidebarEl: HTMLElement,
  container: HTMLElement
): void {
  mainEl.innerHTML = "";
  const page = createComponentPage(
    blueprint,
    allBlueprints,
    (slug) => {
      navigateTo(slug, container, allBlueprints, sidebarEl);
    }
  );
  mainEl.appendChild(page);
}

function highlightSidebarItem(sidebar: HTMLElement, slug: string): void {
  for (const el of sidebar.querySelectorAll(".wb-sidebar-item")) {
    el.classList.remove("wb-sidebar-item--active");
  }
  const item = sidebar.querySelector(`[data-slug="${slug}"]`);
  if (item) {
    item.classList.add("wb-sidebar-item--active");
  }
}
