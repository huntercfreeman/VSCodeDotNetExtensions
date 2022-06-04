<script lang="ts">
	import { onMount } from "svelte";
	import type { AbsoluteFilePath } from "../../../out/FileSystem/AbsoluteFilePath";
	import type { SolutionModel } from "../../../out/DotNet/SolutionModel";
	import type { CSharpProjectModel } from "../../../out/DotNet/CSharpProjectModel";

	import { ConstantsMessages } from "../../../out/Constants/ConstantsMessages";

	export let solutionModels: SolutionModel[] = [];

	let selectedSolution;
	
	function handleSelectOnChange() {
		if(selectedSolution) {
			tsVscode.postMessage(
			ConstantsMessages.ConstructMessage(ConstantsMessages.LOAD_SOLUTIONS_IN_WORKSPACE, null));
		}
	}
</script>

<div>
	<select bind:value={selectedSolution} class="dni_select">
		{#each solutionModels as solution}
			<option value="{solution}" class="dni_option">{solution.absoluteFilePath.fileNameWithExtension}</option>
		{/each}
	</select>
</div>

<style>
	.dni_select {
		color: var(--vscode-input-foreground);
		background-color: var(--vscode-input-background);
	}
</style>