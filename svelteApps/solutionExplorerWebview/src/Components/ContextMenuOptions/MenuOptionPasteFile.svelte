<script lang="ts">
	import { onDestroy } from 'svelte';
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { MessageUpdatePasteIntoAny } from "../../../../../out/Messages/Update/MessageUpdatePasteIntoAny";

    export let closeMenu;

    let contextMenuTargetValue;

    const unsubscribe = contextMenuTarget.subscribe((value) => {
        contextMenuTargetValue = value;
    });

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

    onDestroy(unsubscribe);
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={pasteOnClick}
        text="Paste."
    />
{/if}
