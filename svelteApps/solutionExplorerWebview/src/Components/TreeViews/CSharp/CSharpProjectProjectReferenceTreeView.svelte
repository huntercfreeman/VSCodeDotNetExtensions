<script lang="ts">
	import type { IdeFile } from "../../../../../../out/FileSystem/Files/IdeFile";
	import TreeViewBase from "../../TreeViewBase.svelte";
	import type { CSharpProjectProjectReferenceFile } from "../../../../../../out/FileSystem/Files/CSharp/CSharpProjectProjectReferenceFile";
	
    export let cSharpProjectProjectReferenceFile: CSharpProjectProjectReferenceFile;

	let children: IdeFile[] | undefined;

	$: titleText = cSharpProjectProjectReferenceFile.absoluteFilePath.filenameWithExtension;

	function titleOnClick() {
    }

	function getChildFiles(): IdeFile[] {
        children = cSharpProjectProjectReferenceFile.virtualChildFiles;

		return children;
	}

	function hasDifferentParentContainer(childIdeFile: IdeFile): boolean {
		if (childIdeFile.virtualParentNonce) {
			if (childIdeFile.virtualParentNonce !== cSharpProjectProjectReferenceFile.nonce) {
				return true;
			}
		}

		return false;
	}
</script>

<TreeViewBase ideFile="{cSharpProjectProjectReferenceFile}" 
              titleText={titleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
              hasDifferentParentContainer={hasDifferentParentContainer}
			  bind:children={children} />