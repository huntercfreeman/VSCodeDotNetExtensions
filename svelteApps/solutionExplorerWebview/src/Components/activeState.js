import { writable } from 'svelte/store';

export const activeIdeFileWrap = writable(undefined);
export const activeIdeFileHandleOnKeyDownWrap = writable(undefined);

const key = {};

export { key };