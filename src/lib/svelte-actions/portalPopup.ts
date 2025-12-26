// src/lib/actions/portalPopup.ts
import { tick } from "svelte";

interface PortalPopupOptions {
  trigger: HTMLElement | null;       // the element that positions popup relative to it
  align?: "right" | "left";          // preferred side
  margin?: number;                   // gap between trigger and popup
  open?: boolean;                    // controls portal mount/unmount
}

export function portalPopup(
  popupEl: HTMLElement,
  options: PortalPopupOptions
) {
  let containerEl: HTMLDivElement | null = null;
  let ro: ResizeObserver | null = null;
  let triggerEl: HTMLElement | null = options.trigger ?? null;

  const margin = options.margin ?? 6;
  const align = options.align ?? "right";

  function ensureContainer() {
    if (!containerEl) {
      containerEl = document.createElement("div");
      containerEl.style.position = "absolute";
      containerEl.style.top = "0";
      containerEl.style.left = "0";
      containerEl.style.zIndex = "9999";
      document.body.appendChild(containerEl);
    }
  }

  function mountToBody() {
    if (!popupEl) return;
    ensureContainer();
    if (popupEl.parentElement !== containerEl) {
      containerEl!.appendChild(popupEl);
    }
    updatePosition();
  }

  function unmountFromBody() {
    if (popupEl && popupEl.parentElement === containerEl) {
      containerEl!.removeChild(popupEl);
    }
    if (containerEl && containerEl.childElementCount === 0) {
      containerEl.remove();
      containerEl = null;
    }
  }

  function updatePosition() {
    if (!triggerEl || !popupEl) return;

    const trigRect = triggerEl.getBoundingClientRect();
    const popRect = popupEl.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;

    let top = trigRect.top + window.scrollY;
    let left: number;

    if (align === "right") {
      left = trigRect.right + window.scrollX + margin;
      if (left + popRect.width > window.scrollX + vw - 8) {
        left = trigRect.left + window.scrollX - popRect.width - margin;
      }
    } else {
      left = trigRect.left + window.scrollX - margin;
      if (left < window.scrollX + 8) {
        left = trigRect.right + window.scrollX + margin;
      }
    }

    if (top + popRect.height > window.scrollY + vh - 8)
      top = window.scrollY + vh - popRect.height - 8;

    if (top < window.scrollY + 8)
      top = window.scrollY + 8;

    popupEl.style.position = "absolute";
    popupEl.style.left = `${Math.round(left)}px`;
    popupEl.style.top = `${Math.round(top)}px`;
  }

  function setupResizeObserver() {
    ro = new ResizeObserver(() => updatePosition());
    ro.observe(popupEl);
  }

  function cleanup() {
    ro?.disconnect();
    unmountFromBody();
    window.removeEventListener("resize", updatePosition);
    window.removeEventListener("scroll", updatePosition);
  }

  async function init() {
    await tick();

    if (options.open) {
      mountToBody();
    }

    window.addEventListener("resize", updatePosition, { passive: true });
    window.addEventListener("scroll", updatePosition, { passive: true });

    setupResizeObserver();
  }

  init();

  return {
    update(newOpts: PortalPopupOptions) {
      triggerEl = newOpts.trigger ?? triggerEl;

      if (newOpts.open && !options.open) {
        mountToBody();
      } else if (!newOpts.open && options.open) {
        unmountFromBody();
      }

      options = newOpts;

      tick().then(updatePosition);
    },
    destroy() {
      cleanup();
    }
  };
}
