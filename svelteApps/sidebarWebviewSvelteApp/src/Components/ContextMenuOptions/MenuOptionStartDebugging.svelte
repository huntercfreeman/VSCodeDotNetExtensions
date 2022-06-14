<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";
    import { MessageExecuteCSharpProjectDebugging } from "../../../../../out/Messages/Execute/MessageExecuteCSharpProjectDebugging";

    export let closeMenu;

    let contextMenuTargetValue;

    contextMenuTarget.subscribe((value) => {
        contextMenuTargetValue = value;
    });

    function startWithoutDebugging() {
        switch (contextMenuTargetValue.fileKind) {
            case FileKind.cSharpProject:
                let messageExecuteCSharpProjectDebugging =
                    new MessageExecuteCSharpProjectDebugging(
                        contextMenuTargetValue
                    );

                tsVscode.postMessage({
                    type: undefined,
                    value: messageExecuteCSharpProjectDebugging,
                });
                break;
        }

        closeMenu();
    }
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={startWithoutDebugging}
        text="Start debugging."
    />
{/if}
