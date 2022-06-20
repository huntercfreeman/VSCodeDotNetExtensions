<script lang="ts">
	import type { IdeFile } from "../../../../../../out/FileSystem/Files/IdeFile";
	import TreeViewBase from "../../TreeViewBase.svelte";
	import type { CSharpProjectNugetPackageDependenciesListFile } from "../../../../../../out/FileSystem/Files/CSharp/CSharpProjectNugetPackageDependenciesListFile";
	import { MessageReadNugetPackageReferencesInProject } from "../../../../../../out/Messages/Read/MessageReadNugetPackageReferencesInProject";
	
    export let cSharpProjectNugetPackageDependenciesListFile: CSharpProjectNugetPackageDependenciesListFile;

	let children: any[] | undefined;

    function getTitleText() {
        return cSharpProjectNugetPackageDependenciesListFile.absoluteFilePath.filenameWithExtension;
    }

	function titleOnClick() {
    }

	function getChildFiles(): any[] {
		children = cSharpProjectNugetPackageDependenciesListFile.virtualChildFiles;

		if (!children) {
			let messageReadNugetPackageReferencesInProject =
				new MessageReadNugetPackageReferencesInProject(cSharpProjectNugetPackageDependenciesListFile);
			
			tsVscode.postMessage({
				type: undefined,
				value: messageReadNugetPackageReferencesInProject,
			});

			return [];
		}
		return children;
	}

	function hasDifferentParentContainer(childIdeFile: IdeFile): boolean {
		if (childIdeFile.virtualParentNonce) {
			if (childIdeFile.virtualParentNonce !== cSharpProjectNugetPackageDependenciesListFile.nonce) {
				return true;
			}
		}

		return false;
	}
</script>

<TreeViewBase ideFile="{cSharpProjectNugetPackageDependenciesListFile}" 
              getTitleText={getTitleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
              hasDifferentParentContainer={hasDifferentParentContainer} />