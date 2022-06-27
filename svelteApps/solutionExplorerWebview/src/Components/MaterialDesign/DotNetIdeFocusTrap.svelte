<script lang="ts">
import { onMount } from "svelte";

    export let onKeyDown: (e: KeyboardEvent) => void;
    export let idNamespace: string;
    export let index: number;
    export let isFocused;

    let inputHtmlElement;

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
       id="dni_focus-trap_{idNamespace}-{index}"
       class="dni_focus-trap dni_unselectable dni_visually-hidden"/>
