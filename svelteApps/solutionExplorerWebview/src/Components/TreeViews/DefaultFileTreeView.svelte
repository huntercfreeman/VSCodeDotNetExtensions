<script lang="ts">
	import type { IdeFile } from "../../../../../out/FileSystem/Files/IdeFile";
	import TreeViewBase from "../TreeViewBase.svelte";
    import { MessageReadFileIntoEditor } from "../../../../../out/Messages/Read/MessageReadFileIntoEditor";
	
    export let ideFile: IdeFile;
    export let index: number;
    export let parent: IdeFile | undefined;
	export let parentChildren: IdeFile[];

	let children: IdeFile[] | undefined;

	$: titleText = ideFile.absoluteFilePath.filenameWithExtension;

	function titleOnClick() {
		let messageReadFileIntoEditor = new MessageReadFileIntoEditor(ideFile);
		
        tsVscode.postMessage({
			type: undefined,
			value: messageReadFileIntoEditor,
		});
    }

	function getChildFiles(): IdeFile[] {
        children = ideFile.virtualChildFiles
			?.filter(x => !hasDifferentParentContainer(x));

		return children ?? [];
	}

	function hasDifferentParentContainer(childIdeFile: IdeFile): boolean {
		if (childIdeFile.virtualParentNonce) {
			if (childIdeFile.virtualParentNonce !== ideFile.nonce) {
				return true;
			}
		}

		return false;
	}
</script>

<TreeViewBase ideFile="{ideFile}" 
              titleText={titleText}
              titleOnClick={titleOnClick}
              getChildFiles={getChildFiles}
			  bind:children={children}
			  {index}
			  {parent}
			  {parentChildren} />