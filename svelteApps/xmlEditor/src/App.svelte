<script lang="ts">
	import { MessageReadActiveDotNetSolutionFile } from "../../../out/Messages/Read/MessageReadActiveDotNetSolutionFile";
	import type { DotNetSolutionFile } from "../../../out/FileSystem/Files/DotNetSolutionFile";
	import { onMount } from "svelte";
	import { MessageCategory } from "../../../out/Messages/MessageCategory";
	import { MessageReadKind } from "../../../out/Messages/Read/MessageReadKind";
	import { MessageReadProjectIntoXmlEditor } from "../../../out/Messages/Read/MessageReadProjectIntoXmlEditor";
	import SelectProjectFileForm from "./Components/SelectProjectFileForm.svelte";

	let activeDotNetSolutionFile: DotNetSolutionFile | undefined;
	let selectedProjectFile: any;
	let selectedProjectXmlFileModel: any;

	function parseSelectedProjectFile(projectFile: any) {
		selectedProjectFile = projectFile;

		if (!selectedProjectFile) {
			selectedProjectXmlFileModel = undefined;
		}

		let messageReadProjectIntoXmlEditor = new MessageReadProjectIntoXmlEditor();

		tsVscode.postMessage({
			type: undefined,
			value: messageReadProjectIntoXmlEditor,
		});
	}

	function readActiveDotNetSolutionFile() {
		let messageReadActiveDotNetSolutionFile = new MessageReadActiveDotNetSolutionFile();

		tsVscode.postMessage({
			type: undefined,
			value: messageReadActiveDotNetSolutionFile,
		});
	}

	onMount(async () => {
		window.addEventListener("message", async (event) => {
			const message = event.data;

			switch (message.messageCategory) {
				case MessageCategory.read:
					switch (message.messageReadKind) {
						case MessageReadKind.activeDotNetSolutionFile:
							activeDotNetSolutionFile = message.activeDotNetSolutionFile;
							break;
					}
					switch (message.messageReadKind) {
						case MessageReadKind.xmlIntoXmlEditor:
							selectedProjectXmlFileModel = message.xmlFileModel;
							break;
					}
			}
		});

		readActiveDotNetSolutionFile();
	});
</script>

<button on:click={readActiveDotNetSolutionFile}>
	readActiveDotNetSolutionFile
</button>

{#if activeDotNetSolutionFile}
	<div style="margin-top: 4px;">
		Active solution: <em
			>{activeDotNetSolutionFile.absoluteFilePath
				.filenameWithExtension}</em
		>
	</div>

	<hr />

	<SelectProjectFileForm
		bind:selectedProjectFile
		projectFiles={activeDotNetSolutionFile.solutionModel.projects
						.filter(x => x.solutionFolderEntries === undefined)}
		onChangeCallback={parseSelectedProjectFile}
	/>

	{#if selectedProjectXmlFileModel}
		{JSON.stringify(selectedProjectXmlFileModel, null, 2)}
	{/if}
{:else}
	<div>
		Solution is undefined
	</div>
{/if}

<style>
	em {
		font-style: normal;
		color: var(--vscode-editorInfo-foreground);
	}
</style>
