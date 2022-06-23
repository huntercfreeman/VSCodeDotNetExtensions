<script lang="ts">
	import { onMount } from "svelte";
	import type { IdeFile } from "../../../../../../out/FileSystem/Files/IdeFile";
	import { FileKind } from "../../../../../../out/FileSystem/FileKind";import { MessageCategory } from "../../../../../../out/Messages/MessageCategory";
	import { MessageReadKind } from "../../../../../../out/Messages/Read/MessageReadKind";import TreeViewBase from "../../TreeViewBase.svelte";
	import type { ProjectToProjectReferencesListFile } from "../../../../../../out/FileSystem/Files/ProjectReference/ProjectToProjectReferencesListFile";
	import { MessageReadProjectReferencesInProject } from "../../../../../../out/Messages/Read/MessageReadProjectReferencesInProject";
	
    export let projectToProjectReferencesListFile: ProjectToProjectReferencesListFile;
    export let index: number;
    export let parent: IdeFile | undefined;
	export let parentChildren: IdeFile[];

	let children: IdeFile[] | undefined;

	$: titleText = projectToProjectReferencesListFile.absoluteFilePath.filenameWithExtension;

	function titleOnClick() {
    }

	function getChildFiles(): IdeFile[] {
		children = projectToProjectReferencesListFile.virtualChildFiles;

		if (!children) {
			let messageReadProjectReferencesInProject =
				new MessageReadProjectReferencesInProject(projectToProjectReferencesListFile);
						
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
			if (childIdeFile.virtualParentNonce !== projectToProjectReferencesListFile.nonce) {
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
							if (projectToProjectReferencesListFile.nonce === messageReadProjectReferencesInProject.projectToProjectReferencesFile.nonce) {
								
								projectToProjectReferencesListFile =
									messageReadProjectReferencesInProject.projectToProjectReferencesFile;
									
								children = projectToProjectReferencesListFile.virtualChildFiles;
							}
							break;
					}
			}
		});
	});
</script>

<TreeViewBase ideFile="{projectToProjectReferencesListFile}" 
              titleText={titleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
              hasDifferentParentContainer={hasDifferentParentContainer}
			  bind:children={children}
			  {index}
			  {parent}
			  {parentChildren} />