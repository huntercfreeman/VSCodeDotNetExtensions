<script lang="ts">
	import { getContext } from "svelte";
	import { key } from "./menu.js";
	import DotNetIdeFocusTrap from "./MaterialDesign/DotNetIdeFocusTrap.svelte";

	export let isDisabled = false;
	export let text = "";
    export let onKeyDown: (e: KeyboardEvent) => void = (e) => {
		if (e.key === ConstantsKeyboard.KEY_ENTER &&
			onClick) {
				handleClick(undefined);
		}
	};
	export let idNamespace: string;
    export let index: number;
	export let onClickStopPropagation = false;
	export let onClick = undefined;

	import { createEventDispatcher } from "svelte";
import { ConstantsKeyboard } from "../../../../out/Constants/ConstantsKeyboard.js";
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
	<DotNetIdeFocusTrap onKeyDown={onKeyDown}
		                {idNamespace}
						{index} />

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
