<script lang="ts">
	import { onDestroy } from 'svelte';
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { MessageUpdateCutAny } from "../../../../../out/Messages/Update/MessageUpdateCutAny";

    export let closeMenu;
    export let idNamespace: string;
    export let index: number;

	$: contextMenuTargetValue = $contextMenuTarget;

    $: isFocusedCssClass = isFocused
        ? "dni_focused"
        : "";
    
    let isFocused = false;

    function cutOnClick() {
        let messageUpdateCutAny =
            new MessageUpdateCutAny(contextMenuTargetValue);

        tsVscode.postMessage({
            type: undefined,
            value: messageUpdateCutAny,
        });

        closeMenu();
    }

    function onKeyDown() {
    }
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={cutOnClick}
        text="Cut."
        {idNamespace}
        {index}
        bind:isFocused={isFocused}
    />
{/if}
