<script lang="ts">
	import type { IdeFile } from "../../../../../../out/FileSystem/Files/IdeFile";
	import type { VCXProjectExternalDependenciesListFile } from "../../../../../../out/FileSystem/Files/CPlusPlus/VCXProjectExternalDependenciesListFile";
	import { MessageReadFileIntoEditor } from "../../../../../../out/Messages/Read/MessageReadFileIntoEditor";
	import TreeViewBase from "../../TreeViewBase.svelte";
	
    export let vcxProjectExternalDependenciesListFile: VCXProjectExternalDependenciesListFile;
    export let index: number;

	let children: IdeFile[] | undefined;

	$: titleText = vcxProjectExternalDependenciesListFile.absoluteFilePath.filenameWithExtension;

	function titleOnClick() {
    }

	function getChildFiles(): IdeFile[] {
		return [];
	}

	function hasDifferentParentContainer(childIdeFile: IdeFile): boolean {
		if (childIdeFile.virtualParentNonce) {
			if (childIdeFile.virtualParentNonce !== vcxProjectExternalDependenciesListFile.nonce) {
				return true;
			}
		}

		return false;
	}
</script>

<TreeViewBase ideFile="{vcxProjectExternalDependenciesListFile}" 
              titleText={titleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
              hasDifferentParentContainer={hasDifferentParentContainer}
			  bind:children={children}
			  {index} />