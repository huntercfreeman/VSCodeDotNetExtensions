<script lang="ts">
	import type { IdeFile } from "../../../../../../out/FileSystem/Files/IdeFile";
	import TreeViewBase from "../../TreeViewBase.svelte";
	import type { ProjectNugetPackageDependencyFile } from "../../../../../../out/FileSystem/Files/Nuget/ProjectNugetPackageDependencyFile";
	
    export let projectNugetPackageDependencyFile: ProjectNugetPackageDependencyFile;
    export let index: number;
    export let parent: IdeFile | undefined;
	export let parentChildren: IdeFile[];

	let children: IdeFile[] | undefined;

	$: titleText = projectNugetPackageDependencyFile.absoluteFilePath.filenameWithExtension;
	
	function titleOnClick() {
    }

	function getChildFiles(): IdeFile[] {
        children = projectNugetPackageDependencyFile.virtualChildFiles;

		return children;
	}

	function hasDifferentParentContainer(childIdeFile: IdeFile): boolean {
		if (childIdeFile.virtualParentNonce) {
			if (childIdeFile.virtualParentNonce !== projectNugetPackageDependencyFile.nonce) {
				return true;
			}
		}

		return false;
	}
</script>

<TreeViewBase ideFile="{projectNugetPackageDependencyFile}" 
              titleText={titleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
              hasDifferentParentContainer={hasDifferentParentContainer}
			  bind:children={children}
			  {index}
			  {parent}
			  {parentChildren} />