<script lang="ts">
	import type { IdeFile } from "../../../../out/FileSystem/Files/IdeFile";
	import { ConstantsKeyboard } from "../../../../out/Constants/ConstantsKeyboard";
	import ExpansionChevron from "./ExpansionChevron.svelte";
	import FileIconDisplay from "./FileIconDisplay.svelte";
	import { contextMenuTarget } from "./menu.js";
	import TreeViewMapper from "./TreeViewMapper.svelte";
	import { activeIdeFileWrap, ActiveIdeFileWrapTuple } from "./activeState";
	import { activeIdeFileHandleOnKeyDownWrap } from "./activeState";

	export let ideFile: IdeFile;
	export let children: IdeFile[] | undefined;
	export let titleText: string;
	export let titleOnClick: (e: MouseEvent) => void;
	export let getChildFiles: () => IdeFile[];
	export let hasDifferentParentContainer: (childIdeFile: IdeFile) => boolean;
	export let index: number;
	export let parent: IdeFile;
	export let parentChildren: IdeFile[];

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
		if (e.key === ConstantsKeyboard.KEY_ARROW_LEFT) {
			if (ideFile.isExpanded) {
				ideFile.isExpanded = false;
			} else if (parent) {
				setActiveIdeFileAsParent();
			}
		} else if (e.key === ConstantsKeyboard.KEY_ARROW_RIGHT) {
			if (!ideFile.isExpanded) {
				ideFile.isExpanded = true;
			} else if ((children?.length ?? 0) > 0) {
				activeIdeFileWrap.set(
					new ActiveIdeFileWrapTuple(children[0], undefined)
				);
			}
		} else if (e.key === ConstantsKeyboard.KEY_ARROW_DOWN) {
			if (ideFile.isExpanded && (children?.length ?? 0) > 0) {
				activeIdeFileWrap.set(
					new ActiveIdeFileWrapTuple(children[0], undefined)
				);
			} else if (parentChildren && parentChildren.length > index + 1) {
				activeIdeFileWrap.set(
					new ActiveIdeFileWrapTuple(
						parentChildren[index + 1],
						undefined
					)
				);
			} else if (parent) {
				activeIdeFileWrap.set(
					new ActiveIdeFileWrapTuple(parent, [
						(
							upperIdeFile,
							upperIndex,
							upperChildren,
							upperParent,
							upperParentChildren
						) => {
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
							}
						},
					])
				);
			}
		} else if (e.key === ConstantsKeyboard.KEY_ARROW_UP) {
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
						}
						else {
							activeIdeFileWrap.set(
								new ActiveIdeFileWrapTuple(childIdeFile, undefined)
							);
						}
					}

					activeIdeFileWrap.set(
						new ActiveIdeFileWrapTuple(siblingFile, [
							(
								siblingIdeFile,
								siblingFileIndex,
								siblingFileChildren,
								siblingFileParent,
								siblingFileParentChildren
							) => {
								if (
									siblingFileChildren &&
									siblingFileChildren.length > 0
								) {
									let lastChild =
										siblingFileChildren[
											siblingFileChildren.length - 1
										];

									activeIdeFileWrap.set(
										new ActiveIdeFileWrapTuple(
											siblingFileChildren[lastChild],
											[recursivelyGetActiveIdeFile]
										)
									);
								}
								else {
									activeIdeFileWrap.set(
										new ActiveIdeFileWrapTuple(siblingIdeFile, undefined)
									);
								}
							},
						])
					);
				} else {
					if (parent) {
						setActiveIdeFileAsParent();
					}
				}
			}
		}
	}
</script>

<div class="dni_tree-view">
	<div
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

			{index + "_" + titleText}
		</span>
	</div>

	<div class="dni_tree-view-children">
		{#if ideFile.isExpanded}
			{#each children ?? getChildFiles() ?? [] as child, i (child.nonce)}
				{#if !hasDifferentParentContainer(child)}
					<TreeViewMapper
						ideFile={child}
						index={i}
						parent={ideFile}
						parentChildren={children}
					/>
				{/if}
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
