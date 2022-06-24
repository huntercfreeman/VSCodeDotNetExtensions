<script lang="ts">
	import { onDestroy } from 'svelte';
	import Visibility from "./Visibility.svelte";
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

	export let ideFile: IdeFile;
	export let children: IdeFile[] | undefined;
	export let titleText: string;
	export let titleOnClick: (e: MouseEvent) => void;
	export let getChildFiles: () => IdeFile[];
	export let index: number;
	export let parent: IdeFile;
	export let parentChildren: IdeFile[];
	
	let percentageInView;

	let activeIdeFileWrapValue;

	activeIdeFileWrap.subscribe((value) => {
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

			if (percentageInView < 25) {
				let element = document.getElementById(getId());

				element.scrollIntoView();
			}
		}
	});

	$: activeIdeFile = activeIdeFileWrapValue as IdeFile;

	$: isActiveCssClass =
		(activeIdeFile?.nonce ?? "") === ideFile.nonce ? "dni_active" : "";

	let contextMenuTargetValue;

	contextMenuTarget.subscribe((value) => {
		contextMenuTargetValue = value;
	});

	$: isActiveContextMenuTarget =
		((contextMenuTargetValue as IdeFile)?.nonce ?? "") === ideFile.nonce
			? "dni_active-context-menu-target"
			: "";

	function fireTitleOnDoubleClick(e: MouseEvent) {
		setActiveIdeFileAsSelf();

		titleOnClick(e);
	}

	function setActiveIdeFileAsSelf() {
		activeIdeFileWrap.set(new ActiveIdeFileWrapTuple(ideFile, undefined));
	}

	function setActiveIdeFileAsParent() {
		activeIdeFileWrap.set(new ActiveIdeFileWrapTuple(parent, undefined));
	}

	function handleOnKeyDown(e: KeyboardEvent) {
		if (ConstantsKeyboard.ALL_ARROW_LEFT_KEYS.indexOf(e.code) !== -1) {
			performArrowLeft(e);
		} else if (
			ConstantsKeyboard.ALL_ARROW_DOWN_KEYS.indexOf(e.code) !== -1
		) {
			performArrowDown(e);
		} else if (ConstantsKeyboard.ALL_ARROW_UP_KEYS.indexOf(e.code) !== -1) {
			performArrowUp(e);
		} else if (
			ConstantsKeyboard.ALL_ARROW_RIGHT_KEYS.indexOf(e.code) !== -1
		) {
			performArrowRight(e);
		} else if (ConstantsKeyboard.KEY_ENTER.indexOf(e.code) !== -1) {
			performEnter(e);
		} else if (ConstantsKeyboard.KEY_SPACE.indexOf(e.code) !== -1) {
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
		titleOnClick(undefined);
	}

	function performSpace(e: KeyboardEvent) {
		// TODO: this method should PREVIEW the file and not lose focus of the solution explorer
		titleOnClick(undefined);
	}

	function getId () {
		return `dni_tree-view-title-${ideFile.nonce}`;
	}

	function rememberPercent (x: number) {
		percentageInView = x;

		return "";
	}

	// TODO: Does this need to call unobserve on the Visibility svelte component?
	// onDestroy(() => clearInterval(interval));
</script>

<div class="dni_tree-view">
	<Visibility
		steps={100}
		let:percent
		let:unobserve
		let:intersectionObserverSupport
	>
		{#if !intersectionObserverSupport}
			<h2>No IntersectionObserver support? 😢</h2>
		{/if}

		<div
			id={getId()}
			class="dni_tree-view-title dni_unselectable {isActiveCssClass} {isActiveContextMenuTarget}"
			title={titleText}
			on:dblclick={(e) => fireTitleOnDoubleClick(e)}
			on:click={(e) => setActiveIdeFileAsSelf()}
			on:contextmenu={(e) => contextMenuTarget.set(ideFile)}
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

				{rememberPercent(percent)}{titleText}
			</span>
		</div>
	</Visibility>

	<div class="dni_tree-view-children">
		{#if ideFile.isExpanded}
			{#each children ?? getChildFiles() ?? [] as child, i (child.nonce)}
				<TreeViewMapper
					ideFile={child}
					index={i}
					parent={ideFile}
					parentChildren={children}
				/>
			{/each}
		{/if}
	</div>
</div>

<style>
	.dni_tree-view-children {
		margin-left: 10px;
		padding-left: 3px;
		border-left: 1px solid var(--vscode-tree-indentGuidesStroke);
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

	.dni_tree-view-title.dni_active {
		background-color: var(--vscode-list-activeSelectionBackground);
		border: 1px solid var(--vscode-focusBorder);
		color: var(--vscode-list-activeSelectionIconForeground);
	}

	.dni_tree-view-title.dni_active-context-menu-target {
		border: 1px solid var(--vscode-focusBorder);
	}

	/* ....when extensionactive.... .dni_tree-view-title.dni_active {
		background-color: var(--vscode-list-inactiveSelectionBackground);
	} */
</style>
