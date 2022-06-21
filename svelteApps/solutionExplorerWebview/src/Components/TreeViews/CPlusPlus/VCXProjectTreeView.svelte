<script lang="ts">
	import type { IdeFile } from "../../../../../../out/FileSystem/Files/IdeFile";
	import type { VCXProjectFile } from "../../../../../../out/FileSystem/Files/CPlusPlus/VCXProjectFile";
	import { MessageReadFileIntoEditor } from "../../../../../../out/Messages/Read/MessageReadFileIntoEditor";
	import TreeViewBase from "../../TreeViewBase.svelte";
	
    export let vcxProjectFile: VCXProjectFile;

	let children: IdeFile[] | undefined;

    function getTitleText() {
        return vcxProjectFile.absoluteFilePath.filenameWithExtension;
    }

	function titleOnClick() {
		let messageReadFileIntoEditor = new MessageReadFileIntoEditor(vcxProjectFile);
		
		tsVscode.postMessage({
			type: undefined,
			value: messageReadFileIntoEditor,
		});
    }

	function getChildFiles(): IdeFile[] {
		return vcxProjectFile.constantChildFiles;
	}

	function hasDifferentParentContainer(childIdeFile: IdeFile): boolean {
		if (childIdeFile.virtualParentNonce) {
			if (childIdeFile.virtualParentNonce !== vcxProjectFile.nonce) {
				return true;
			}
		}

		return false;
	}
</script>

<TreeViewBase ideFile="{vcxProjectFile}" 
              getTitleText={getTitleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
              hasDifferentParentContainer={hasDifferentParentContainer}
			  bind:children={children} />