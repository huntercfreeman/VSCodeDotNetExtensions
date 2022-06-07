<script lang="ts">
	import Menu from '../Menu.svelte'
    import MenuOption from '../MenuOption.svelte';
	import MenuDivider from '../MenuDivider.svelte';
	import { contextMenuTarget } from '../menu.js';
	import { ConstantsMessages } from '../../../../out/Constants/ConstantsMessages';

	export let x: number;
	export let y: number;
	export let closeMenu;

	let contextMenuTargetValue;
	
	contextMenuTarget.subscribe(value => {
		contextMenuTargetValue = value;
	});

	$: pos = {
		x: x,
		y: y
	}

	let addSolutionFolderName: string | undefined;

	function fireCloseMenu() {
		addSolutionFolderName = undefined;
		closeMenu();
	}

	function beginFormAddSolutionFolderOnClick() {
		addSolutionFolderName = "";
	}	

	function confirmFormAddSolutionFolderOnClick() {
		if(addSolutionFolderName) {
			tsVscode.postMessage(
				ConstantsMessages.ConstructMessage(ConstantsMessages.ADD_SOLUTION_FOLDER, 
					{ 
						solutionModel: contextMenuTargetValue,
						solutionFolderName: addSolutionFolderName
					}));
		}
	}	

	function cancelFormAddSolutionFolderOnClick() {
		addSolutionFolderName = undefined;
	}	
	
	function addProjectToSolutionOnClick() {
		cancelFormAddSolutionFolderOnClick();

		tsVscode.postMessage(
			ConstantsMessages.ConstructMessage(ConstantsMessages.ADD_PROJECT_TO_SOLUTION, 
				contextMenuTargetValue));
	}	
</script>

<Menu {...pos} on:click={fireCloseMenu} on:clickoutside={fireCloseMenu}>
	<MenuOption onClickStopPropagation="{true}"
		onClick={beginFormAddSolutionFolderOnClick} 
		text="Add solution folder." />
	{#if addSolutionFolderName !== undefined}
		<input placeholder="Give Solution Folder Name" bind:value="{addSolutionFolderName}" />
		<button on:click="{confirmFormAddSolutionFolderOnClick}">Confirm</button>
		<button on:click="{cancelFormAddSolutionFolderOnClick}">Cancel</button>
	{/if}
	<MenuOption 
		on:click={addProjectToSolutionOnClick} 
		text="Add project to solution." />
</Menu>