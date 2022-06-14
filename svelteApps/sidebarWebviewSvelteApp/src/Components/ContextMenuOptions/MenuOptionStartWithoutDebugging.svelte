<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { MessageExecuteCSharpProjectWithoutDebugging } from "../../../../../out/Messages/Execute/MessageExecuteCSharpProjectWithoutDebugging";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";

    export let closeMenu;

    let contextMenuTargetValue;

    contextMenuTarget.subscribe((value) => {
        contextMenuTargetValue = value;
    });

    function startWithoutDebugging() {
        switch (contextMenuTargetValue.fileKind) {
            case FileKind.cSharpProject:
                let messageExecuteCSharpProjectWithoutDebugging =
                    new MessageExecuteCSharpProjectWithoutDebugging(
                        contextMenuTargetValue
                    );

                tsVscode.postMessage({
                    type: undefined,
                    value: messageExecuteCSharpProjectWithoutDebugging,
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
        text="Start without debugging."
    />
{/if}
