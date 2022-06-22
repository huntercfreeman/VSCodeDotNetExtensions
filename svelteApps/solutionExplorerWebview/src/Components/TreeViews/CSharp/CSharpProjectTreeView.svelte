<script lang="ts">
	import { onMount } from "svelte";
	import type { IdeFile } from "../../../../../../out/FileSystem/Files/IdeFile";
	import type { CSharpProjectFile } from "../../../../../../out/FileSystem/Files/CSharp/CSharpProjectFile";
	import { MessageReadFileIntoEditor } from "../../../../../../out/Messages/Read/MessageReadFileIntoEditor";
	import { MessageReadVirtualFilesInProject } from "../../../../../../out/Messages/Read/MessageReadVirtualFilesInProject";
	import { MessageCategory } from "../../../../../../out/Messages/MessageCategory";
	import { MessageReadKind } from "../../../../../../out/Messages/Read/MessageReadKind";
	import TreeViewBase from "../../TreeViewBase.svelte";
	
    export let cSharpProjectFile: CSharpProjectFile;

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
		children = cSharpProjectFile.virtualChildFiles;

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
						case MessageReadKind.virtualFilesInCSharpProject:
							let messageReadVirtualFilesInCSharpProject =
								message as MessageReadVirtualFilesInCSharpProject;
							if (cSharpProjectFile.nonce ===
									messageReadVirtualFilesInCSharpProject.cSharpProjectFile.nonce) {
								
								cSharpProjectFile =
									messageReadVirtualFilesInCSharpProject.cSharpProjectFile;

								children = cSharpProjectFile.constantChildFiles;
								
								children = children.concat(cSharpProjectFile.virtualChildFiles);
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
			  bind:children={children} />