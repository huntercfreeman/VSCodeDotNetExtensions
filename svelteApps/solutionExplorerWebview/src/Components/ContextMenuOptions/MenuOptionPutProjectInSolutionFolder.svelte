<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import DotNetIdeButton from "../MaterialDesign/DotNetIdeButton.svelte";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";
    import { MessageUpdatePutProjectInSolutionFolder } from "../../../../../out/Messages/Update/MessageUpdatePutProjectInSolutionFolder";
import DotNetIdeInputText from "../MaterialDesign/DotNetIdeInputText.svelte";
    
    export let closeMenu;

    $: contextMenuTargetValue = $contextMenuTarget;

    let solutionFolderName: string | undefined;

    function putInSolutionFolder() {
        if ((contextMenuTargetValue as any).projectModel) {

            if (contextMenuTargetValue.fileKind === FileKind.solutionFolder) {
                return;
            }

            // IProjectModel
            let projectModel: any = (contextMenuTargetValue as any).projectModel;

            let messageUpdatePutProjectInSolutionFolder =
                new MessageUpdatePutProjectInSolutionFolder(
                    projectModel,
                    solutionFolderName
                );

            tsVscode.postMessage({
                type: undefined,
                value: messageUpdatePutProjectInSolutionFolder,
            });
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
        <DotNetIdeInputText bind:value={solutionFolderName}
                            placeholder="Solution Folder Name" />

        <div>
            <div>
                <div>Create Solution Folder:</div>
                <div style="margin-left: 12px;">
                    <em>{solutionFolderName}</em>
                </div>
            </div>
        </div>

        <DotNetIdeButton onClickCallback={putInSolutionFolder}>
            Accept
        </DotNetIdeButton>

        <DotNetIdeButton onClickCallback={closeMenu}>
            Decline
        </DotNetIdeButton>
    {/if}
{/if}

<style>
    em {
        font-style: normal;
        color: var(--vscode-editorInfo-foreground);
    }
</style>
