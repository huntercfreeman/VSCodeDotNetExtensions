<script lang="ts">
	import { onMount } from "svelte";
	import type { IdeFile } from "../../../../out/FileSystem/Files/IdeFile";
	import { FileKind } from "../../../../out/FileSystem/FileKind";
	import type { CSharpProjectFile } from "../../../../out/FileSystem/Files/CSharpProjectFile";
	import { MessageReadFilesInDirectory } from "../../../../out/Messages/Read/MessageReadFilesInDirectory";
	import { MessageReadFileIntoEditor } from "../../../../out/Messages/Read/MessageReadFileIntoEditor";
	import { MessageReadVirtualFilesInCSharpProject } from "../../../../out/Messages/Read/MessageReadVirtualFilesInCSharpProject";
	import { MessageReadProjectReferencesInProject } from "../../../../out/Messages/Read/MessageReadProjectReferencesInProject";
	import { MessageReadNugetPackageReferencesInProject } from "../../../../out/Messages/Read/MessageReadNugetPackageReferencesInProject";
	import { MessageCategory } from "../../../../out/Messages/MessageCategory";
	import { MessageReadKind } from "../../../../out/Messages/Read/MessageReadKind";
	import type { MessageReadVirtualFilesInSolution } from "../../../../out/Messages/Read/MessageReadVirtualFilesInSolution";
	import ExpansionChevron from "./ExpansionChevron.svelte";
	import FileIconDisplay from "./FileIconDisplay.svelte";
	import { contextMenuTarget } from "./menu.js";

	export let ideFile: IdeFile;

	let discardIsExpanded: boolean = false;

	let children: any[] | undefined;

	function getChildFiles(): any[] {
		switch (ideFile.fileKind) {
			case FileKind.directory:
				children = ideFile.childFiles;
				break;
			case FileKind.projectDependencies:
				children = ideFile.constantChildFiles;
				break;
			default:
				children = ideFile.virtualChildFiles;
				break;
		}

		if (!children) {
			switch (ideFile.fileKind) {
				case FileKind.cSharpProject:
					let messageReadVirtualFilesInCSharpProject =
						new MessageReadVirtualFilesInCSharpProject(ideFile);

					tsVscode.postMessage({
						type: undefined,
						value: messageReadVirtualFilesInCSharpProject,
					});
					break;
				case FileKind.directory:
					let messageReadFilesInDirectory =
						new MessageReadFilesInDirectory(ideFile);

					tsVscode.postMessage({
						type: undefined,
						value: messageReadFilesInDirectory,
					});
					break;
				case FileKind.projectReferences:
					let messageReadProjectReferencesInProject =
						new MessageReadProjectReferencesInProject(ideFile);

					tsVscode.postMessage({
						type: undefined,
						value: messageReadProjectReferencesInProject,
					});
					break;
				case FileKind.nugetPackageDependencies:
					let messageReadNugetPackageReferencesInProject =
						new MessageReadNugetPackageReferencesInProject(ideFile);

					tsVscode.postMessage({
						type: undefined,
						value: messageReadNugetPackageReferencesInProject,
					});
					break;
			}

			return [];
		}

		return children;
	}

	function hasDifferentParentContainer(childIdeFile: IdeFile): boolean {
		if (childIdeFile.fileKind === FileKind.cSharpProject ||
		    childIdeFile.fileKind === FileKind.solutionFolder) {
				
			let cSharpProjectFile = childIdeFile as CSharpProjectFile;

			if (
				cSharpProjectFile.cSharpProjectModel
					.solutionFolderParentProjectIdGuid !== undefined
			) {
				if (ideFile.fileKind === FileKind.solution) {
					return true;
				}

				let solutionFolderFile = ideFile as CSharpProjectFile;

				if (
					solutionFolderFile.cSharpProjectModel.projectIdGuid ===
					cSharpProjectFile.cSharpProjectModel
						.solutionFolderParentProjectIdGuid
				) {
					return false;
				}

				return true;
			}
		}

		if (childIdeFile.virtualParentNonce) {
			if (childIdeFile.virtualParentNonce !== ideFile.nonce) {
				return true;
			}
		}

		return false;
	}

	function getTitleText() {
		return ideFile.absoluteFilePath.filenameWithExtension;
	}

	function titleOnClick(e: MouseEvent) {
		switch (ideFile.fileKind) {
			case FileKind.solutionFolder:
			case FileKind.projectReferences:
			case FileKind.projectReference:
			case FileKind.nugetPackageDependencies:
			case FileKind.nugetPackageDependency:
				return;
		}

		let messageReadFileIntoEditor = new MessageReadFileIntoEditor(ideFile);

		tsVscode.postMessage({
			type: undefined,
			value: messageReadFileIntoEditor,
		});
	}

	onMount(async () => {
		window.addEventListener("message", async (event) => {
			const message = event.data;

			switch (message.messageCategory) {
				case MessageCategory.read:
					switch (message.messageReadKind) {
						case MessageReadKind.filesInDirectory:
							let messageReadFilesInDirectory =
								message as MessageReadFilesInDirectory;
							if (
								ideFile.nonce ===
								messageReadFilesInDirectory.directoryFile.nonce
							) {
								ideFile =
									messageReadFilesInDirectory.directoryFile;
								children = ideFile.childFiles;
							}
							break;
						case MessageReadKind.virtualFilesInCSharpProject:
							let messageReadVirtualFilesInCSharpProject =
								message as MessageReadVirtualFilesInCSharpProject;
							if (
								ideFile.nonce ===
								messageReadVirtualFilesInCSharpProject
									.cSharpProjectFile.nonce
							) {
								ideFile =
									messageReadVirtualFilesInCSharpProject.cSharpProjectFile;

								children = ideFile.constantChildFiles;
								children = children.concat(
									ideFile.virtualChildFiles
								);
							}
							break;
						case MessageReadKind.virtualFilesInSolution:
							let messageReadVirtualFilesInSolution =
								message as MessageReadVirtualFilesInSolution;

							if (ideFile.fileKind === FileKind.solution) {
								ideFile =
									messageReadVirtualFilesInSolution.dotNetSolutionFile;

								children = ideFile.virtualChildFiles;
							}
							break;
						case MessageReadKind.projectReferencesInProject:
							let messageReadProjectReferencesInProject =
								message as MessageReadProjectReferencesInProject;

							if (
								ideFile.fileKind === FileKind.projectReferences
							) {
								ideFile =
									messageReadProjectReferencesInProject.cSharpProjectProjectReferencesFile;

								children = ideFile.virtualChildFiles;
							}
							break;
						case MessageReadKind.nugetPackageReferencesInProject:
							let messageReadNugetPackageReferencesInProject =
								message as MessageReadNugetPackageReferencesInProject;

							if (
								ideFile.fileKind ===
								FileKind.nugetPackageDependencies
							) {
								ideFile =
									messageReadNugetPackageReferencesInProject.cSharpProjectNugetPackageDependenciesFile;

								children = ideFile.virtualChildFiles;
							}
							break;
					}
			}
		});
	});
</script>

<div class="dni_tree-view">
	<div
		class="dni_tree-view-title"
		title={getTitleText()}
		on:click={(e) => titleOnClick(e)}
		on:contextmenu={(e) => contextMenuTarget.set(ideFile)}
	>
		{#if ideFile.hideExpansionChevronWhenNoChildFiles && ((children ?? getChildFiles())?.length ?? 0) === 0}
			<span
				style="visibility: hidden;"
				tabindex="-1"
				class="dni_unselectable"
			>
				<ExpansionChevron bind:isExpanded={discardIsExpanded} />
			</span>
		{:else}
			<span class="dni_tree-view-title-expansion-chevron">
				<ExpansionChevron bind:isExpanded={ideFile.isExpanded} />
			</span>
		{/if}

		<span class="dni_tree-view-title-text">
			<FileIconDisplay fileKind={ideFile.fileKind} />

			{getTitleText()}
		</span>
	</div>

	<div class="dni_tree-view-children">
		{#if ideFile.isExpanded}
			{#each children ?? getChildFiles() as child (child.nonce)}
				{#if !hasDifferentParentContainer(child)}
					<svelte:self ideFile={child} />
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
