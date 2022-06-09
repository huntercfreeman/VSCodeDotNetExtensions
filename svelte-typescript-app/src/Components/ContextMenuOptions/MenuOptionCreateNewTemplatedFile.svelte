<script lang="ts">
    import { ConstantsFileExtensionsNoPeriod } from '../../../../out/Constants/ConstantsFileExtensionsNoPeriod';
    import { contextMenuTarget } from '../menu';
    import MenuOption from '../MenuOption.svelte';
    import TextInputForm from '../TextInputForm.svelte';
    import { MessageCreateTemplatedFileInDirectory } from "../../../../out/Messages/Create/MessageCreateTemplatedFileInDirectory";
    import type { DirectoryFile } from '../../../../out/FileSystem/DirectoryFile';
    import { FileKind } from '../../../../out/FileSystem/FileKind';

	export let closeMenu;

	let contextMenuTargetValue;
    let addFileWithTemplateFilename: string | undefined;
	let shouldAddCodeBehind: boolean = false;
	
	contextMenuTarget.subscribe(value => {
		contextMenuTargetValue = value;
	});

	function beginFormAddFileWithTemplateNameOnClick() {
		addFileWithTemplateFilename = "";
	}	

	function addFileWithTemplateToFolderOnClick() {
		if(addFileWithTemplateFilename) {
            let directoryFile: DirectoryFile;

            switch (contextMenuTargetValue.fileKind) {
                case FileKind.directory:
                    directoryFile = contextMenuTargetValue;
                    break;
                case FileKind.cSharpProject:
                    directoryFile = contextMenuTargetValue.absoluteFilePath
                        .parentDirectories[contextMenuTargetValue.absoluteFilePath.parentDirectories.length - 1];
                    break;
            }

            let messageCreateTemplatedFileInDirectory = 
                new MessageCreateTemplatedFileInDirectory(addFileWithTemplateFilename, directoryFile);

            tsVscode.postMessage({
                type: undefined,
                value: messageCreateTemplatedFileInDirectory
            });

			closeMenu();
		}
	}
</script>

<MenuOption onClickStopPropagation="{true}"
    onClick={beginFormAddFileWithTemplateNameOnClick} 
    text="Add file with template." />
<TextInputForm bind:value="{addFileWithTemplateFilename}"
                onValidSubmit="{addFileWithTemplateToFolderOnClick}"
                placeholder="Filename with extension" />
{#if addFileWithTemplateFilename && addFileWithTemplateFilename.endsWith(ConstantsFileExtensionsNoPeriod.RAZOR_FILE_EXTENSION)}
    Add a code behind? 
    
    <input style="display: inline;" 
            type="checkbox"
            bind:checked="{shouldAddCodeBehind}" />

            shouldAddCodeBehind: {shouldAddCodeBehind}
{/if}