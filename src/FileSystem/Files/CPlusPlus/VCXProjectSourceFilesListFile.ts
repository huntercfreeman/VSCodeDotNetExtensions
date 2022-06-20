import { ConstantsFileExtensionsNoPeriod } from "../../../Constants/ConstantsFileExtensionsNoPeriod";
import { ContextualInformationDatum } from "../../../ContextMenus/ContextualInformationDatum";
import { AbsoluteFilePath } from "../../AbsoluteFilePath";
import { FileKind } from "../../FileKind";
import { IdeFile } from "../IdeFile";

export class VCXProjectSourceFilesListFile extends IdeFile {
    constructor(cSharpProjectParentAbsoluteFilePath: AbsoluteFilePath) {
        let myAbsoluteFilePath = new AbsoluteFilePath(ConstantsFileExtensionsNoPeriod.VCX_PROJECT_SOURCE_FILES_FILE_EXTENSION,
            false,
            cSharpProjectParentAbsoluteFilePath.parentDirectories);

        super(myAbsoluteFilePath, "");

        this.constantChildFiles = [
        ];

        this.fileKind = FileKind.projectDependencies;

        this.parentCSharpProjectInitialAbsoluteFilePath = cSharpProjectParentAbsoluteFilePath;
    }

    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }

    public childFiles: any[] | undefined;

    public parentCSharpProjectInitialAbsoluteFilePath: AbsoluteFilePath;

    public hideExpansionChevronWhenNoChildFiles: boolean = false;

    public readonly contextualInformation: ContextualInformationDatum[] = [
    ];
}