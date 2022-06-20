<script lang="ts">
	import { onMount } from "svelte";
	import type { IdeFile } from "../../../../../../out/FileSystem/Files/IdeFile";
	import { FileKind } from "../../../../../../out/FileSystem/FileKind";import { MessageCategory } from "../../../../../../out/Messages/MessageCategory";
	import { MessageReadKind } from "../../../../../../out/Messages/Read/MessageReadKind";import TreeViewBase from "../../TreeViewBase.svelte";
	import type { CSharpProjectProjectReferencesListFile } from "../../../../../../out/FileSystem/Files/CSharp/CSharpProjectProjectReferencesListFile";
	import { MessageReadProjectReferencesInProject } from "../../../../../../out/Messages/Read/MessageReadProjectReferencesInProject";
	
    export let cSharpProjectProjectReferencesListFile: CSharpProjectProjectReferencesListFile;

	let children: IdeFile[] | undefined;

    function getTitleText() {
        return cSharpProjectProjectReferencesListFile.absoluteFilePath.filenameWithExtension;
    }

	function titleOnClick() {
    }

	function getChildFiles(): IdeFile[] {
		children = cSharpProjectProjectReferencesListFile.virtualChildFiles;

		if (!children) {
			let messageReadProjectReferencesInProject =
				new MessageReadProjectReferencesInProject(cSharpProjectProjectReferencesListFile);
						
			tsVscode.postMessage({
				type: undefined,
				value: messageReadProjectReferencesInProject,
			});

			return [];
		}
		return children;
	}

	function hasDifferentParentContainer(childIdeFile: IdeFile): boolean {
		if (childIdeFile.virtualParentNonce) {
			if (childIdeFile.virtualParentNonce !== cSharpProjectProjectReferencesListFile.nonce) {
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
						case MessageReadKind.projectReferencesInProject:
							let messageReadProjectReferencesInProject =
								message as MessageReadProjectReferencesInProject;
							if (
								cSharpProjectProjectReferencesListFile.fileKind === FileKind.projectReferencesList &&
								cSharpProjectProjectReferencesListFile.nonce === messageReadProjectReferencesInProject.cSharpProjectProjectReferencesFile.nonce
							) {
								cSharpProjectProjectReferencesListFile =
									messageReadProjectReferencesInProject.cSharpProjectProjectReferencesFile;
								children = cSharpProjectProjectReferencesListFile.virtualChildFiles;
							}
							break;
					}
			}
		});
	});
</script>

<TreeViewBase ideFile="{cSharpProjectProjectReferencesListFile}" 
              getTitleText={getTitleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
              hasDifferentParentContainer={hasDifferentParentContainer}
			  bind:children={children} />