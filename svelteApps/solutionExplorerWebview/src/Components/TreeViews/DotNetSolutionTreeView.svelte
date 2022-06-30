<script lang="ts">
	import { onMount } from "svelte";
	import type { IdeFile } from "../../../../../out/FileSystem/Files/IdeFile";
	import { FileKind } from "../../../../../out/FileSystem/FileKind";
	import type { SolutionFolderFile } from "../../../../../out/FileSystem/Files/SolutionFolderFile";
	import { MessageReadFileIntoEditor } from "../../../../../out/Messages/Read/MessageReadFileIntoEditor";
	import { MessageCategory } from "../../../../../out/Messages/MessageCategory";
	import { MessageReadKind } from "../../../../../out/Messages/Read/MessageReadKind";
	import type { MessageReadVirtualFilesInSolution } from "../../../../../out/Messages/Read/MessageReadVirtualFilesInSolution";
	import type { DotNetSolutionFile } from "../../../../../out/FileSystem/Files/DotNetSolutionFile";
	import TreeViewBase from "../TreeViewBase.svelte";
	
    export let dotNetSolutionFile: DotNetSolutionFile;
    export let index: number;
	export let depth: number;
    export let parent: IdeFile | undefined;
	export let parentChildren: IdeFile[];

	let children: IdeFile[] | undefined;

    $: titleText = dotNetSolutionFile.absoluteFilePath.filenameWithExtension;

	function titleOnSingleClick() {
		let messageReadFileIntoEditor = new MessageReadFileIntoEditor(dotNetSolutionFile, true);
		
		tsVscode.postMessage({
			type: undefined,
			value: messageReadFileIntoEditor,
		});
    }

	function titleOnDoubleClick() {
		let messageReadFileIntoEditor = new MessageReadFileIntoEditor(dotNetSolutionFile, false);
		
		tsVscode.postMessage({
			type: undefined,
			value: messageReadFileIntoEditor,
		});
    }

	function getChildFiles(): IdeFile[] {
        children = dotNetSolutionFile.virtualChildFiles
			?.filter(x => !hasDifferentParentContainer(x));

		return children;
    }

	function hasDifferentParentContainer(childIdeFile: IdeFile): boolean {

		if ((childIdeFile as any).projectModel !== undefined) {
			// IProjectModel
			let projectModel: any = (childIdeFile as any)
                        .projectModel;

			if(projectModel.solutionFolderParentProjectIdGuid) {
				return (childIdeFile.hasUnexpectedParent = true);
			}
		}
		
		if (childIdeFile.virtualParentNonce) {
			if (childIdeFile.virtualParentNonce !== dotNetSolutionFile.nonce) {
				return (childIdeFile.hasUnexpectedParent = true);
			}
		}

		return (childIdeFile.hasUnexpectedParent = false);
	}

	onMount(async () => {
		window.addEventListener("message", async (event) => {
			const message = event.data;
			switch (message.messageCategory) {
				case MessageCategory.read:
					switch (message.messageReadKind) {
						case MessageReadKind.virtualFilesInSolution:
							let messageReadVirtualFilesInSolution =
								message as MessageReadVirtualFilesInSolution;
							dotNetSolutionFile =
								messageReadVirtualFilesInSolution.dotNetSolutionFile;
							
							children = dotNetSolutionFile.virtualChildFiles
								?.filter(x => !hasDifferentParentContainer(x));

							break;
					}
			}
		});
	});
</script>

<TreeViewBase bind:ideFile="{dotNetSolutionFile}" 
              bind:titleText={titleText}
              {titleOnSingleClick}
              {titleOnDoubleClick}
              getChildFiles={getChildFiles}
			  bind:children={children}
			  {index}
			  {depth}
			  {parent}
			  {parentChildren} />