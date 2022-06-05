<script>
	import { onMount, getContext } from 'svelte';
	import { key } from './menu.js';
	
	export let isDisabled = false;
	export let text = '';
	
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();	
	
	const { dispatchClick } = getContext(key);
	
	const handleClick = e => {
		if (isDisabled) return;
		
		dispatch('click');
		dispatchClick();
	}
</script>

<style>
	div {
		padding: 4px 15px;
		cursor: default;
		font-size: 14px;
		display: flex;
		align-items: center;
		grid-gap: 5px;
	}
	div:hover {
		color: var(--vscode-button-foreground);
		background: var(--vscode-button-hoverBackground);
	}
	div.disabled {
		color: var(--vscode-disabledForeground);
	}
	div.disabled:hover {
		color: var(--vscode-button-foreground);
		background: var(--vscode-button-hoverBackground);
	}
</style>

<div 
  class:disabled={isDisabled}
  on:click={handleClick}
>
	{#if text}
		{text}
	{:else}
		<slot />
	{/if}
</div>
