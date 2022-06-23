<script lang="ts">
	import type { IdeFile } from "../../../../../../out/FileSystem/Files/IdeFile";
	import TreeViewBase from "../../TreeViewBase.svelte";
	import type { CSharpProjectDependenciesListFile } from "../../../../../../out/FileSystem/Files/CSharp/CSharpProjectDependenciesListFile";
	
    export let cSharpProjectDependenciesListFile: CSharpProjectDependenciesListFile;
    export let index: number;
    export let parent: IdeFile | undefined;
	export let parentChildren: IdeFile[];

	let children: IdeFile[] | undefined;

	$: titleText = cSharpProjectDependenciesListFile.absoluteFilePath.filenameWithExtension;

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
              titleText={titleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
              hasDifferentParentContainer={hasDifferentParentContainer}
			  bind:children={children}
			  {index}
			  {parent}
			  {parentChildren} />