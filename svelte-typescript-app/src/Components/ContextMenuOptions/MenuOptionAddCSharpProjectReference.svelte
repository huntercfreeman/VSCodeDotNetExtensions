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
    import { MessageUpdateProjectReferencesOfProject } from '../../../../out/Messages/Update/MessageUpdateProjectReferencesOfProject';

	export let closeMenu;

	let contextMenuTargetValue;
	
	contextMenuTarget.subscribe(value => {
		contextMenuTargetValue = value;
	});

    function addProjectReference() {
        let messageUpdateProjectReferencesOfProject = 
            new MessageUpdateProjectReferencesOfProject(contextMenuTargetValue);

        tsVscode.postMessage({
            type: undefined,
            value: messageUpdateProjectReferencesOfProject
        });

        closeMenu();
	}
</script>

<MenuOption onClickStopPropagation="{true}"
            onClick={addProjectReference} 
            text="Add Project Reference." />