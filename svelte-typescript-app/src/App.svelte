<script lang="ts">
	import { onMount } from "svelte";
	import type { DotNetSolutionFile } from "../../out/FileSystem/Files/DotNetSolutionFile";
	import { MessageCategory } from "../../out/Messages/MessageCategory";
	import { MessageReadKind } from "../../out/Messages/Read/MessageReadKind";
	import { MessageReadSolutionsInWorkspace } from "../../out/Messages/Read/MessageReadSolutionsInWorkspace";
	import SelectDotNetSolutionFileForm from "./Components/SelectDotNetSolutionFileForm.svelte";
	import TreeViewDisplay from "./Components/TreeViewDisplay.svelte";

	let dotNetSolutionFiles: DotNetSolutionFile[] = [];
	let selectedDotNetSolutionFile: DotNetSolutionFile | undefined;

	function getSolutionFilesInWorkspace() {
		let messageReadSolutionsInWorkspace = new MessageReadSolutionsInWorkspace();

		tsVscode.postMessage({
			type: undefined,
			value: messageReadSolutionsInWorkspace
		});
	}

	onMount(async () => {
		window.addEventListener("message", async (event) => {
			const message = event.data;

			switch (message.messageCategory) {
            	case MessageCategory.read:
					switch(message.messageReadKind) {
						case MessageReadKind.solutionsInWorkspace:
							dotNetSolutionFiles = message.dotNetSolutionFiles;
					}
			}
		});
		
		getSolutionFilesInWorkspace();
	});
</script>

<div class="dni_app">
	<button on:click={getSolutionFilesInWorkspace}>
		Reload Solutions In Workspace
	</button>
	
	<SelectDotNetSolutionFileForm dotNetSolutionFiles={dotNetSolutionFiles} />

	{#if selectedDotNetSolutionFile}
		<TreeViewDisplay data={selectedDotNetSolutionFile} />	
	{/if}
</div>

<style>
	.dni_app {
		height: calc(100vh - var(--input-margin-vertical) * 2);
	}
</style>