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
    import { MessageReadSolutionIntoTreeView } from '../../../../out/Messages/Read/MessageReadSolutionIntoTreeView';
    import { MessageReadVirtualFilesInSolution } from '../../../../out/Messages/Read/MessageReadVirtualFilesInSolution';

	export let closeMenu;

	let contextMenuTargetValue;
    let addFileWithTemplateFilename: string | undefined;
	let shouldAddCodeBehind: boolean = false;
	
	contextMenuTarget.subscribe(value => {
		contextMenuTargetValue = value;
	});

    function refreshOnClick() {
        switch (contextMenuTargetValue.fileKind) {
            case FileKind.solution:
                let messageReadVirtualFilesInSolution = new MessageReadVirtualFilesInSolution(contextMenuTargetValue);

                tsVscode.postMessage({
                    type: undefined,
                    value: messageReadVirtualFilesInSolution
                });
                break;
            case FileKind.cSharpProject:
                let messageReadVirtualFilesInCSharpProject = 
                    new MessageReadVirtualFilesInCSharpProject(contextMenuTargetValue);

                tsVscode.postMessage({
                    type: undefined,
                    value: messageReadVirtualFilesInCSharpProject
                });
                break;
            case FileKind.directory:
                let messageReadFilesInDirectory = 
                    new MessageReadFilesInDirectory(contextMenuTargetValue);

                tsVscode.postMessage({
                    type: undefined,
                    value: messageReadFilesInDirectory
                });
                break;
        }

        closeMenu();
	}
</script>

<MenuOption onClickStopPropagation="{true}"
            onClick={refreshOnClick} 
            text="Refresh Child Files." />