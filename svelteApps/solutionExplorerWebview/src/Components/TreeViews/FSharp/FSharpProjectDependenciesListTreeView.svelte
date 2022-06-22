<script lang="ts">
	import type { IdeFile } from "../../../../../../out/FileSystem/Files/IdeFile";
	import TreeViewBase from "../../TreeViewBase.svelte";
	import type { FSharpProjectDependenciesListFile } from "../../../../../../out/FileSystem/Files/FSharp/FSharpProjectDependenciesListFile";
	
    export let fSharpProjectDependenciesListFile: FSharpProjectDependenciesListFile;
    export let index: number;

	let children: IdeFile[] | undefined;

	$: titleText = fSharpProjectDependenciesListFile.absoluteFilePath.filenameWithExtension;

	function titleOnClick() {
    }

	function getChildFiles(): IdeFile[] {
		children = fSharpProjectDependenciesListFile.constantChildFiles;
		
		return children;
	}

	function hasDifferentParentContainer(childIdeFile: IdeFile): boolean {
		if (childIdeFile.virtualParentNonce) {
			if (childIdeFile.virtualParentNonce !== fSharpProjectDependenciesListFile.nonce) {
				return true;
			}
		}
		return false;
	}
</script>

<TreeViewBase ideFile="{fSharpProjectDependenciesListFile}" 
              titleText={titleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
              hasDifferentParentContainer={hasDifferentParentContainer}
			  bind:children={children}
			  {index} />