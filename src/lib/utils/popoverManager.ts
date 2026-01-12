import { browser } from "$app/environment";

type Popover = {
  element: HTMLElement;
  close: () => void;
  ignoreScroll?: boolean;
};

class PopoverManager {
  private popups = new Set<Popover>();

  constructor() {
    if (browser) {
      document.addEventListener('click', this.handleClickOutside, true);
      window.addEventListener('scroll', this.handleScroll, { passive: true });
      document.addEventListener('keydown', this.handleEscape);
    }
  }

  register(popup: Popover) {
    this.popups.add(popup);
  }

  unregister(popup: Popover) {
    this.popups.delete(popup);
  }

  private handleClickOutside = (event: MouseEvent) => {
    this.popups.forEach(popup => {
      if (!popup.element.contains(event.target as Node)) {
        popup.close();
      }
    });
  };

  private handleScroll = () => {
    this.popups.forEach(popup => {
      if (!popup.ignoreScroll) popup.close();
    });
  };

  private handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.popups.forEach(popup => popup.close());
    }
  };
}

export const popoverManager = new PopoverManager();
