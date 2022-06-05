<script lang="ts">
	import Menu from '../Menu.svelte'
    import MenuOption from '../MenuOption.svelte';
	import MenuDivider from '../MenuDivider.svelte';

	export let x: number;
	export let y: number;
	export let closeMenu;

	$: pos = {
		x: x,
		y: y
	}
</script>


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