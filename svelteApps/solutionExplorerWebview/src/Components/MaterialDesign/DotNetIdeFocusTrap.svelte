<script lang="ts">
import { onMount } from "svelte";

    export let onKeyDown: (e: KeyboardEvent) => void;

    let inputHtmlElement;

    onMount(async () => {
        if (inputHtmlElement) {
            inputHtmlElement.focus();
        }
	});

</script>

<input bind:this={inputHtmlElement} on:keydown|stopPropagation={onKeyDown}
       class="dni_focus-trap dni_unselectable dni_visually-hidden"/>
