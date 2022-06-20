<script lang="ts">
	import { MessageReadActiveDotNetSolutionFile } from "../../../out/Messages/Read/MessageReadActiveDotNetSolutionFile";
	import type { DotNetSolutionFile } from "../../../out/FileSystem/Files/DotNetSolutionFile";
	import { onMount } from "svelte";
	import { MessageCategory } from "../../../out/Messages/MessageCategory";
	import { MessageReadKind } from "../../../out/Messages/Read/MessageReadKind";
	import { MessageReadProjectXmlIntoXmlEditor } from "../../../out/Messages/Read/MessageReadProjectXmlIntoXmlEditor";
	import SelectProjectFileForm from "./Components/SelectProjectFileForm.svelte";
	import XmlFileEditor from "./Components/XmlEditors/XmlFileEditor.svelte";

	let activeDotNetSolutionFile: DotNetSolutionFile | undefined;
	let selectedProjectModel: any;
	let selectedProjectXmlFileModel: any;

	function parseSelectedProjectFile() {
		selectedProjectXmlFileModel = undefined;

		if (!selectedProjectModel) {
			return;
		}

		let messageReadProjectXmlIntoXmlEditor = 
			new MessageReadProjectXmlIntoXmlEditor(selectedProjectModel, undefined);

		tsVscode.postMessage({
			type: undefined,
			value: messageReadProjectXmlIntoXmlEditor,
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
						case MessageReadKind.projectXmlIntoXmlEditor:
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
		bind:selectedProjectModel={selectedProjectModel}
		projectFiles={activeDotNetSolutionFile.solutionModel.projects
						.filter(x => x.solutionFolderEntries === undefined)}
	/>

<button on:click="{parseSelectedProjectFile}">Parse {selectedProjectModel?.absoluteFilePath.filenameWithExtension ?? "undefined"} XML</button>


{#if selectedProjectXmlFileModel}
	<XmlFileEditor xmlFileModel={selectedProjectXmlFileModel} />
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
