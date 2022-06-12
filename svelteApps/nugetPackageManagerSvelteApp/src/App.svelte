<script lang="ts">
	import { onMount } from "svelte";
    import type { DotNetSolutionFile } from "../../../out/FileSystem/Files/DotNetSolutionFile";
	import { MessageCategory } from "../../../out/Messages/MessageCategory";
	import { MessageReadKind } from "../../../out/Messages/Read/MessageReadKind";
	import { MessageReadActiveDotNetSolutionFile } from "../../../out/Messages/Read/MessageReadActiveDotNetSolutionFile";
	import { ConstantsFileExtensionsNoPeriod } from "../../../out/Constants/ConstantsFileExtensionsNoPeriod";
	import type { CSharpProjectFile } from "../../../out/FileSystem/Files/CSharpProjectFile";
	import SelectProjectFileForm from "./Components/SelectProjectFileForm.svelte";

    let selectedDotNetSolutionFile: DotNetSolutionFile | undefined;
	let selectedProjectFile: CSharpProjectFile;


    function syncActiveDotNetSolutionFile() {
		let messageReadActiveDotNetSolutionFile = new MessageReadActiveDotNetSolutionFile(undefined);

		tsVscode.postMessage({
			type: undefined,
			value: messageReadActiveDotNetSolutionFile
		});
	}
    
    onMount(async () => {
		window.addEventListener("message", async (event) => {
			const message = event.data;

			switch (message.messageCategory) {
            	case MessageCategory.read:
					switch(message.messageReadKind) {
						case MessageReadKind.solutionIntoTreeView:
							selectedDotNetSolutionFile = message.dotNetSolutionFile;
							break;
						case MessageReadKind.activeDotNetSolutionFile:
							selectedDotNetSolutionFile = message.activeDotNetSolutionFile;
							break;
					}
			}
		});
	});
</script>

<div class="dni_app">
    Nuget Package Manager

	<button on:click={syncActiveDotNetSolutionFile}>Sync Active .NET Solution from Solution Explorer</button>

	{#if selectedDotNetSolutionFile}
    	<div>Active solution: <em>{selectedDotNetSolutionFile.absoluteFilePath.filenameWithExtension}</em></div>

		<SelectProjectFileForm bind:selectedProjectFile={selectedProjectFile} 
		                       projectFiles={selectedDotNetSolutionFile.solutionModel.projects} />
	{:else}
		<div>Select a .NET solution using the Solution Explorer then sync this webview</div>
	{/if}
</div>

<style>
	.dni_app {
		height: calc(100vh - var(--input-margin-vertical) * 2);
	}

	em {
        font-style: normal;
        color: var(--vscode-editorInfo-foreground);
    }
</style>