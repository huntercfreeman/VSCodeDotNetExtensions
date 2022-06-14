<script>
	import { getContext } from "svelte";
	import { key } from "./menu.js";

	export let isDisabled = false;
	export let text = "";
	export let onClickStopPropagation = false;
	export let onClick = undefined;

	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	const { dispatchClick } = getContext(key);

	const handleClick = (e) => {
		if (onClick) {
			onClick();
		}

		if (isDisabled) return;
		if (onClickStopPropagation) return;

		dispatch("click");
		dispatchClick();
	};
</script>

<div class:disabled={isDisabled} on:click={handleClick}>
	{#if text}
		{text}
	{:else}
		<slot />
	{/if}
</div>

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
