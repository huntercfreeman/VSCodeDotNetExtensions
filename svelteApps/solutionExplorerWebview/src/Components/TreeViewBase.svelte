<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { IdeFile } from "../../../../out/FileSystem/Files/IdeFile";
	import { ConstantsKeyboard } from "../../../../out/Constants/ConstantsKeyboard";
	import ExpansionChevron from "./ExpansionChevron.svelte";
	import FileIconDisplay from "./FileIconDisplay.svelte";
	import { contextMenuTarget } from "./menu.js";
	import TreeViewMapper from "./TreeViewMapper.svelte";
	import {
		activeIdeFileWrap,
		ActiveIdeFileWrapTuple,
	} from "./activeState";
	import { activeIdeFileHandleOnKeyDownWrap } from "./activeState";
	import DotNetIdeFocusTrap from './MaterialDesign/DotNetIdeFocusTrap.svelte';
	import { ConstantsFocusTrap } from '../../../../out/Constants/ConstantsFocusTrap';

	export let ideFile: IdeFile;
	export let children: IdeFile[] | undefined;
	export let titleText: string;
	export let titleOnSingleClick: (e: MouseEvent) => void | undefined = undefined;
	export let titleOnDoubleClick: (e: MouseEvent) => void | undefined = undefined;
	export let getChildFiles: () => IdeFile[];
	export let index: number;
	
	/**
	 * depth starts at 0 and is used to calculate padding-left to indent the nested trees
	 */
	export let depth: number;
	export let parent: IdeFile;
	export let parentChildren: IdeFile[];
	
	let focusTrapHtmlElement;

	let activeIdeFileWrapValue;

	const unsubscribeActiveIdeFileWrap = activeIdeFileWrap.subscribe((value) => {
		if (!value) {
			return;
		}

		let activeIdeFileWrapTuple = value as ActiveIdeFileWrapTuple;

		activeIdeFileWrapValue = activeIdeFileWrapTuple.ideFile;

		// If this IdeFile is the activeIdeFile it will handle key down events.
		if (
			activeIdeFileWrapTuple.ideFile &&
			activeIdeFileWrapTuple.ideFile.nonce === ideFile.nonce
		) {
			// Ignore key down events until completely finished handling previous key down event
			activeIdeFileHandleOnKeyDownWrap.set(undefined);

			// Finish handling previous key down event that requires more than 1 movement operation
			if (activeIdeFileWrapTuple.callbacks?.length > 0) {
				for (
					let i = 0;
					i < activeIdeFileWrapTuple.callbacks.length;
					i++
				) {
					activeIdeFileWrapTuple.callbacks[i](
						ideFile,
						index,
						children,
						parent,
						parentChildren
					);
				}

				// More than 1 movement operation likely means this cannot accurrately be assummed as the active ide file
				return;
			}

			// Listen to key down events again
			activeIdeFileHandleOnKeyDownWrap.set(handleOnKeyDown);
		}
	});

	let isFocused = false;

	$: activeIdeFile = activeIdeFileWrapValue as IdeFile;

	$: isActiveIdeFile =
		(activeIdeFile?.nonce ?? "") === ideFile.nonce;
	
	$: isActiveIdeFileCssClass =
		isActiveIdeFile ? "dni_active" : "";

	$: isFocusedCssClass =
		isFocused ? "dni_focused" : "";

	$: contextMenuTargetValue = $contextMenuTarget;

	$: isActiveContextMenuTarget = 
		((contextMenuTargetValue as IdeFile)?.nonce ?? "") === ideFile.nonce;
	
	$: isActiveContextMenuTargetCssClass = isActiveContextMenuTarget
			? "dni_active-context-menu-target"
			: "";

	$: paddingLeftInPixels = depth * 10;

	function fireTitleOnDoubleClick(e: MouseEvent) {
		setActiveIdeFileAsSelf();

		if (titleOnDoubleClick) {
			titleOnDoubleClick(e);
		}
	}
	
	function fireTitleOnSingleClick(e: MouseEvent) {

		console.log("focus focus trap");
		if (focusTrapHtmlElement) {
			console.log("focus focus trap");
			focusTrapHtmlElement.focus();
		}

		setActiveIdeFileAsSelf();

		if (titleOnSingleClick) {
			titleOnSingleClick(e);
		}
	}
	
	function onRightClick(e: MouseEvent) {
		// The contextmenu event has to be e.stopImmediatePropagation() to keep
		// from showing visual studio code's context menu
		// therefore this component cannot listen to the oncontextmenu event
		if (e.which === 3 || e.button === 2) {
			contextMenuTarget.set(ideFile);
		}
	}

	function setActiveIdeFileAsSelf() {
		activeIdeFileWrap.set(new ActiveIdeFileWrapTuple(ideFile, undefined));
	}

	function setActiveIdeFileAsParent() {
		activeIdeFileWrap.set(new ActiveIdeFileWrapTuple(parent, undefined));
	}

	function handleOnKeyDown(e: KeyboardEvent) {
		if (ConstantsKeyboard.ALL_SHOULD_PREVENT_DEFAULT_KEYS
				.indexOf(e.key) !== -1) {

					e.preventDefault();
		}
		
		if (ConstantsKeyboard.ALL_ARROW_LEFT_KEYS.indexOf(e.key) !== -1) {
			performArrowLeft(e);
		} else if (
			ConstantsKeyboard.ALL_ARROW_DOWN_KEYS.indexOf(e.key) !== -1
		) {
			performArrowDown(e);
		} else if (ConstantsKeyboard.ALL_ARROW_UP_KEYS.indexOf(e.key) !== -1) {
			performArrowUp(e);
		} else if (
			ConstantsKeyboard.ALL_ARROW_RIGHT_KEYS.indexOf(e.key) !== -1
		) {
			performArrowRight(e);
		} else if (ConstantsKeyboard.KEY_ENTER.indexOf(e.key) !== -1) {
			performEnter(e);
		} else if (ConstantsKeyboard.KEY_SPACE.indexOf(e.key) !== -1) {
			performSpace(e);
		}
	}

	function performArrowLeft(e: KeyboardEvent) {
		if (ideFile.isExpanded) {
			ideFile.isExpanded = false;
		} else if (parent) {
			setActiveIdeFileAsParent();
		}
	}

	function performArrowDown(e: KeyboardEvent) {
		if (ideFile.isExpanded && (children?.length ?? 0) > 0) {
			activeIdeFileWrap.set(
				new ActiveIdeFileWrapTuple(children[0], undefined)
			);
		} else if (parentChildren && parentChildren.length > index + 1) {
			activeIdeFileWrap.set(
				new ActiveIdeFileWrapTuple(parentChildren[index + 1], undefined)
			);
		} else if (parent) {
			function recursivelyGetActiveIdeFile(
				upperIdeFile: IdeFile,
				upperIndex: number,
				upperChildren: IdeFile[] | undefined,
				upperParent: IdeFile | undefined,
				upperParentChildren: IdeFile[] | undefined
			): void {
				if (
					upperParentChildren &&
					upperParentChildren.length > upperIndex + 1
				) {
					activeIdeFileWrap.set(
						new ActiveIdeFileWrapTuple(
							upperParentChildren[upperIndex + 1],
							undefined
						)
					);
				} else if (upperParent) {
					activeIdeFileWrap.set(
						new ActiveIdeFileWrapTuple(upperParent, [
							recursivelyGetActiveIdeFile,
						])
					);
				} else {
					activeIdeFileWrap.set(
						new ActiveIdeFileWrapTuple(ideFile, undefined)
					);
				}
			}

			activeIdeFileWrap.set(
				new ActiveIdeFileWrapTuple(parent, [
					recursivelyGetActiveIdeFile,
				])
			);
		}
	}

	function performArrowUp(e: KeyboardEvent) {
		if (parent && parentChildren && index > 0) {
			let siblingFile = parentChildren[index - 1];

			if (siblingFile.isExpanded) {
				function recursivelyGetActiveIdeFile(
					childIdeFile: IdeFile,
					childFileIndex: number,
					childFileChildren: IdeFile[] | undefined,
					childFileParent: IdeFile | undefined,
					childFileParentChildren: IdeFile[] | undefined
				): void {
					if (
						childIdeFile.isExpanded &&
						childFileChildren &&
						childFileChildren.length > 0
					) {
						let lastChild =
							childFileChildren[childFileChildren.length - 1];

						activeIdeFileWrap.set(
							new ActiveIdeFileWrapTuple(lastChild, [
								recursivelyGetActiveIdeFile,
							])
						);
					} else {
						activeIdeFileWrap.set(
							new ActiveIdeFileWrapTuple(childIdeFile, undefined)
						);
					}
				}

				activeIdeFileWrap.set(
					new ActiveIdeFileWrapTuple(siblingFile, [
						recursivelyGetActiveIdeFile,
					])
				);
			} else {
				activeIdeFileWrap.set(
					new ActiveIdeFileWrapTuple(siblingFile, undefined)
				);
			}
		} else {
			if (parent) {
				setActiveIdeFileAsParent();
			}
		}
	}

	function performArrowRight(e: KeyboardEvent) {
		if (!ideFile.isExpanded) {
			ideFile.isExpanded = true;
		} else if ((children?.length ?? 0) > 0) {
			activeIdeFileWrap.set(
				new ActiveIdeFileWrapTuple(children[0], undefined)
			);
		}
	}

	function performEnter(e: KeyboardEvent) {
		if (titleOnDoubleClick) {
			titleOnDoubleClick(undefined);
		}
	}

	function performSpace(e: KeyboardEvent) {
		if (titleOnSingleClick) {
			titleOnSingleClick(undefined);
		}
	}

	function getId () {
		return `dni_tree-view-title-${ideFile.nonce}`;
	}

	onMount(() => {
		if (!activeIdeFile) {
			setActiveIdeFileAsSelf();
		}
	});

	onDestroy(() => {
		unsubscribeActiveIdeFileWrap();

		if (isActiveIdeFile) {
			setActiveIdeFileAsParent();
		}
	});
</script>

<div class="dni_tree-view">
	{#if isActiveIdeFile}
		<DotNetIdeFocusTrap bind:isFocused={isFocused}
			namespaceId={ConstantsFocusTrap.NAMESPACE_ID_TREE_VIEW_BASE_ACTIVE}
			onKeyDown={handleOnKeyDown}
			bind:inputHtmlElement={focusTrapHtmlElement} />
	{/if}

	<div
		id={getId()}
		class="dni_tree-view-title dni_unselectable {isActiveIdeFileCssClass} {isFocusedCssClass} {isActiveContextMenuTargetCssClass}"
		style="{`padding-left: ${paddingLeftInPixels}px;`}"
		title={titleText}
		on:dblclick={(e) => fireTitleOnDoubleClick(e)}
		on:click={(e) => fireTitleOnSingleClick(e)}
		on:mouseup={(e) => onRightClick(e)}
	>
		{#if ideFile.hideExpansionChevronWhenNoChildFiles && ((children ?? getChildFiles())?.length ?? 0) === 0}
			<span
				style="visibility: hidden;"
				tabindex="-1"
				class="dni_do-not-show-chevron"
			>
				<ExpansionChevron
					isExpanded={false}
					onClickAction={setActiveIdeFileAsSelf}
				/>
			</span>
		{:else}
			<span class="dni_tree-view-title-expansion-chevron">
				<ExpansionChevron
					bind:isExpanded={ideFile.isExpanded}
					onClickAction={setActiveIdeFileAsSelf}
				/>
			</span>
		{/if}

		<span class="dni_tree-view-title-text">
			<FileIconDisplay {ideFile} />

			{titleText}
		</span>
	</div>

	<div class="dni_tree-view-children">
		{#if ideFile.isExpanded}
			<div class="dni_tree-view-title-border"
					style="{`left: ${paddingLeftInPixels + 8}px;`}">
			</div>

			{#each children ?? getChildFiles() ?? [] as child, i (child.nonce)}
				<TreeViewMapper
					ideFile={child}
					index={i}
					parent={ideFile}
					parentChildren={children}
					depth={depth + 1}
				/>
			{/each}
		{/if}
	</div>
</div>

<style>
	.dni_tree-view-children {
		position: relative;
	}

	.dni_tree-view-title-border {
		position: absolute;
		border-left: 1px solid var(--vscode-tree-indentGuidesStroke);
		height: 100%;
		z-index: 1;
	}

	.dni_tree-view-title {
		width: 100%;
		white-space: nowrap;
		display: inline-flex;
		align-items: center;
	}

	.dni_tree-view-title:hover {
		background-color: var(--vscode-editorHoverWidget-background);
		color: var(--vscode-editorHoverWidget-foreground);
		cursor: pointer;
	}

	.dni_tree-view-title-text {
		margin-left: 2px;
		border: 1px solid transparent;
	}

	.dni_tree-view-title.dni_active-context-menu-target {
		border: 1px solid var(--vscode-focusBorder);
	}
</style>
