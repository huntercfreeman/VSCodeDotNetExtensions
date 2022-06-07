<script lang="ts">
	import Menu from '../Menu.svelte'
    import MenuOption from '../MenuOption.svelte';
	import MenuDivider from '../MenuDivider.svelte';
	import TextInputForm from '../TextInputForm.svelte';
	import { contextMenuTarget } from '../menu.js';
	import { ConstantsMessages } from '../../../../out/Constants/ConstantsMessages';
	import { ConstantsFileExtensionsNoPeriod } from '../../../../out/Constants/ConstantsFileExtensionsNoPeriod';
	import { DirectoryFile } from '../../../../out/FileSystem/DirectoryFile';

	export let x: number;
	export let y: number;
	export let closeMenu;

	let contextMenuTargetValue;
	let addFileWithTemplateFilename: string | undefined;
	let addEmptyFileFilename: string | undefined;
	let shouldAddCodeBehind: boolean = false;
	
	contextMenuTarget.subscribe(value => {
		contextMenuTargetValue = value;
	});

	$: pos = {
		x: x,
		y: y
	}

	function clearForms() {
		addFileWithTemplateFilename = undefined;
		addEmptyFileFilename = undefined;
	}
		
	function beginFormAddFileWithTemplateNameOnClick() {
		clearForms();
		addFileWithTemplateFilename = "";
	}	

	function beginFormAddEmptyFileOnClick() {
		clearForms();
		addEmptyFileFilename = "";
	}	

	function addFileWithTemplateToFolderOnClick() {
		if(addFileWithTemplateFilename) {
			tsVscode.postMessage(
				ConstantsMessages.ConstructMessage(ConstantsMessages.ADD_FILE_WITH_TEMPLATE_TO_DIRECTORY, 
					{ 
						directory: new DirectoryFile(contextMenuTargetValue.absoluteFilePath.parentDirectories[contextMenuTargetValue.absoluteFilePath.parentDirectories.length - 1], 
							contextMenuTargetValue.absoluteFilePath),
						filename: addFileWithTemplateFilename
					}));

			if (shouldAddCodeBehind) {
				tsVscode.postMessage(
					ConstantsMessages.ConstructMessage(ConstantsMessages.ADD_FILE_WITH_TEMPLATE_TO_DIRECTORY, 
						{ 
							directory: new DirectoryFile(contextMenuTargetValue.absoluteFilePath.parentDirectories[contextMenuTargetValue.absoluteFilePath.parentDirectories.length - 1], 
								contextMenuTargetValue.absoluteFilePath),
							filename: addFileWithTemplateFilename + 
								`.${ConstantsFileExtensionsNoPeriod.C_SHARP_FILE_EXTENSION}`
						}));
			}

			closeMenu();
		}
	}
	
	function addEmptyFileToFolderOnClick() {
		if(addEmptyFileFilename) {
			tsVscode.postMessage(
				ConstantsMessages.ConstructMessage(ConstantsMessages.ADD_EMPTY_FILE_TO_DIRECTORY, 
					{ 
						directory: contextMenuTargetValue,
						filename: addEmptyFileFilename
					}));
			
			closeMenu();
		}
	}
	
	function refreshOnClick() {
		tsVscode.postMessage(
			ConstantsMessages
				.ConstructMessage(ConstantsMessages.LOAD_CSHARP_PROJECT_CHILD_FILES, 
					contextMenuTargetValue));
			
		closeMenu();
	}

</script>

<Menu {...pos} on:click={closeMenu} on:clickoutside={closeMenu}>
	<MenuOption onClickStopPropagation="{true}"
		onClick={beginFormAddFileWithTemplateNameOnClick} 
		text="Add file with template." />
	<TextInputForm bind:value="{addFileWithTemplateFilename}"
	               onValidSubmit="{addFileWithTemplateToFolderOnClick}" />
	{#if addFileWithTemplateFilename && addFileWithTemplateFilename.endsWith(ConstantsFileExtensionsNoPeriod.RAZOR_FILE_EXTENSION)}
		Add a code behind? 
		
		<input style="display: inline;" 
		       type="checkbox"
		       bind:checked="{shouldAddCodeBehind}" />

			   shouldAddCodeBehind: {shouldAddCodeBehind}
	{/if}

	<MenuOption onClickStopPropagation="{true}"
		onClick={beginFormAddEmptyFileOnClick} 
		text="Add empty file." />
	<TextInputForm bind:value="{addEmptyFileFilename}"
	               onValidSubmit="{addEmptyFileToFolderOnClick}" />

	<MenuDivider />

	<MenuOption onClickStopPropagation="{true}"
		onClick={refreshOnClick} 
		text="Refresh." />
</Menu>