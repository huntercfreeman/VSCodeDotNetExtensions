<script lang="ts">
	import type { IdeFile } from "../../../../../../out/FileSystem/Files/IdeFile";
	import TreeViewBase from "../../TreeViewBase.svelte";
	import type { CSharpProjectNugetPackageDependencyFile } from "../../../../../../out/FileSystem/Files/CSharp/CSharpProjectNugetPackageDependencyFile";
	
    export let cSharpProjectNugetPackageDependencyFile: CSharpProjectNugetPackageDependencyFile;

	let children: IdeFile[] | undefined;

    function getTitleText() {
        return cSharpProjectNugetPackageDependencyFile.absoluteFilePath.filenameWithExtension;
    }

	function titleOnClick() {
    }

	function getChildFiles(): IdeFile[] {
        children = cSharpProjectNugetPackageDependencyFile.virtualChildFiles;

		return children;
	}

	function hasDifferentParentContainer(childIdeFile: IdeFile): boolean {
		if (childIdeFile.virtualParentNonce) {
			if (childIdeFile.virtualParentNonce !== cSharpProjectNugetPackageDependencyFile.nonce) {
				return true;
			}
		}

		return false;
	}
</script>

<TreeViewBase ideFile="{cSharpProjectNugetPackageDependencyFile}" 
              getTitleText={getTitleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
              hasDifferentParentContainer={hasDifferentParentContainer}
			  bind:children={children} />