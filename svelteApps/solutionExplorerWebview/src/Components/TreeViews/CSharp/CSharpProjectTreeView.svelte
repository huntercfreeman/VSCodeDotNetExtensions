<script lang="ts">
	import { onMount } from "svelte";
	import type { IdeFile } from "../../../../../../out/FileSystem/Files/IdeFile";
	import type { CSharpProjectFile } from "../../../../../../out/FileSystem/Files/CSharp/CSharpProjectFile";
	import { MessageReadFileIntoEditor } from "../../../../../../out/Messages/Read/MessageReadFileIntoEditor";
	import { MessageReadVirtualFilesInProject } from "../../../../../../out/Messages/Read/MessageReadVirtualFilesInProject";
	import { MessageCategory } from "../../../../../../out/Messages/MessageCategory";
	import { MessageReadKind } from "../../../../../../out/Messages/Read/MessageReadKind";
	import TreeViewBase from "../../TreeViewBase.svelte";
import type { MessageReadRequestForRefresh } from "../../../../../../out/Messages/Read/MessageReadRequestForRefresh";
	
    export let cSharpProjectFile: CSharpProjectFile;
    export let index: number;
    export let parent: IdeFile | undefined;
	export let parentChildren: IdeFile[];

	let children: IdeFile[] | undefined;

	$: titleText = cSharpProjectFile.absoluteFilePath.filenameWithExtension;

	function titleOnClick() {
		let messageReadFileIntoEditor = new MessageReadFileIntoEditor(cSharpProjectFile);
		
		tsVscode.postMessage({
			type: undefined,
			value: messageReadFileIntoEditor,
		});
    }

	function getChildFiles(): IdeFile[] {
		children = cSharpProjectFile.virtualChildFiles
			?.filter(x => !hasDifferentParentContainer(x));

		if (!children) {
			let messageReadVirtualFilesInProject =
				new MessageReadVirtualFilesInProject(cSharpProjectFile);
			
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
			if (childIdeFile.virtualParentNonce !== cSharpProjectFile.nonce) {
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
							if (cSharpProjectFile.nonce ===
									messageReadVirtualFilesInProject.projectFile.nonce) {
								
								cSharpProjectFile =
									messageReadVirtualFilesInProject.projectFile;

								let temporary = cSharpProjectFile.constantChildFiles;
								
								children = temporary.concat(cSharpProjectFile.virtualChildFiles)
									?.filter(x => !hasDifferentParentContainer(x));
							}
							break;
						case MessageReadKind.requestForRefresh:
							let messageReadRequestForRefresh =
								message as MessageReadRequestForRefresh;
								
							if (cSharpProjectFile.nonce ===
								messageReadRequestForRefresh.ideFileNonce) {
								
									let messageReadVirtualFilesInProject =
										new MessageReadVirtualFilesInProject(
											cSharpProjectFile
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

<TreeViewBase ideFile="{cSharpProjectFile}" 
              titleText={titleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
              hasDifferentParentContainer={hasDifferentParentContainer}
			  bind:children={children}
			  {index}
			  {parent}
			  {parentChildren} />