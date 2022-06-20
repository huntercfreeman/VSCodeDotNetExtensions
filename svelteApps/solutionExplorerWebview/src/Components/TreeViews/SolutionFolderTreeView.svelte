<script lang="ts">
	import { onMount } from "svelte";
	import type { IdeFile } from "../../../../../out/FileSystem/Files/IdeFile";
	import { FileKind } from "../../../../../out/FileSystem/FileKind";
	import type { SolutionFolderFile } from "../../../../../out/FileSystem/Files/SolutionFolderFile";
	import TreeViewBase from "../TreeViewBase.svelte";
	import type { CSharpProjectFile } from "../../../../../out/FileSystem/Files/CSharp/CSharpProjectFile";
	
    export let solutionFolderFile: SolutionFolderFile;

	let children: any[] | undefined;

    function getTitleText() {
        return solutionFolderFile.absoluteFilePath.filenameWithExtension;
    }

	function titleOnClick() {
    }

	function getChildFiles(): any[] {
		children = solutionFolderFile.virtualChildFiles;
		
		return children;
	}

	function hasDifferentParentContainer(childIdeFile: IdeFile): boolean {
		if (childIdeFile.fileKind === FileKind.solutionFolder ||
		   childIdeFile.fileKind === FileKind.cSharpProject) {
			let childProjectModel: any = childIdeFile.fileKind === FileKind.solutionFolder
				? (childIdeFile as SolutionFolderFile).solutionFolderModel
				: (childIdeFile as CSharpProjectFile).cSharpProjectModel;
			if(childProjectModel.solutionFolderParentProjectIdGuid) {
				
				if (solutionFolderFile.fileKind === FileKind.solution) {
					return true;
				}
				if (solutionFolderFile.fileKind === FileKind.solutionFolder) {
					let solutionFolder = solutionFolderFile as SolutionFolderFile;
					return solutionFolder.solutionFolderModel.projectIdGuid !==
						childProjectModel.solutionFolderParentProjectIdGuid;
				}
				return true;
			}
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
              hasDifferentParentContainer={hasDifferentParentContainer} />