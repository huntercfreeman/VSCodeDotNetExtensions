<script lang="ts">
	import type { IdeFile } from "../../../../../../out/FileSystem/Files/IdeFile";
	import { MessageReadFileIntoEditor } from "../../../../../../out/Messages/Read/MessageReadFileIntoEditor";
	import TreeViewBase from "../../TreeViewBase.svelte";
	import type { VCXProjectReferencesListFile } from "../../../../../../out/FileSystem/Files/CPlusPlus/VCXProjectReferencesListFile";
	
    export let vcxProjectReferencesListFile: VCXProjectReferencesListFile;

	let children: IdeFile[] | undefined;

    function getTitleText() {
        return vcxProjectReferencesListFile.absoluteFilePath.filenameWithExtension;
    }

	function titleOnClick() {
    }

	function getChildFiles(): IdeFile[] {
		return [];
	}

	function hasDifferentParentContainer(childIdeFile: IdeFile): boolean {
		if (childIdeFile.virtualParentNonce) {
			if (childIdeFile.virtualParentNonce !== vcxProjectReferencesListFile.nonce) {
				return true;
			}
		}

		return false;
	}
</script>

<TreeViewBase ideFile="{vcxProjectReferencesListFile}" 
              getTitleText={getTitleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
              hasDifferentParentContainer={hasDifferentParentContainer}
			  bind:children={children} />