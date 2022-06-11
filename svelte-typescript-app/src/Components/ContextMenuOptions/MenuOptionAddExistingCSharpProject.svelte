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
    import { MessageUpdateExistingCSharpProjectIntoSolution } from '../../../../out/Messages/Update/MessageUpdateExistingCSharpProjectIntoSolution';

	export let closeMenu;

	let contextMenuTargetValue;
	
	contextMenuTarget.subscribe(value => {
		contextMenuTargetValue = value;
	});

    function createNewCSharpProject() {
        switch (contextMenuTargetValue.fileKind) {
            case FileKind.solution:
                let messageUpdateExistingCSharpProjectIntoSolution = 
                    new MessageUpdateExistingCSharpProjectIntoSolution(contextMenuTargetValue);

                tsVscode.postMessage({
                    type: undefined,
                    value: messageUpdateExistingCSharpProjectIntoSolution
                });
        }

        closeMenu();
	}
</script>

<MenuOption onClickStopPropagation="{true}"
            onClick={createNewCSharpProject} 
            text="Add Existing C# Project." />