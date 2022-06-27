<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { MessageUpdatePasteIntoAny } from "../../../../../out/Messages/Update/MessageUpdatePasteIntoAny";

    export let closeMenu;
    export let idNamespace: string;
    export let index: number;

    $: contextMenuTargetValue = $contextMenuTarget;

    $: isFocusedCssClass = isFocused
        ? "dni_focused"
        : "";
    
    let isFocused = false;

    function pasteOnClick() {

        let messageUpdatePasteIntoAny =
            new MessageUpdatePasteIntoAny(
                contextMenuTargetValue
            );

        tsVscode.postMessage({
            type: undefined,
            value: messageUpdatePasteIntoAny,
        });

        closeMenu();
    }

    function onKeyDown() {
    }
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={pasteOnClick}
        text="Paste."
        {idNamespace}
        {index}
        bind:isFocused={isFocused}
    />
{/if}
