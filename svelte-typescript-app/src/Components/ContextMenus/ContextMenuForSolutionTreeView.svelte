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

	function addSolutionFolderOnClick() {
		tsVscode.postMessage(
			ConstantsMessages.ConstructMessage(ConstantsMessages.ADD_SOLUTION_FOLDER, 
				contextMenuTargetValue));
	}	
	
	function addProjectToSolutionOnClick() {
		tsVscode.postMessage(
			ConstantsMessages.ConstructMessage(ConstantsMessages.ADD_PROJECT_TO_SOLUTION, 
				contextMenuTargetValue));
	}	
</script>


<Menu {...pos} on:click={closeMenu} on:clickoutside={closeMenu}>
	<MenuOption 
		on:click={addSolutionFolderOnClick} 
		text="Add solution folder." />
	<MenuOption 
		on:click={addProjectToSolutionOnClick} 
		text="Add project to solution." />
</Menu>