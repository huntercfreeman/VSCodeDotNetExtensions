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
	import { contextMenuTarget } from './menu.js';

	export let data: any;
	
	let isExpanded: boolean = false;
	let discardIsExpanded: boolean = false;

	let children: any[] | undefined;

	function getDataChildren(): any[] {
		children = 
		 	// .sln
			data.projects
			// solution folder
			?? data.solutionFolderEntries
			// .csproj || IdeFile
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
			return data.absoluteFilePath.filenameWithExtension;
		}
		else if (data.filenameWithExtension) {
			return data.filenameWithExtension;
		}
		else {
			
			return ConstantsTreeView.UNDEFINED_ABSOLUTE_FILE_PATH;
		}
	}	
	
	function titleOnClick(e: MouseEvent) {
		if (!data.solutionFolderEntries) {
			let absoluteFilePath = data.absoluteFilePath ??
				data;

			if(absoluteFilePath.isDirectory) {
				return;
			}

			tsVscode.postMessage(
				ConstantsMessages
					.ConstructMessage(ConstantsMessages.OPEN_FILE, 
					absoluteFilePath));
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
				case ConstantsMessages.ADD_EMPTY_FILE_TO_DIRECTORY:
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
	<div class="dni_tree-view-title" 
	     title="{getTitleText()}"
		 on:click="{(e) => titleOnClick(e)}"
		 on:contextmenu="{(e) => contextMenuTarget.set(data)}">
		{#if data.hideExpansionChevronWhenNoChildFiles && (((children ?? getDataChildren())?.length ?? 0) === 0)}
			<span style="visibility: hidden;" 
					tabindex="-1"
					class="dni_unselectable">
				<ExpansionChevron bind:isExpanded={discardIsExpanded} />
			</span>
		{:else}
			<span class="dni_tree-view-title-expansion-chevron">
				<ExpansionChevron bind:isExpanded={isExpanded} />
			</span>
		{/if}

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
		width: 100%;
		white-space: nowrap;
		display: inline-flex;
    	align-items: center;
	}
	
	.dni_tree-view-title:hover {
		background-color: var(--vscode-editorHoverWidget-background);
		color: var(--vscode-editorHoverWidget-foreground);
		cursor: pointer;
	}

	.dni_tree-view-title-text {
		margin-left: 2px;
	}
</style>