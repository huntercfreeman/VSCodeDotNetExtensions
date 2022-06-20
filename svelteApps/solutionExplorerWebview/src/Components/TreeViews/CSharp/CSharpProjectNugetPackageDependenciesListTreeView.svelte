<script lang="ts">
	import type { IdeFile } from "../../../../../../out/FileSystem/Files/IdeFile";
	import TreeViewBase from "../../TreeViewBase.svelte";
	import type { CSharpProjectNugetPackageDependenciesListFile } from "../../../../../../out/FileSystem/Files/CSharp/CSharpProjectNugetPackageDependenciesListFile";
	import { MessageReadNugetPackageReferencesInProject } from "../../../../../../out/Messages/Read/MessageReadNugetPackageReferencesInProject";
import { MessageCategory } from "../../../../../../out/Messages/MessageCategory";
import { MessageReadKind } from "../../../../../../out/Messages/Read/MessageReadKind";
import { onMount } from "svelte";
import { FileKind } from "../../../../../../out/FileSystem/FileKind";
	
    export let cSharpProjectNugetPackageDependenciesListFile: CSharpProjectNugetPackageDependenciesListFile;

	let children: IdeFile[] | undefined;

    function getTitleText() {
        return cSharpProjectNugetPackageDependenciesListFile.absoluteFilePath.filenameWithExtension;
    }

	function titleOnClick() {
    }

	function getChildFiles(): IdeFile[] {
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

	onMount(async () => {
		window.addEventListener("message", async (event) => {
			const message = event.data;
			switch (message.messageCategory) {
				case MessageCategory.read:
					switch (message.messageReadKind) {
						case MessageReadKind.nugetPackageReferencesInProject:
							let messageReadNugetPackageReferencesInProject =
								message as MessageReadNugetPackageReferencesInProject;
							if (
								cSharpProjectNugetPackageDependenciesListFile.fileKind === FileKind.nugetPackageDependenciesList &&
								cSharpProjectNugetPackageDependenciesListFile.nonce === messageReadNugetPackageReferencesInProject.cSharpProjectNugetPackageDependenciesFile.nonce
							) {
								cSharpProjectNugetPackageDependenciesListFile =
									messageReadNugetPackageReferencesInProject.cSharpProjectNugetPackageDependenciesFile;
								children = cSharpProjectNugetPackageDependenciesListFile.virtualChildFiles;
							}
							break;
					}
			}
		});
	});
</script>

<TreeViewBase ideFile="{cSharpProjectNugetPackageDependenciesListFile}" 
              getTitleText={getTitleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
              hasDifferentParentContainer={hasDifferentParentContainer}
			  bind:children={children} />