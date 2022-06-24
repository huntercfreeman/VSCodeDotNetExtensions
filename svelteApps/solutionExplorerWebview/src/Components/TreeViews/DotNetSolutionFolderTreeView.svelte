<script lang="ts">
	import { onMount } from "svelte";
	import type { IdeFile } from "../../../../../out/FileSystem/Files/IdeFile";
	import { FileKind } from "../../../../../out/FileSystem/FileKind";
	import type { SolutionFolderFile } from "../../../../../out/FileSystem/Files/SolutionFolderFile";
	import TreeViewBase from "../TreeViewBase.svelte";
		
    export let solutionFolderFile: SolutionFolderFile;
    export let index: number;
    export let parent: IdeFile | undefined;
	export let parentChildren: IdeFile[];

	let children: IdeFile[] | undefined;

	$: titleText = solutionFolderFile.absoluteFilePath.filenameWithExtension;

	function titleOnClick() {
    }

	function getChildFiles(): IdeFile[] {
		children = solutionFolderFile.virtualChildFiles
			?.filter(x => !hasDifferentParentContainer(x));
		
		return children;
	}

	function hasDifferentParentContainer(childIdeFile: IdeFile): boolean {

		if ((childIdeFile as any).projectModel) {
			// IProjectModel
			let projectModel: any = (childIdeFile as any)
                        .projectModel;

			return solutionFolderFile.solutionFolderModel.projectIdGuid !==
				projectModel.solutionFolderParentProjectIdGuid;
		}
		
		if (childIdeFile.virtualParentNonce) {
			if (childIdeFile.virtualParentNonce !== solutionFolderFile.nonce) {
				return true;
			}
		}
		
		return false;
	}
	
</script>

<TreeViewBase ideFile="{solutionFolderFile}" 
              titleText={titleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
              hasDifferentParentContainer={hasDifferentParentContainer}
			  bind:children={children}
			  {index}
			  {parent}
			  {parentChildren} />