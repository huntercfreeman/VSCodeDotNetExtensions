import { writable } from 'svelte/store';

export const activeIdeFileWrap = writable(undefined);
export const activeIdeFileHandleOnKeyDownWrap = writable(undefined);

// callbacks: ((ideFile, index, parentIdeFile, parentIdeFileChildren) => void)[] | undefined
export class ActiveIdeFileWrapTuple {
    constructor(ideFile, callbacks) {
        this.ideFile = ideFile;
        this.callbacks = callbacks;
    }

    ideFile;
    callbacks;
}

const key = {};

export { key };