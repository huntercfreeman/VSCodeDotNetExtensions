<script lang="ts">
    import Menu from './Menu.svelte'
    import MenuOption from './MenuOption.svelte';
	import MenuDivider from './MenuDivider.svelte';
    
    let pos = { x: 0, y: 0 };
    let showMenu = false;

    async function onRightClick(e: any) {
        if (showMenu) {
            showMenu = false;
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
			text="Do nothing" />
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

<style>
    .dni_context-menu {
        width: 300px;
        height: 300px;
        position: fixed;
        left: 0;
        top: 0;
        background-color: aqua;
        color: red;
    }
</style>