<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";
    import { MessageExecuteProjectWithoutDebugging } from "../../../../../out/Messages/Execute/MessageExecuteCSharpProjectWithoutDebugging";
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
            case FileKind.vcxProject:

                // IProjectModel
                let projectModel: any;

                if (contextMenuTargetValue.fileKind === FileKind.cSharpProject) {
                    projectModel = (contextMenuTargetValue as CSharpProjectFile).cSharpProjectModel;
                }
                else if (contextMenuTargetValue.fileKind === FileKind.vcxProject) {
                    projectModel = (contextMenuTargetValue as VCXProjectFile).vcxProjectModel.projectIdGuid;
                }

                if (projectModel) {
                    let messageExecuteProjectWithoutDebugging =
                        new MessageExecuteProjectWithoutDebugging(
                            contextMenuTargetValue
                        );

                    tsVscode.postMessage({
                        type: undefined,
                        value: messageExecuteProjectWithoutDebugging,
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
        text="Start without debugging."
    />
{/if}
