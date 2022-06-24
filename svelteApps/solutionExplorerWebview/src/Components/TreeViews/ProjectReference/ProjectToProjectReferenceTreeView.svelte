<script lang="ts">
	import type { IdeFile } from "../../../../../../out/FileSystem/Files/IdeFile";
	import TreeViewBase from "../../TreeViewBase.svelte";
	import type { ProjectToProjectReferenceFile } from "../../../../../../out/FileSystem/Files/ProjectReference/ProjectToProjectReferenceFile";
	
    export let projectToProjectReferenceFile: ProjectToProjectReferenceFile;
    export let index: number;
    export let parent: IdeFile | undefined;
	export let parentChildren: IdeFile[];

	let children: IdeFile[] | undefined;

	$: titleText = projectToProjectReferenceFile.absoluteFilePath.filenameWithExtension;

	function titleOnClick() {
    }

	function getChildFiles(): IdeFile[] {
        children = projectToProjectReferenceFile.virtualChildFiles
			?.filter(x => !hasDifferentParentContainer(x));

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
			  bind:children={children}
			  {index}
			  {parent}
			  {parentChildren} />