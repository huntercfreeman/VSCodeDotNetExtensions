<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";
    import { MessageUpdatePutProjectInSolutionFolder } from "../../../../../out/Messages/Update/MessageUpdatePutProjectInSolutionFolder";
import type { CSharpProjectFile } from "../../../../../out/FileSystem/Files/CSharp/CSharpProjectFile";
import type { VCXProjectFile } from "../../../../../out/FileSystem/Files/CPlusPlus/VCXProjectFile";

    export let closeMenu;

    let contextMenuTargetValue;
    let solutionFolderName: string | undefined;

    contextMenuTarget.subscribe((value) => {
        contextMenuTargetValue = value;
    });

    function putInSolutionFolder() {
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
                    let messageUpdatePutProjectInSolutionFolder =
                        new MessageUpdatePutProjectInSolutionFolder(
                            contextMenuTargetValue,
                            solutionFolderName
                        );

                    tsVscode.postMessage({
                        type: undefined,
                        value: messageUpdatePutProjectInSolutionFolder,
                    });
                }
        }

        closeMenu();
    }

    function startFormPutInSolutionFolder() {
        solutionFolderName = "";
    }
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={startFormPutInSolutionFolder}
        text="Put in Solution Folder"
    />

    {#if solutionFolderName !== undefined}
        <input
            placeholder="Solution Folder Name"
            bind:value={solutionFolderName}
        />

        <div>
            <div>
                <div>Create Solution Folder:</div>
                <div style="margin-left: 12px;">
                    <em>{solutionFolderName}</em>
                </div>
            </div>
        </div>

        <button on:click={putInSolutionFolder}>Accept</button>
        <button on:click={closeMenu}>Decline</button>
    {/if}
{/if}

<style>
    em {
        font-style: normal;
        color: var(--vscode-editorInfo-foreground);
    }
</style>
