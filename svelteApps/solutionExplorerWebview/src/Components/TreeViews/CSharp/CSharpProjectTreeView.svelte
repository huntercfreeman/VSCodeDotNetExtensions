<script lang="ts">
	import { onMount } from "svelte";
	import type { IdeFile } from "../../../../../../out/FileSystem/Files/IdeFile";
	import type { CSharpProjectFile } from "../../../../../../out/FileSystem/Files/CSharp/CSharpProjectFile";
	import { MessageReadFileIntoEditor } from "../../../../../../out/Messages/Read/MessageReadFileIntoEditor";
	import { MessageReadVirtualFilesInCSharpProject } from "../../../../../../out/Messages/Read/MessageReadVirtualFilesInCSharpProject";
	import { MessageCategory } from "../../../../../../out/Messages/MessageCategory";
	import { MessageReadKind } from "../../../../../../out/Messages/Read/MessageReadKind";
	import TreeViewBase from "../../TreeViewBase.svelte";
	
    export let cSharpProjectFile: CSharpProjectFile;

	let children: IdeFile[] | undefined;

    function getTitleText() {
        return cSharpProjectFile.absoluteFilePath.filenameWithExtension;
    }

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
			let messageReadVirtualFilesInCSharpProject =
				new MessageReadVirtualFilesInCSharpProject(cSharpProjectFile);
			
			tsVscode.postMessage({
				type: undefined,
				value: messageReadVirtualFilesInCSharpProject,
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
              getTitleText={getTitleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
              hasDifferentParentContainer={hasDifferentParentContainer}
			  bind:children={children} />