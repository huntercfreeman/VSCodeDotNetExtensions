<script lang="ts">
	import { onDestroy } from 'svelte';
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";
    import { MessageUpdatePutProjectInSolutionFolder } from "../../../../../out/Messages/Update/MessageUpdatePutProjectInSolutionFolder";
    
    export let closeMenu;

    let contextMenuTargetValue;
    let solutionFolderName: string | undefined;

    const unsubscribe = contextMenuTarget.subscribe((value) => {
        contextMenuTargetValue = value;
    });

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

    onDestroy(unsubscribe);
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
            on:keydown|stopPropagation
        />

        <div>
            <div>
                <div>Create Solution Folder:</div>
                <div style="margin-left: 12px;">
                    <em>{solutionFolderName}</em>
                </div>
            </div>
        </div>

        <button on:keydown|stopPropagation on:click={putInSolutionFolder}>Accept</button>
        <button on:keydown|stopPropagation on:click={closeMenu}>Decline</button>
    {/if}
{/if}

<style>
    em {
        font-style: normal;
        color: var(--vscode-editorInfo-foreground);
    }
</style>
