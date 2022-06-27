<script lang="ts">
    import { onMount } from "svelte";
	import { ConstantsFocusTrap } from "../../../../../out/Constants/ConstantsFocusTrap";

    export let onKeyDown: (e: KeyboardEvent) => void;
    export let idNamespace: string;
    export let index: number;
    export let category;
    export let isFocused;
    export let inputHtmlElement;

    onMount(async () => {
        if (inputHtmlElement) {
            inputHtmlElement.focus();
        }
	});

</script>

<input on:focus={() => isFocused = true}
       on:blur={() => isFocused = false}
       bind:this={inputHtmlElement} 
       on:keydown|stopPropagation={onKeyDown}
       id={ConstantsFocusTrap.getFocusTrapId(idNamespace, category, index)}
       class="dni_focus-trap dni_unselectable dni_visually-hidden"/>