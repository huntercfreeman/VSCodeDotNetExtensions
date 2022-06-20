<script lang="ts">
	import { onMount } from "svelte";
	import type { IdeFile } from "../../../../../out/FileSystem/Files/IdeFile";
	import { FileKind } from "../../../../../out/FileSystem/FileKind";
	import type { SolutionFolderFile } from "../../../../../out/FileSystem/Files/SolutionFolderFile";
	import TreeViewBase from "../TreeViewBase.svelte";
	import type { CSharpProjectFile } from "../../../../../out/FileSystem/Files/CSharp/CSharpProjectFile";
	
    export let solutionFolderFile: SolutionFolderFile;

	let children: IdeFile[] | undefined;

    function getTitleText() {
        return solutionFolderFile.absoluteFilePath.filenameWithExtension;
    }

	function titleOnClick() {
    }

	function getChildFiles(): IdeFile[] {
		children = solutionFolderFile.virtualChildFiles;
		
		return children;
	}

	function hasDifferentParentContainer(childIdeFile: IdeFile): boolean {

		console.log((childIdeFile as any).projectModel);

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
              getTitleText={getTitleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
              hasDifferentParentContainer={hasDifferentParentContainer}
			  bind:children={children} />