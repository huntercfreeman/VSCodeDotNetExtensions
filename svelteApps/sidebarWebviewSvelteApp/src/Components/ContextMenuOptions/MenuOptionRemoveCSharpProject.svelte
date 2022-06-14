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
    import { MessageUpdateExistingCSharpProjectIntoSolution } from '../../../../../out/Messages/Update/MessageUpdateExistingCSharpProjectIntoSolution';
    import { MessageUpdateRemoveProject } from '../../../../../out/Messages/Update/MessageUpdateRemoveProject';

	export let closeMenu;

	let contextMenuTargetValue;
    let showPrompt: boolean = false;
	
	contextMenuTarget.subscribe(value => {
		contextMenuTargetValue = value;
	});

    function removeProject() {
        let messageUpdateRemoveProject = 
            new MessageUpdateRemoveProject(contextMenuTargetValue);

        tsVscode.postMessage({
            type: undefined,
            value: messageUpdateRemoveProject
        });

        performCloseMenu();
	}
    
    function showConfirmQuestion() {
        showPrompt = true;
	}

    function performCloseMenu() {
        showPrompt = false;
        closeMenu();
    }
</script>

<MenuOption onClickStopPropagation="{true}"
            onClick={showConfirmQuestion} 
            text="Remove Project (no files are deleted)." />

{#if showPrompt}
    <div>
        <em>Remove</em> Project:
        
        <div style="margin-left: 12px;">
            <em>{contextMenuTargetValue.cSharpProjectModel.absoluteFilePath.filenameWithExtension}</em>
        </div>
    </div>
    <div>
        From Solution:
        
        <div style="margin-left: 12px;">
            {contextMenuTargetValue.cSharpProjectModel.parentSolutionAbsoluteFilePath.filenameWithExtension}
        </div>
    </div>

    <button on:click="{removeProject}">Accept</button>
    <button on:click="{performCloseMenu}">Decline</button>
{/if}

<style>
    em {
        font-style: normal;
        color: var(--vscode-editorInfo-foreground);
    }
</style>