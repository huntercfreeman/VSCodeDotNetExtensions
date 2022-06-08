<script lang="ts">
	import { onMount } from "svelte";
    import type { IdeFile } from "../../../out/FileSystem/Files/IdeFile";
    import { FileKind } from "../../../out/FileSystem/FileKind";
    import { MessageReadFilesInDirectory } from "../../../out/Messages/Read/MessageReadFilesInDirectory";
    import { MessageReadFileIntoEditor } from "../../../out/Messages/Read/MessageReadFileIntoEditor";
    import { MessageReadVirtualFilesInCSharpProject } from "../../../out/Messages/Read/MessageReadVirtualFilesInCSharpProject";
	import { MessageCategory } from "../../../out/Messages/MessageCategory";
	import { MessageReadKind } from "../../../out/Messages/Read/MessageReadKind";
	import ExpansionChevron from "./ExpansionChevron.svelte";
	import FileIconDisplay from './FileIconDisplay.svelte';
	import { contextMenuTarget } from './menu.js';

	export let ideFile: IdeFile;
	
	let isExpanded: boolean = false;
	let discardIsExpanded: boolean = false;

	let children: any[] | undefined;

	function getDataChildren(): any[] {
        switch (ideFile.fileKind) {
            case FileKind.directory:
                children = ideFile.childFiles;
                break;
            default:
                children = ideFile.virtualChildFiles;
                break;
        }

        if(!children) {
            switch (ideFile.fileKind) {
                case FileKind.cSharpProject:
					let messageReadVirtualFilesInCSharpProject = 
						new MessageReadVirtualFilesInCSharpProject(ideFile);

					tsVscode.postMessage({
                        type: undefined,
                        value: messageReadVirtualFilesInCSharpProject
                    });
                case FileKind.directory:
                    let messageReadFilesInDirectory = 
                        new MessageReadFilesInDirectory(ideFile);

                    tsVscode.postMessage({
                        type: undefined,
                        value: messageReadFilesInDirectory
                    });
            }
			
			return [];
		}

		return children;
	}

	function hasDifferentParentContainer(childIdeFile: IdeFile): boolean {
		if(childIdeFile.virtualParentNonce) {
			if(childIdeFile.virtualParentNonce !==
				ideFile.nonce) {
					return true;
			}

			return false;
		}
	}

	function getTitleText() {
        return ideFile.absoluteFilePath.filenameWithExtension;
	}	
	
	function titleOnClick(e: MouseEvent) {
        switch (ideFile.fileKind) {
            case FileKind.solutionFolder:
            case FileKind.directory:
                return;
        }

        let messageReadFileIntoEditor = 
            new MessageReadFileIntoEditor(ideFile.absoluteFilePath);

        tsVscode.postMessage({
            type: undefined,
            value: messageReadFileIntoEditor
        });
	}	

	onMount(async () => {
		window.addEventListener("message", async (event) => {
			const message = event.data;

			switch (message.messageCategory) {
            	case MessageCategory.read:
					switch(message.messageReadKind) {
						case MessageReadKind.filesInDirectory:
							let messageReadFilesInDirectory = message as MessageReadFilesInDirectory;
                            if(ideFile.nonce === messageReadFilesInDirectory.directoryFile.nonce) {
								ideFile = messageReadFilesInDirectory.directoryFile;
                            }
						case MessageReadKind.filesInDirectory:
							let messageReadVirtualFilesInCSharpProject = message as MessageReadVirtualFilesInCSharpProject;
                            if(ideFile.nonce === messageReadVirtualFilesInCSharpProject.cSharpProjectFile.nonce) {
								ideFile = messageReadVirtualFilesInCSharpProject.cSharpProjectFile;
                            }
					}
			}
		});
	});
</script>

<div class="dni_tree-view">
	<div class="dni_tree-view-title" 
	     title="{getTitleText()}"
		 on:click="{(e) => titleOnClick(e)}"
		 on:contextmenu="{(e) => contextMenuTarget.set(ideFile)}">
		{#if ideFile.hideExpansionChevronWhenNoChildFiles && (((children ?? getDataChildren())?.length ?? 0) === 0)}
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
			<FileIconDisplay fileKind={ideFile.fileKind} />

			{getTitleText()}
		</span>
	</div>
	
	<div class="dni_tree-view-children">
		{#if isExpanded}
			{#each (children ?? getDataChildren()) as child}
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