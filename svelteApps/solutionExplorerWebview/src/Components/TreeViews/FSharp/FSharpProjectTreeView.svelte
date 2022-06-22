<script lang="ts">
	import { onMount } from "svelte";
	import type { IdeFile } from "../../../../../../out/FileSystem/Files/IdeFile";
	import type { FSharpProjectFile } from "../../../../../../out/FileSystem/Files/FSharp/FSharpProjectFile";
	import { MessageReadFileIntoEditor } from "../../../../../../out/Messages/Read/MessageReadFileIntoEditor";
	import { MessageReadVirtualFilesInFSharpProject } from "../../../../../../out/Messages/Read/MessageReadVirtualFilesInFSharpProject";
	import { MessageCategory } from "../../../../../../out/Messages/MessageCategory";
	import { MessageReadKind } from "../../../../../../out/Messages/Read/MessageReadKind";
	import TreeViewBase from "../../TreeViewBase.svelte";
	
    export let fSharpProjectFile: FSharpProjectFile;

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
		children = fSharpProjectFile.virtualChildFiles;

		if (!children) {
			let messageReadVirtualFilesInFSharpProject =
				new MessageReadVirtualFilesInFSharpProject(fSharpProjectFile);
			
			tsVscode.postMessage({
				type: undefined,
				value: messageReadVirtualFilesInFSharpProject,
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
 console.log("fshpi");
			const message = event.data;
			switch (message.messageCategory) {
				case MessageCategory.read:
					switch (message.messageReadKind) {
						case MessageReadKind.virtualFilesInFSharpProject:
							let messageReadVirtualFilesInFSharpProject =
								message as MessageReadVirtualFilesInFSharpProject;
							if (fSharpProjectFile.nonce ===
									messageReadVirtualFilesInFSharpProject.fSharpProjectFile.nonce) {
								
								fSharpProjectFile =
									messageReadVirtualFilesInFSharpProject.fSharpProjectFile;
									children = fSharpProjectFile.virtualChildFiles;

// 								children = fSharpProjectFile.constantChildFiles;
								
// 								children = children.concat(fSharpProjectFile.virtualChildFiles);
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
              hasDifferentParentContainer={hasDifferentParentContainer}
			  bind:children={children} />