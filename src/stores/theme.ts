import { page } from '$app/state';
import { writable, type Writable } from 'svelte/store';
import { pushError } from './errors';
import { browser } from '$app/environment';

function syncedThemeStore(init: string) {
  const { subscribe, set: _set, update } = writable(init);

  return {
      subscribe,
      set(value: string) {
        if (page.data.user && browser) {
          fetch(`/set_theme?theme=${value}`).then((res) => {
            if (!res.ok) {
              pushError("failed to update appearance");
              return;
            }
            _set(value);
          }).catch((reason) => {
            pushError(reason);
          })
        }
        else _set(value);
      },
      update
  } as Writable<string>;
}

const initialTheme =
  typeof localStorage !== 'undefined' ? localStorage.getItem('theme') || 'sys' : 'sys';

export const theme = syncedThemeStore(initialTheme);
export const actual_theme: Writable<string> = writable();

theme.subscribe(async (value) => {
  if (typeof document !== 'undefined') {
    const html = document.documentElement;
    html.classList.add("notransition");
    if (value === 'dark' || (value === 'sys' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      actual_theme.set("dark");
      html.classList.add('dark');
    } else {
      actual_theme.set("light");
      html.classList.remove('dark');
    }
    if (value !== 'sys') localStorage.setItem('theme', value);
    else localStorage.removeItem('theme');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        html.classList.remove("notransition");
      });
    });
  }
});