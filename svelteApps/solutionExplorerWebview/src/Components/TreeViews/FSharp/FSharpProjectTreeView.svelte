<script lang="ts">
	import { onMount } from "svelte";
	import type { IdeFile } from "../../../../../../out/FileSystem/Files/IdeFile";
	import type { FSharpProjectFile } from "../../../../../../out/FileSystem/Files/FSharp/FSharpProjectFile";
	import { MessageReadFileIntoEditor } from "../../../../../../out/Messages/Read/MessageReadFileIntoEditor";
	import { MessageReadVirtualFilesInProject } from "../../../../../../out/Messages/Read/MessageReadVirtualFilesInProject";
	import { MessageCategory } from "../../../../../../out/Messages/MessageCategory";
	import { MessageReadKind } from "../../../../../../out/Messages/Read/MessageReadKind";
	import TreeViewBase from "../../TreeViewBase.svelte";
import type { MessageReadRequestForRefresh } from "../../../../../../out/Messages/Read/MessageReadRequestForRefresh";
	
    export let fSharpProjectFile: FSharpProjectFile;
    export let index: number;
    export let parent: IdeFile | undefined;
	export let parentChildren: IdeFile[];

	let children: IdeFile[] | undefined;

	$: titleText = fSharpProjectFile.absoluteFilePath.filenameWithExtension;

	function titleOnClick() {
		let messageReadFileIntoEditor = new MessageReadFileIntoEditor(fSharpProjectFile);
		
		tsVscode.postMessage({
			type: undefined,
			value: messageReadFileIntoEditor,
		});
    }

	function getChildFiles(): IdeFile[] {
		children = fSharpProjectFile.virtualChildFiles
			?.filter(x => !hasDifferentParentContainer(x));

		if (!children) {
			let messageReadVirtualFilesInProject =
				new MessageReadVirtualFilesInProject(fSharpProjectFile);
			
			tsVscode.postMessage({
				type: undefined,
				value: messageReadVirtualFilesInProject,
			});

			return [];
		}

		return children;
	}

	function hasDifferentParentContainer(childIdeFile: IdeFile): boolean {
		if (childIdeFile.virtualParentNonce) {
			if (childIdeFile.virtualParentNonce !== fSharpProjectFile.nonce) {
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
						case MessageReadKind.virtualFilesInProject:
							let messageReadVirtualFilesInProject =
								message as MessageReadVirtualFilesInProject;
							if (fSharpProjectFile.nonce ===
									messageReadVirtualFilesInProject.projectFile.nonce) {
								
								fSharpProjectFile =
									messageReadVirtualFilesInProject.projectFile;
							
								let temporary = fSharpProjectFile.constantChildFiles;
								
								children = temporary.concat(fSharpProjectFile.virtualChildFiles)
									?.filter(x => !hasDifferentParentContainer(x));
							}
							break;
						case MessageReadKind.requestForRefresh:
							let messageReadRequestForRefresh =
								message as MessageReadRequestForRefresh;
								
							if (fSharpProjectFile.nonce ===
								messageReadRequestForRefresh.ideFileNonce) {
								
									let messageReadVirtualFilesInProject =
										new MessageReadVirtualFilesInProject(
											fSharpProjectFile
										);

									tsVscode.postMessage({
										type: undefined,
										value: messageReadVirtualFilesInProject,
									});
							}
							break;
					}
			}
		});
	});
</script>

<TreeViewBase ideFile="{fSharpProjectFile}" 
              titleText={titleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
			  bind:children={children}
			  {index}
			  {parent}
			  {parentChildren} />