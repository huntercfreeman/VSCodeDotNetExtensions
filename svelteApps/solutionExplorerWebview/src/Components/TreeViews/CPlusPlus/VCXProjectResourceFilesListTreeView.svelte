<script lang="ts">
	import type { IdeFile } from "../../../../../../out/FileSystem/Files/IdeFile";
	import { MessageReadFileIntoEditor } from "../../../../../../out/Messages/Read/MessageReadFileIntoEditor";
	import TreeViewBase from "../../TreeViewBase.svelte";
	import type { VCXProjectResourceFilesListFile } from "../../../../../../out/FileSystem/Files/CPlusPlus/VCXProjectResourceFilesListFile";
	
    export let vcxProjectResourceFilesListFile: VCXProjectResourceFilesListFile;

	let children: IdeFile[] | undefined;

	$: titleText = vcxProjectResourceFilesListFile.absoluteFilePath.filenameWithExtension;

	function titleOnClick() {
    }

	function getChildFiles(): IdeFile[] {
		return [];
	}

	function hasDifferentParentContainer(childIdeFile: IdeFile): boolean {
		if (childIdeFile.virtualParentNonce) {
			if (childIdeFile.virtualParentNonce !== vcxProjectResourceFilesListFile.nonce) {
				return true;
			}
		}

		return false;
	}
</script>

<TreeViewBase ideFile="{vcxProjectResourceFilesListFile}" 
              titleText={titleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
              hasDifferentParentContainer={hasDifferentParentContainer}
			  bind:children={children} />