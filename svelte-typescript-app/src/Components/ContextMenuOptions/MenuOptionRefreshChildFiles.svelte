<script lang="ts">
    import { ConstantsFileExtensionsNoPeriod } from '../../../../out/Constants/ConstantsFileExtensionsNoPeriod';
    import { contextMenuTarget } from '../menu';
    import MenuOption from '../MenuOption.svelte';
    import TextInputForm from '../TextInputForm.svelte';
    import { MessageCreateTemplatedFileInDirectory } from "../../../../out/Messages/Create/MessageCreateTemplatedFileInDirectory";
    import type { DirectoryFile } from '../../../../out/FileSystem/DirectoryFile';
    import { FileKind } from '../../../../out/FileSystem/FileKind';

	export let closeMenu;

	let contextMenuTargetValue;
    let addFileWithTemplateFilename: string | undefined;
	let shouldAddCodeBehind: boolean = false;
	
	contextMenuTarget.subscribe(value => {
		contextMenuTargetValue = value;
	});
</script>

<MenuOption text="Refresh Child Files" />