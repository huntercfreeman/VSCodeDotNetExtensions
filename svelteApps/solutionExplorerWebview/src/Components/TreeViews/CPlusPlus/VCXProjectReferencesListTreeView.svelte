<script lang="ts">
	import type { IdeFile } from "../../../../../../out/FileSystem/Files/IdeFile";
	import { MessageReadFileIntoEditor } from "../../../../../../out/Messages/Read/MessageReadFileIntoEditor";
	import TreeViewBase from "../../TreeViewBase.svelte";
	import type { VCXProjectReferencesListFile } from "../../../../../../out/FileSystem/Files/CPlusPlus/VCXProjectReferencesListFile";
	
    export let vcxProjectReferencesListFile: VCXProjectReferencesListFile;
    export let index: number;
    export let parent: IdeFile | undefined;
	export let parentChildren: IdeFile[];

	let children: IdeFile[] | undefined;

	$: titleText = vcxProjectReferencesListFile.absoluteFilePath.filenameWithExtension;

	function titleOnClick() {
    }

	function getChildFiles(): IdeFile[] {
		return [];
	}

	function hasDifferentParentContainer(childIdeFile: IdeFile): boolean {
		if (childIdeFile.virtualParentNonce) {
			if (childIdeFile.virtualParentNonce !== vcxProjectReferencesListFile.nonce) {
				return true;
			}
		}

		return false;
	}
</script>

<TreeViewBase ideFile="{vcxProjectReferencesListFile}" 
              titleText={titleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
			  bind:children={children}
			  {index}
			  {parent}
			  {parentChildren} />