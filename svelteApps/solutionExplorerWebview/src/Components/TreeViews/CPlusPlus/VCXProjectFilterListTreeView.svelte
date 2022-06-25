<script lang="ts">
	import type { IdeFile } from "../../../../../../out/FileSystem/Files/IdeFile";
	import TreeViewBase from "../../TreeViewBase.svelte";
	import type { VCXProjectFilterListFile } from "../../../../../../out/FileSystem/Files/CPlusPlus/VCXProjectFilterListFile";
	import type { MessageReadRequestForRefresh } from "../../../../../../out/Messages/Read/MessageReadRequestForRefresh";
	import { MessageReadVCXFilterMatches } from "../../../../../../out/Messages/Read/MessageReadVCXFilterMatches";
	import { MessageReadKind } from "../../../../../../out/Messages/Read/MessageReadKind";
	import { MessageCategory } from "../../../../../../out/Messages/MessageCategory";
	import { onMount } from "svelte";
	
    export let vcxProjectFilterListFile: VCXProjectFilterListFile;
    export let index: number;
    export let parent: IdeFile | undefined;
	export let parentChildren: IdeFile[];

	let children: IdeFile[] | undefined;

	$: titleText = vcxProjectFilterListFile.absoluteFilePath.filenameWithExtension;

	function getChildFiles(): IdeFile[] {
		children = vcxProjectFilterListFile.virtualChildFiles
			?.filter(x => !hasDifferentParentContainer(x));
		
		if (!children) {
			let messageReadVCXFilterMatches =
				new MessageReadVCXFilterMatches(vcxProjectFilterListFile);
			
			tsVscode.postMessage({
				type: undefined,
				value: messageReadVCXFilterMatches,
			});
			return [];
		}

		return children;
	}

	function hasDifferentParentContainer(childIdeFile: IdeFile): boolean {
		if (childIdeFile.virtualParentNonce) {
			if (childIdeFile.virtualParentNonce !== vcxProjectFilterListFile.nonce) {
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
						case MessageReadKind.vcxFilterMatches:
							let messageReadVCXFilterMatches =
								message as MessageReadVCXFilterMatches;
							if (
								vcxProjectFilterListFile.nonce ===
									messageReadVCXFilterMatches.vcxProjectFilterListFile.nonce
							) {
								vcxProjectFilterListFile =
									messageReadVCXFilterMatches.vcxProjectFilterListFile;

								children = vcxProjectFilterListFile.virtualChildFiles
									?.filter(x => !hasDifferentParentContainer(x));
							}
							break;
					}
					case MessageReadKind.requestForRefresh:
							let messageReadRequestForRefresh =
								message as MessageReadRequestForRefresh;
								
							if (vcxProjectFilterListFile.nonce ===
									messageReadRequestForRefresh.ideFileNonce) {
								
									let messageReadVCXFilterMatches =
										new MessageReadVCXFilterMatches(
											vcxProjectFilterListFile
										);

									tsVscode.postMessage({
										type: undefined,
										value: messageReadVCXFilterMatches,
									});
							}
							break;
			}
		});
	});
</script>

<TreeViewBase ideFile="{vcxProjectFilterListFile}" 
              titleText={titleText}
              getChildFiles={getChildFiles}
			  bind:children={children}
			  {index}
			  {parent}
			  {parentChildren} />
