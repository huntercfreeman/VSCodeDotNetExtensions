<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";
    import { MessageExecuteProjectDebugging } from "../../../../../out/Messages/Execute/MessageExecuteProjectDebugging";
import type { CSharpProjectFile } from "../../../../../out/FileSystem/Files/CSharp/CSharpProjectFile";
import type { VCXProjectFile } from "../../../../../out/FileSystem/Files/CPlusPlus/VCXProjectFile";

    export let closeMenu;

    let contextMenuTargetValue;

    contextMenuTarget.subscribe((value) => {
        contextMenuTargetValue = value;
    });

    function startWithoutDebugging() {
        switch (contextMenuTargetValue.fileKind) {
            case FileKind.cSharpProject:
            case FileKind.vcxProjectFile:

                // IProjectModel
                let projectModel: any;

                if (contextMenuTargetValue.fileKind === FileKind.cSharpProject) {
                    projectModel = (contextMenuTargetValue as CSharpProjectFile).cSharpProjectModel;
                }
                else if (contextMenuTargetValue.fileKind === FileKind.vcxProject) {
                    projectModel = (contextMenuTargetValue as VCXProjectFile).vcxProjectModel.projectIdGuid;
                }

                if (projectModel) {
                    let messageExecuteProjectDebugging =
                    new MessageExecuteProjectDebugging(
                        contextMenuTargetValue
                    );

                    tsVscode.postMessage({
                        type: undefined,
                        value: messageExecuteProjectDebugging,
                    });
                }
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
