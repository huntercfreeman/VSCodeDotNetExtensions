<script lang="ts">
	import { onMount } from "svelte";
	import type { AbsoluteFilePath } from "../../out/FileSystem/AbsoluteFilePath";
	import type { SolutionModel } from "../../out/DotNet/SolutionModel";
	import type { CSharpProjectModel } from "../../out/DotNet/CSharpProjectModel";

	import { ConstantsMessages } from "../../out/Constants/ConstantsMessages";
	import SelectSolutionForm from "./Components/SelectSolutionForm.svelte";
	import TreeViewDisplay from "./Components/TreeViewDisplay.svelte";

	let solutionModels: SolutionModel[] = [];

	let selectedSolution: SolutionModel;

	function getSolutionFilesInWorkspace() {
		tsVscode.postMessage(
			ConstantsMessages.ConstructMessage(ConstantsMessages.LOAD_SOLUTIONS_IN_WORKSPACE, null));
	}

	onMount(async () => {
		window.addEventListener("message", async (event) => {
			const message = event.data;
			switch (message.type) {
				case ConstantsMessages.LOAD_SOLUTIONS_IN_WORKSPACE:
					solutionModels = message.value;
					break;
				case ConstantsMessages.PARSE_SOLUTION:
					selectedSolution = message.value;
					break;
			}
		});
		
		getSolutionFilesInWorkspace();
	});
</script>

<button on:click={getSolutionFilesInWorkspace}>
	Reload Solutions In Workspace
</button>

<SelectSolutionForm solutionModels={solutionModels} />

{#if selectedSolution}
	<TreeViewDisplay data={selectedSolution}
		             children={selectedSolution.projects} />	
{/if}
