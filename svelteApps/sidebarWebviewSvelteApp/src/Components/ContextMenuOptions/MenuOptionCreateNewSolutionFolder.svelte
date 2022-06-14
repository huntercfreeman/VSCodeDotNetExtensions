<script lang="ts">
    import { ConstantsFileExtensionsNoPeriod } from '../../../../../out/Constants/ConstantsFileExtensionsNoPeriod';
    import { contextMenuTarget } from '../menu';
    import MenuOption from '../MenuOption.svelte';
    import TextInputForm from '../TextInputForm.svelte';
    import { MessageCreateTemplatedFileInDirectory } from "../../../../../out/Messages/Create/MessageCreateTemplatedFileInDirectory";
    import { DirectoryFile } from '../../../../../out/FileSystem/Files/DirectoryFile';
    import { FileKind } from '../../../../../out/FileSystem/FileKind';
    import { MessageReadVirtualFilesInCSharpProject } from '../../../../../out/Messages/Read/MessageReadVirtualFilesInCSharpProject';
    import { MessageReadFilesInDirectory } from '../../../../../out/Messages/Read/MessageReadFilesInDirectory';
    import { MessageExecuteCSharpProjectWithoutDebugging } from '../../../../../out/Messages/Execute/MessageExecuteCSharpProjectWithoutDebugging';
    import { MessageReadNewProjectTemplatesOnComputer } from '../../../../../out/Messages/Read/MessageReadNewProjectTemplatesOnComputer';
    import { MessageCreateCSharpProjectInSolution } from '../../../../../out/Messages/Create/MessageCreateCSharpProjectInSolution';
    import { MessageCreateSolutionFolderInAny } from '../../../../../out/Messages/Create/MessageCreateSolutionFolderInAny';

	export let closeMenu;

	let contextMenuTargetValue;
    let createNewSolutionFolderName: string | undefined;
	
	contextMenuTarget.subscribe(value => {
		contextMenuTargetValue = value;
	});

    function createNewSolutionFolder() {
        switch (contextMenuTargetValue.fileKind) {
            case FileKind.solution:
                let messageCreateSolutionFolderInAny = 
                    new MessageCreateSolutionFolderInAny(contextMenuTargetValue,
                        createNewSolutionFolderName);

                tsVscode.postMessage({
                    type: undefined,
                    value: messageCreateSolutionFolderInAny
                });
        }

        closeMenu();
	}
    
    function startFormCreateNewSolutionFolder() {
        createNewSolutionFolderName = "";
	}
</script>

<MenuOption onClickStopPropagation="{true}"
            onClick={startFormCreateNewSolutionFolder} 
            text="New Solution Folder" />

{#if createNewSolutionFolderName !== undefined}
    <input placeholder="Name for Solution Folder" 
            bind:value="{createNewSolutionFolderName}" />
    
    <div>
        <div>
            <div>Create Solution Folder:</div>
            <div style="margin-left: 12px;"><em>{createNewSolutionFolderName}</em></div>
        </div>
    </div>

    <button on:click={createNewSolutionFolder}>Accept</button>
    <button on:click={closeMenu}>Decline</button>
{/if}

<style>
    em {
        font-style: normal;
        color: var(--vscode-editorInfo-foreground);
    }
</style>
