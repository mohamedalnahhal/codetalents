import type { Action } from 'svelte/action';
import { popoverManager } from '$lib/utils/popupManager';

interface PopoverActionOptions {
  onClose: () => void;
  ignoreScroll?: boolean;
}

export const popover: Action<HTMLElement, PopoverActionOptions> = (node, options) => {
  const popup = {
    element: node,
    close: options.onClose,
    ignoreScroll: options.ignoreScroll ?? false
  };

  popoverManager.register(popup);

  return {
    destroy() {
      popoverManager.unregister(popup);
    }
  };
};
