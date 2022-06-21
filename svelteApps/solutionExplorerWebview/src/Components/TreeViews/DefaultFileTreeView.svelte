<script lang="ts">
	import type { IdeFile } from "../../../../../out/FileSystem/Files/IdeFile";
	import TreeViewBase from "../TreeViewBase.svelte";
    import { MessageReadFileIntoEditor } from "../../../../../out/Messages/Read/MessageReadFileIntoEditor";
	
    export let ideFile: IdeFile;

	let children: IdeFile[] | undefined;

    function getTitleText() {
        return ideFile.absoluteFilePath.filenameWithExtension;
    }

	function titleOnClick() {
		let messageReadFileIntoEditor = new MessageReadFileIntoEditor(ideFile);
		
        tsVscode.postMessage({
			type: undefined,
			value: messageReadFileIntoEditor,
		});
    }

	function getChildFiles(): IdeFile[] {
        children = ideFile.virtualChildFiles;

		return children ?? [];
	}

	function hasDifferentParentContainer(childIdeFile: IdeFile): boolean {
		if (childIdeFile.virtualParentNonce) {
			if (childIdeFile.virtualParentNonce !== ideFile.nonce) {
				return true;
			}
		}

		return false;
	}
</script>

<TreeViewBase ideFile="{ideFile}" 
              getTitleText={getTitleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
              hasDifferentParentContainer={hasDifferentParentContainer}
			  bind:children={children} />