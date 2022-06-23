import { writable } from 'svelte/store';

export const activeIdeFileWrap = writable(undefined);
export const activeIdeFileHandleOnKeyDownWrap = writable(undefined);

/**
The callbacks are used to:

- Traverse parent's siblings
- Traverse sibling's children

---

- ArrowDown when there are no siblings below needs to traverse to the next sibling of the parent.

- ArrowUp when the sibling above is expanded needs to recursively traverse sibling's children.

callbacks: ((ideFile, index, children, parentIdeFile, parentIdeFileChildren) => void)[] | undefined
 */
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