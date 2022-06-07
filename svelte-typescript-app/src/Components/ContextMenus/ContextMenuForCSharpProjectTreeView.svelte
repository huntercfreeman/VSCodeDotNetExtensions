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
		
	function addFileToProjectOnClick() {
		tsVscode.postMessage(
			ConstantsMessages.ConstructMessage(ConstantsMessages.ADD_PROJECT_TO_SOLUTION_FOLDER, 
				contextMenuTargetValue));
	}	

</script>

<Menu {...pos} on:click={closeMenu} on:clickoutside={closeMenu}>
	<MenuOption 
		on:click={addFileToProjectOnClick} 
		text="Add file to Project." />
</Menu>