import { writable, type Writable } from 'svelte/store';

export const errors: Writable<{message: string, id: string}[]> = writable([]);

// helper to push a new error
export function pushError(message: string) {
  errors.update((list) => [...list, { id: crypto.randomUUID(), message }]);
}

// remove error after fade-out
export function removeError(id: string) {
  errors.update((list) => list.filter((e) => e.id !== id));
}
