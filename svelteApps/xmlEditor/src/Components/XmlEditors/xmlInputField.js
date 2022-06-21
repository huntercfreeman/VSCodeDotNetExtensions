import { writable } from 'svelte/store';

export const activeInputField = writable(undefined);

const key = {};

export { key };