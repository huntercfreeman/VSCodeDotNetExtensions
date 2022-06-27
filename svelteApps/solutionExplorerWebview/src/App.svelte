<script lang="ts">
	import { onMount } from "svelte";
	import type { DotNetSolutionFile } from "../../../out/FileSystem/Files/DotNetSolutionFile";
	import { MessageCategory } from "../../../out/Messages/MessageCategory";
	import { MessageReadKind } from "../../../out/Messages/Read/MessageReadKind";
	import { MessageReadSolutionsInWorkspace } from "../../../out/Messages/Read/MessageReadSolutionsInWorkspace";
	import SelectDotNetSolutionFileForm from "./Components/SelectDotNetSolutionFileForm.svelte";
	import ContextMenu from "./Components/ContextMenu.svelte";
	import SolutionFileControlButtons from "./Components/SolutionFileControlButtons.svelte";
	import TreeViewMapper from "./Components/TreeViewMapper.svelte";
	import { activeIdeFileHandleOnKeyDownWrap } from "./Components/activeState"
	import { ConstantsKeyboard } from "../../../out/Constants/ConstantsKeyboard";
    import { activeFocusTarget } from "./Components/activeFocus";

	let dotNetSolutionFiles: DotNetSolutionFile[] = [];
	let selectedDotNetSolutionFile: DotNetSolutionFile | undefined;

	$: activeIdeFileHandleOnKeyDownValue = $activeIdeFileHandleOnKeyDownWrap;
	$: activeFocusTargetValue = $activeFocusTarget;

	$: solutionExplorerHasFocus = activeFocusTargetValue
		? "dni_focused"
		: "";
	
	function getSolutionFilesInWorkspace() {
		let messageReadSolutionsInWorkspace =
			new MessageReadSolutionsInWorkspace();

		tsVscode.postMessage({
			type: undefined,
			value: messageReadSolutionsInWorkspace,
		});
	}
	
	function handleOnKeyDown(e: KeyboardEvent) {
		
		if (ConstantsKeyboard.ALL_ARROW_LEFT_KEYS
			.concat(ConstantsKeyboard.ALL_ARROW_DOWN_KEYS)
			.concat(ConstantsKeyboard.ALL_ARROW_UP_KEYS)
			.concat(ConstantsKeyboard.ALL_ARROW_RIGHT_KEYS)
			.concat(ConstantsKeyboard.KEY_ENTER)
			.concat(ConstantsKeyboard.KEY_SPACE)
				.indexOf(e.key) !== -1) {

					e.preventDefault();
		}
		
		if (activeIdeFileHandleOnKeyDownValue) {
			activeIdeFileHandleOnKeyDownValue(e);
		}
	}

	onMount(async () => {
		window.addEventListener("message", async (event) => {
			const message = event.data;

			switch (message.messageCategory) {
				case MessageCategory.read:
					switch (message.messageReadKind) {
						case MessageReadKind.solutionsInWorkspace:
							dotNetSolutionFiles = message.dotNetSolutionFiles;

							// Check if currently selected solution was removed in some way
							if (selectedDotNetSolutionFile) {
								if (!dotNetSolutionFiles
									.find(x => 
										x.absoluteFilePath.initialAbsoluteFilePathStringInput ===
											selectedDotNetSolutionFile.absoluteFilePath.initialAbsoluteFilePathStringInput)) {

												// Was removed therefore set selected solution as undefined
												selectedDotNetSolutionFile = undefined;
								}
							}
							break;
						case MessageReadKind.solutionIntoTreeView:
							selectedDotNetSolutionFile =
								message.dotNetSolutionFile;
							break;
						case MessageReadKind.messageReadUndefinedSolution:
							selectedDotNetSolutionFile =
								undefined;
							break;
					}
			}
		});

		getSolutionFilesInWorkspace();
	});
</script>

<div id="dni_solution-explorer" class="dni_app {solutionExplorerHasFocus}">
	<SolutionFileControlButtons {getSolutionFilesInWorkspace} />

	<SelectDotNetSolutionFileForm {selectedDotNetSolutionFile} {dotNetSolutionFiles} />

	<div style="margin-bottom: 5px;" />

	{#if activeFocusTargetValue}
		<div>activeFocusTargetValue: {activeFocusTargetValue}</div>
	{/if}

	{#if selectedDotNetSolutionFile}
		<TreeViewMapper ideFile={selectedDotNetSolutionFile}
			index={0}
			parent={undefined}
			parentChildren={undefined} />
	{/if}

	<ContextMenu />
</div>

<svelte:body on:keydown={(e) => handleOnKeyDown(e)} />

<style>
	.dni_app {
		height: calc(100vh - var(--input-margin-vertical) * 2);
	}
</style>
