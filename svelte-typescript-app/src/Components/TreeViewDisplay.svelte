<script lang="ts">
	import { onMount } from "svelte";
	import type { AbsoluteFilePath } from "../../../out/FileSystem/AbsoluteFilePath";
	import type { SolutionModel } from "../../../out/DotNet/SolutionModel";
	import type { CSharpProjectModel } from "../../../out/DotNet/CSharpProjectModel";
	import { ConstantsMessages } from "../../../out/Constants/ConstantsMessages";
	import { ConstantsTreeView } from "../../../out/Constants/ConstantsTreeView";
	import { FileKind } from "../../../out/FileSystem/FileKind";
	import { ConstantsContextualInformation } from "../../../out/Constants/ConstantsContextualInformation";
	import ExpansionChevron from "./ExpansionChevron.svelte";
	import { json } from "stream/consumers";
	import ContextMenu from './ContextMenu.svelte';
	import FileIconDisplay from './FileIconDisplay.svelte';

	export let data: any;
	
	let isExpanded: boolean = false;

	let children: any[] | undefined;

	function getDataChildren(): any[] {
		children = 
		 	// .sln
			data.projects
			// solution folder
			?? data.solutionFolderEntries
			// .csproj || IFile
			?? data.childFiles;

		if(!children) {
			if (data.secondGuid) {
				tsVscode.postMessage(
					ConstantsMessages
						.ConstructMessage(ConstantsMessages.LOAD_CSHARP_PROJECT_CHILD_FILES, 
							data));
			}
			else if (data.fileKind) {
				if(data.fileKind === FileKind.directory) {
					tsVscode.postMessage(
						ConstantsMessages
							.ConstructMessage(ConstantsMessages.LOAD_DIRECTORY_CHILD_FILES, 
								data));
				}
			}
			
			return [];
		}

		return children;
	}

	function hasDifferentParentContainer(child: any): boolean {
		if(child.solutionFolderParentSecondGuid) {
			if(child.solutionFolderParentSecondGuid !==
				data.secondGuid) {
					return true;
			}

			return false;
		}
	}

	function getTitleText() {
		if (data.absoluteFilePath) {
			return data.absoluteFilePath.fileNameWithExtension;
		}
		else if (data.fileNameWithExtension) {
			return data.fileNameWithExtension;
		}
		else {
			
			return ConstantsTreeView.UNDEFINED_ABSOLUTE_FILE_PATH;
		}
	}	

	onMount(async () => {
		window.addEventListener("message", async (event) => {
			const message = event.data;
			switch (message.type) {
				case ConstantsMessages.LOAD_CSHARP_PROJECT_CHILD_FILES:
					if(message.value.secondGuid === data.secondGuid) {
						data = message.value;
						children = message.value.childFiles;
					}
					break;
				case ConstantsMessages.LOAD_DIRECTORY_CHILD_FILES:
					if(message.value.nonce === data.nonce) {
						data = message.value;
						children = message.value.childFiles;
					}
					break;
			}
		});
	});
</script>

<div class="dni_tree-view">
	<div class="dni_tree-view-title" title="{getTitleText()}">
		<span class="dni_tree-view-title-expansion-chevron">
			<ExpansionChevron bind:isExpanded={isExpanded} />
		</span>

		<span class="dni_tree-view-title-text">
			{#if data.fileKind}
				<FileIconDisplay fileKind={data.fileKind} />
			{:else if data.projects}
				<FileIconDisplay fileKind={FileKind.solution} />
			{:else if data.solutionFolderEntries}
				<FileIconDisplay fileKind={FileKind.solutionFolder} />
			{:else if data.secondGuid}
				<FileIconDisplay fileKind={FileKind.cSharpProject} />
			{/if}
			{getTitleText()}
		</span>
	</div>
	
	<div class="dni_tree-view-children">
		{#if isExpanded}
			{#each (children ?? getDataChildren()) as child}
				{#if !hasDifferentParentContainer(child)}
					<svelte:self data={child} />
				{/if}
			{/each}
		{/if}
	</div>
</div>

<style>
	.dni_tree-view-children {
		margin-left: 10px;
		padding-left: 3px;
    	border-left: 1px solid var(--vscode-tree-indentGuidesStroke);
	}

	.dni_tree-view-title {
		white-space: nowrap;
		display: inline-flex;
    	align-items: center;
	}

	.dni_tree-view-title-text {
		margin-left: 2px;
	}

	.dni_tree-view-title-expansion-chevron:hover {
		color: var(--vscode-button-foreground);
		background-color: var(--vscode-button-hoverBackground);
	}
</style>