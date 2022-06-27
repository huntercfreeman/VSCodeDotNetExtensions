<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { MessageUpdateCopyAny } from "../../../../../out/Messages/Update/MessageUpdateCopyAny";

    export let closeMenu;

	$: contextMenuTargetValue = $contextMenuTarget;

    function copyOnClick() {
        let messageUpdateCopyAny =
            new MessageUpdateCopyAny(contextMenuTargetValue);

        tsVscode.postMessage({
            type: undefined,
            value: messageUpdateCopyAny,
        });

        closeMenu();
    }

    function onKeyDown() {
    }
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={copyOnClick}
        text="Copy."
    />
{/if}
