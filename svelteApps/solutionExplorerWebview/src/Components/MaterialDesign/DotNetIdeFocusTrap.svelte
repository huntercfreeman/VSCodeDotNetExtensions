<script lang="ts">
    import { onDestroy, onMount } from "svelte";
	import { ConstantsFocusTrap } from "../../../../../out/Constants/ConstantsFocusTrap";

    export let onKeyDown: (e: KeyboardEvent) => void;
    export let idNamespace: string;
    export let isFocused;
    export let index: number = 0;
    export let category = 0;
    export let inputHtmlElement = undefined;

    onMount(async () => {
        if (inputHtmlElement) {
            inputHtmlElement.focus();
        }
	});

    onDestroy(() => isFocused = false);

</script>

<input on:focus={() => isFocused = true}
       on:blur={() => isFocused = false}
       bind:this={inputHtmlElement} 
       on:keydown|stopPropagation={onKeyDown}
       id={ConstantsFocusTrap.getFocusTrapId(idNamespace, category, index)}
       class="dni_focus-trap dni_unselectable dni_visually-hidden"/>