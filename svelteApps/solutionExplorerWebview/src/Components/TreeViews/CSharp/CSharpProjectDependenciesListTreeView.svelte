<script lang="ts">
	import type { IdeFile } from "../../../../../../out/FileSystem/Files/IdeFile";
	import TreeViewBase from "../../TreeViewBase.svelte";
	import type { CSharpProjectDependenciesListFile } from "../../../../../../out/FileSystem/Files/CSharp/CSharpProjectDependenciesListFile";
	
    export let cSharpProjectDependenciesListFile: CSharpProjectDependenciesListFile;

	let children: IdeFile[] | undefined;

    function getTitleText() {
        return cSharpProjectDependenciesListFile.absoluteFilePath.filenameWithExtension;
    }

	function titleOnClick() {
    }

	function getChildFiles(): IdeFile[] {
		children = cSharpProjectDependenciesListFile.constantChildFiles;
		
		return children;
	}

	function hasDifferentParentContainer(childIdeFile: IdeFile): boolean {
		if (childIdeFile.virtualParentNonce) {
			if (childIdeFile.virtualParentNonce !== cSharpProjectDependenciesListFile.nonce) {
				return true;
			}
		}
		return false;
	}
</script>

<TreeViewBase ideFile="{cSharpProjectDependenciesListFile}" 
              getTitleText={getTitleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
              hasDifferentParentContainer={hasDifferentParentContainer}
			  bind:children={children} />