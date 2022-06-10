<script lang="ts">
    import { ConstantsFileExtensionsNoPeriod } from '../../../../out/Constants/ConstantsFileExtensionsNoPeriod';
    import { contextMenuTarget } from '../menu';
    import MenuOption from '../MenuOption.svelte';
    import TextInputForm from '../TextInputForm.svelte';
    import { MessageCreateTemplatedFileInDirectory } from "../../../../out/Messages/Create/MessageCreateTemplatedFileInDirectory";
    import { DirectoryFile } from '../../../../out/FileSystem/Files/DirectoryFile';
    import { FileKind } from '../../../../out/FileSystem/FileKind';
    import { MessageReadVirtualFilesInCSharpProject } from '../../../../out/Messages/Read/MessageReadVirtualFilesInCSharpProject';
    import { MessageReadFilesInDirectory } from '../../../../out/Messages/Read/MessageReadFilesInDirectory';
    import { MessageExecuteCSharpProjectWithoutDebugging } from '../../../../out/Messages/Execute/MessageExecuteCSharpProjectWithoutDebugging';
    import { MessageReadNewProjectTemplatesOnComputer } from '../../../../out/Messages/Read/MessageReadNewProjectTemplatesOnComputer';

	export let closeMenu;

	let contextMenuTargetValue;
    let addCSharpProjectFilename: string | undefined;
    let addCSharpProjectTemplate: string | undefined;
	
	contextMenuTarget.subscribe(value => {
		contextMenuTargetValue = value;
	});

    function createNewCSharpProject() {
        switch (contextMenuTargetValue.fileKind) {
            case FileKind.solution:
                let messageExecuteCSharpProjectWithoutDebugging = 
                    new MessageExecuteCSharpProjectWithoutDebugging(contextMenuTargetValue);

                tsVscode.postMessage({
                    type: undefined,
                    value: messageExecuteCSharpProjectWithoutDebugging
                });
        }

        closeMenu();
	}
    
    function startFormNewCSharpProject() {
        let messageReadNewProjectTemplatesOnComputer = 
            new MessageReadNewProjectTemplatesOnComputer();

        tsVscode.postMessage({
                    type: undefined,
                    value: messageReadNewProjectTemplatesOnComputer
                });

        addCSharpProjectFilename = "";
        addCSharpProjectTemplate = "";
	}
</script>

<MenuOption onClickStopPropagation="{true}"
            onClick={startFormNewCSharpProject} 
            text="New C# Project." />

{#if addCSharpProjectFilename !== undefined && addCSharpProjectTemplate !== undefined}
    <input placeholder="C# Project name no extension" 
            bind:value="{addCSharpProjectFilename}" />
    
    <div>'dotnet new --list'</div>
    <div>was ran for you in terminal</div>
    <input placeholder="Template Short Name" 
            bind:value="{addCSharpProjectTemplate}" />

    <div>
        <div>
            <div>Create C# Project:</div>
            <div style="margin-left: 12px;">{addCSharpProjectFilename}.csproj</div>
        </div>
        
        <div>
            <div>Use Template:</div>
            <div style="margin-left: 12px;">{addCSharpProjectTemplate}</div>
        </div>
    </div>

    <button on:click={createNewCSharpProject}>Accept</button>
    <button on:click={closeMenu}>Decline</button>
{/if}
