<script lang="ts">
	import { onMount } from "svelte";
	import type { IdeFile } from "../../../../../out/FileSystem/Files/IdeFile";
	import { FileKind } from "../../../../../out/FileSystem/FileKind";
	import type { CSharpProjectFile } from "../../../../../out/FileSystem/Files/CSharpProjectFile";
	import type { SolutionFolderFile } from "../../../../../out/FileSystem/Files/SolutionFolderFile";
	import { MessageReadFileIntoEditor } from "../../../../../out/Messages/Read/MessageReadFileIntoEditor";
	import { MessageCategory } from "../../../../../out/Messages/MessageCategory";
	import { MessageReadKind } from "../../../../../out/Messages/Read/MessageReadKind";
	import type { MessageReadVirtualFilesInSolution } from "../../../../../out/Messages/Read/MessageReadVirtualFilesInSolution";
	import type { DotNetSolutionFile } from "../../../../../out/FileSystem/Files/DotNetSolutionFile";
	import TreeViewBase from "../TreeViewBase.svelte";
	
    export let dotNetSolutionFile: DotNetSolutionFile;

	let children: IdeFile[] | undefined;

    function getTitleText() {
        return dotNetSolutionFile.absoluteFilePath.filenameWithExtension;
    }

	function titleOnClick() {
		let messageReadFileIntoEditor = new MessageReadFileIntoEditor(dotNetSolutionFile);
		
		tsVscode.postMessage({
			type: undefined,
			value: messageReadFileIntoEditor,
		});
    }

	function getChildFiles(): IdeFile[] {
        children = dotNetSolutionFile.virtualChildFiles;

		return children;
    }

	function hasDifferentParentContainer(childIdeFile: IdeFile): boolean {
		if (childIdeFile.fileKind === FileKind.solutionFolder ||
		   childIdeFile.fileKind === FileKind.cSharpProject) {
			let childProjectModel: any = childIdeFile.fileKind === FileKind.solutionFolder
				? (childIdeFile as SolutionFolderFile).solutionFolderModel
				: (childIdeFile as CSharpProjectFile).cSharpProjectModel;
			if(childProjectModel.solutionFolderParentProjectIdGuid) {
				return true;
			}
		}
		
		if (childIdeFile.virtualParentNonce) {
			if (childIdeFile.virtualParentNonce !== dotNetSolutionFile.nonce) {
				return true;
			}
		}

		return false;
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
							
							children = dotNetSolutionFile.virtualChildFiles;

							break;
					}
			}
		});
	});
</script>

<TreeViewBase ideFile="{dotNetSolutionFile}" 
              getTitleText={getTitleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
              hasDifferentParentContainer={hasDifferentParentContainer}
			  bind:children={children} />