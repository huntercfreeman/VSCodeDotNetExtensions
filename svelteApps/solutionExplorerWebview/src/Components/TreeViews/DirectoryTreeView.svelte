<script lang="ts">
	import { onMount } from "svelte";
	import type { IdeFile } from "../../../../../out/FileSystem/Files/IdeFile";
	import TreeViewBase from "../TreeViewBase.svelte";
    import type { DirectoryFile } from "../../../../../out/FileSystem/Files/DirectoryFile";
	import { MessageReadFilesInDirectory } from "../../../../../out/Messages/Read/MessageReadFilesInDirectory";
	import { MessageCategory } from "../../../../../out/Messages/MessageCategory";
	import { MessageReadKind } from "../../../../../out/Messages/Read/MessageReadKind";
	
    export let directoryFile: DirectoryFile;

	let children: IdeFile[] | undefined;

	function getTitleText() {
        return directoryFile.absoluteFilePath.filenameWithExtension;
    }

	function titleOnClick() {
    }

	function getChildFiles(): IdeFile[] {
		children = directoryFile.childFiles;
		
		if (!children) {
			let messageReadFilesInDirectory =
				new MessageReadFilesInDirectory(directoryFile);
			
			tsVscode.postMessage({
				type: undefined,
				value: messageReadFilesInDirectory,
			});
			return [];
		}

		return children;
	}

	function hasDifferentParentContainer(childdirectoryFile: IdeFile): boolean {
		if (childdirectoryFile.virtualParentNonce) {
			if (childdirectoryFile.virtualParentNonce !== directoryFile.nonce) {
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
						case MessageReadKind.filesInDirectory:
							let messageReadFilesInDirectory =
								message as MessageReadFilesInDirectory;
							if (
								directoryFile.nonce ===
								messageReadFilesInDirectory.directoryFile.nonce
							) {
								directoryFile =
									messageReadFilesInDirectory.directoryFile;
								children = directoryFile.childFiles;
							}
							break;
					}
			}
		});
	});
</script>

<TreeViewBase ideFile="{directoryFile}" 
              getTitleText={getTitleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
              hasDifferentParentContainer={hasDifferentParentContainer}
			  bind:children={children} />