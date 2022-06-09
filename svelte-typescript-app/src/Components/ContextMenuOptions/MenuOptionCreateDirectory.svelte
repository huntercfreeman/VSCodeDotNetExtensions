<script lang="ts">
    import { ConstantsFileExtensionsNoPeriod } from '../../../../out/Constants/ConstantsFileExtensionsNoPeriod';
    import { contextMenuTarget } from '../menu';
    import MenuOption from '../MenuOption.svelte';
    import TextInputForm from '../TextInputForm.svelte';
    import { MessageCreateDirectoryInDirectory } from "../../../../out/Messages/Create/MessageCreateDirectoryInDirectory";
    import { DirectoryFile } from '../../../../out/FileSystem/DirectoryFile';
    import { FileKind } from '../../../../out/FileSystem/FileKind';

	export let closeMenu;

	let contextMenuTargetValue;
    let createDirectoryFilename: string | undefined;
	
	contextMenuTarget.subscribe(value => {
		contextMenuTargetValue = value;
	});

    function beginFormCreateDirectoryOnClick() {
		createDirectoryFilename = "";
	}	

	function createDirectoryOnClick() {
		if(createDirectoryFilename) {
            let directoryFile: DirectoryFile;

            switch (contextMenuTargetValue.fileKind) {
                case FileKind.directory:
                    directoryFile = contextMenuTargetValue;
                    break;
                case FileKind.cSharpProject:
                    directoryFile = new DirectoryFile(contextMenuTargetValue.absoluteFilePath
                        .parentDirectories[contextMenuTargetValue.absoluteFilePath.parentDirectories.length - 1],
                        contextMenuTargetValue.namespace);
                    break;
            }

            let messageCreateDirectoryInDirectory = 
                new MessageCreateDirectoryInDirectory(createDirectoryFilename, directoryFile);

            tsVscode.postMessage({
                type: undefined,
                value: messageCreateDirectoryInDirectory
            });

			closeMenu();
		}
	}
</script>

<MenuOption onClickStopPropagation="{true}"
            onClick={beginFormCreateDirectoryOnClick} 
            text="Create Directory." />
<TextInputForm bind:value="{createDirectoryFilename}"
            onValidSubmit="{createDirectoryOnClick}"
            placeholder="Directory name" />