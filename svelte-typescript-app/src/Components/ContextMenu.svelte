<script lang="ts">
    import Menu from './Menu.svelte'
    import MenuOption from './MenuOption.svelte';
	import MenuDivider from './MenuDivider.svelte';
	import ContextMenuForSolution from './ContextMenus/ContextMenuForSolution.svelte';
    import { ConstantsContextualInformation } from "../../../out/Constants/ConstantsContextualInformation";

	export let contextualInformation: string;

    let pos = { x: 0, y: 0 };
    let showMenu = false;

    async function onRightClick(e) {
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
	{#if contextualInformation === ConstantsContextualInformation.TREE_VIEW_SOLUTION_CONTEXT}
		<ContextMenuForSolution x={pos.x} y={pos.y} closeMenu={closeMenu} />
	{/if}
{/if}

<svelte:body on:contextmenu|preventDefault={onRightClick} />