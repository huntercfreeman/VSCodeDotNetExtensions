<script lang="ts">
	import Menu from '../Menu.svelte'
    import MenuOption from '../MenuOption.svelte';
	import MenuDivider from '../MenuDivider.svelte';
	import TextInputForm from '../TextInputForm.svelte';
	import { contextMenuTarget } from '../menu.js';
	import { ConstantsMessages } from '../../../../out/Constants/ConstantsMessages';

	export let x: number;
	export let y: number;
	export let closeMenu;

	let contextMenuTargetValue;
	let addFileWithTemplateFilename: string | undefined;
	let addEmptyFileFilename: string | undefined;
	
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
						directory: contextMenuTargetValue,
						filename: addFileWithTemplateFilename
					}));

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

</script>

<Menu {...pos} on:click={closeMenu} on:clickoutside={closeMenu}>
	<MenuOption onClickStopPropagation="{true}"
		onClick={beginFormAddFileWithTemplateNameOnClick} 
		text="Add file with template." />
	<TextInputForm bind:value="{addFileWithTemplateFilename}"
	               onValidSubmit="{addFileWithTemplateToFolderOnClick}" />

	<MenuDivider />

	<MenuOption onClickStopPropagation="{true}"
		onClick={beginFormAddEmptyFileOnClick} 
		text="Add empty file." />
	<TextInputForm bind:value="{addEmptyFileFilename}"
	               onValidSubmit="{addEmptyFileToFolderOnClick}" />
</Menu>