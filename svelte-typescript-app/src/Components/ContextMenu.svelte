<script lang="ts">
    import Menu from './Menu.svelte'
    import MenuOption from './MenuOption.svelte';
	import MenuDivider from './MenuDivider.svelte';
	import ContextMenuForSolutionTreeView from './ContextMenus/ContextMenuForSolutionTreeView.svelte';
	import ContextMenuForSolutionFolderTreeView from './ContextMenus/ContextMenuForSolutionFolderTreeView.svelte';
	import ContextMenuForCSharpProjectTreeView from './ContextMenus/ContextMenuForCSharpProjectTreeView.svelte';
    import { ConstantsContextualInformation } from "../../../out/Constants/ConstantsContextualInformation";

    let pos = { x: 0, y: 0 };
    let showMenu = false;

    export async function onRightClick(e) {
		if (showMenu) {
			showMenu = false;
			await new Promise(res => setTimeout(res, 100));
		}
		
		pos = { x: e.clientX, y: e.clientY };
		showMenu = true;
	}
	
	function closeMenu() {
		showMenu = false;
	}
</script>

{#if showMenu}
	<Menu {...pos} on:click={closeMenu} on:clickoutside={closeMenu}>
		<MenuOption 
			on:click={console.log} 
			text="C# Project Tree View" />
		<MenuOption 
			on:click={console.log} 
			text="Do nothing, but twice" />
		<MenuDivider />
		<MenuOption 
			isDisabled={true} 
			on:click={console.log} 
			text="Whoops, disabled!" />
		<MenuOption on:click={console.log}>
			<span>Look! An icon!</span>
		</MenuOption>
	</Menu>
{/if}

<svelte:body on:contextmenu|preventDefault={onRightClick} />