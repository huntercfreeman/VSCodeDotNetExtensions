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
	let addFileWithTemplateName: string | undefined;
	let addEmptyFile: string | undefined;
	
	contextMenuTarget.subscribe(value => {
		contextMenuTargetValue = value;
	});

	$: pos = {
		x: x,
		y: y
	}

	function clearForms() {
		addFileWithTemplateName = undefined;
		addEmptyFile = undefined;
	}
		
	function beginFormAddFileWithTemplateNameOnClick() {
		clearForms();
		addFileWithTemplateName = "";
	}	

	function beginFormAddEmptyFileOnClick() {
		clearForms();
		addEmptyFile = "";
	}	

	function addFileWithTemplateToFolderOnClick() {
		if(addFileWithTemplateName) {
			tsVscode.postMessage(
				ConstantsMessages.ConstructMessage(ConstantsMessages.ADD_FILE_WITH_TEMPLATE_TO_DIRECTORY, 
					{ 
						directory: contextMenuTargetValue,
						filename: addFileWithTemplateName
					}));
		}
	}
	
	function addEmptyFileToFolderOnClick() {
		if(addEmptyFile) {
			tsVscode.postMessage(
				ConstantsMessages.ConstructMessage(ConstantsMessages.ADD_EMPTY_FILE_TO_DIRECTORY, 
					{ 
						directory: contextMenuTargetValue,
						filename: addEmptyFile
					}));
		}
	}

</script>

<Menu {...pos} on:click={closeMenu} on:clickoutside={closeMenu}>
	<MenuOption onClickStopPropagation="{true}"
		onClick={beginFormAddFileWithTemplateNameOnClick} 
		text="Add file with template." />
	<TextInputForm bind:value="{addFileWithTemplateName}"
	               onValidSubmit="{addFileWithTemplateToFolderOnClick}" />

	<MenuDivider />

	<MenuOption onClickStopPropagation="{true}"
		onClick={beginFormAddEmptyFileOnClick} 
		text="Add empty file." />
	<TextInputForm bind:value="{addEmptyFile}"
	               onValidSubmit="{addEmptyFileToFolderOnClick}" />
</Menu>