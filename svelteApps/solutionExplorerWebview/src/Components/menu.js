import { writable } from 'svelte/store';

export const contextMenuTarget = writable(undefined);

const key = {};

export { key };