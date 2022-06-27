import { writable } from 'svelte/store';

export const contextMenuTarget = writable(undefined);
export const contextMenuOptionTarget = writable(undefined);

const key = {};

export { key };