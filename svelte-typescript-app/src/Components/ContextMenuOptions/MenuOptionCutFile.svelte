<script lang="ts">
    import { ConstantsFileExtensionsNoPeriod } from '../../../../out/Constants/ConstantsFileExtensionsNoPeriod';
    import { contextMenuTarget } from '../menu';
    import MenuOption from '../MenuOption.svelte';
    import TextInputForm from '../TextInputForm.svelte';
    import { MessageCreateTemplatedFileInDirectory } from "../../../../out/Messages/Create/MessageCreateTemplatedFileInDirectory";
    import { DirectoryFile } from '../../../../out/FileSystem/Files/DirectoryFile';
    import { FileKind } from '../../../../out/FileSystem/FileKind';
    import { MessageReadVirtualFilesInCSharpProject } from '../../../../out/Messages/Read/MessageReadVirtualFilesInCSharpProject';
    import { MessageReadFilesInDirectory } from '../../../../out/Messages/Read/MessageReadFilesInDirectory';

	export let closeMenu;

	let contextMenuTargetValue;
    let addFileWithTemplateFilename: string | undefined;
	let shouldAddCodeBehind: boolean = false;
	
	contextMenuTarget.subscribe(value => {
		contextMenuTargetValue = value;
	});

    function cutFileOnClick() {
        switch (contextMenuTargetValue.fileKind) {
            
        }

        closeMenu();
	}
</script>

<MenuOption onClickStopPropagation="{true}"
            onClick={cutFileOnClick} 
            text="Cut." />