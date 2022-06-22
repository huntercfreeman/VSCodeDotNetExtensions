<script lang="ts">
	import type { IdeFile } from "../../../../../../out/FileSystem/Files/IdeFile";
	import TreeViewBase from "../../TreeViewBase.svelte";
	import type { ProjectToProjectReferenceFile } from "../../../../../../out/FileSystem/Files/ProjectReference/ProjectToProjectReferenceFile";
	
    export let projectToProjectReferenceFile: ProjectToProjectReferenceFile;
    export let index: number;
    export let parent: IdeFile | undefined;

	let children: IdeFile[] | undefined;

	$: titleText = projectToProjectReferenceFile.absoluteFilePath.filenameWithExtension;

	function titleOnClick() {
    }

	function getChildFiles(): IdeFile[] {
        children = projectToProjectReferenceFile.virtualChildFiles;

		return children;
	}

	function hasDifferentParentContainer(childIdeFile: IdeFile): boolean {
		if (childIdeFile.virtualParentNonce) {
			if (childIdeFile.virtualParentNonce !== projectToProjectReferenceFile.nonce) {
				return true;
			}
		}

		return false;
	}
</script>

<TreeViewBase ideFile="{projectToProjectReferenceFile}" 
              titleText={titleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
              hasDifferentParentContainer={hasDifferentParentContainer}
			  bind:children={children}
			  {index}
			  {parent} />