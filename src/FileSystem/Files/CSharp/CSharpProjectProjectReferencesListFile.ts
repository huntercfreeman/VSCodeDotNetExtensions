import { ConstantsFileExtensionsNoPeriod } from "../../../Constants/ConstantsFileExtensionsNoPeriod";
import { ContextualInformationDatum } from "../../../ContextMenus/ContextualInformationDatum";
import { AbsoluteFilePath } from "../../AbsoluteFilePath";
import { FileKind } from "../../FileKind";
import { IdeFile } from "../IdeFile";


export class CSharpProjectProjectReferencesListFile extends IdeFile {
    constructor(cSharpProjectParentAbsoluteFilePath: AbsoluteFilePath, projectDependenciesParentAbsoluteFilePath: AbsoluteFilePath) {
        let myAbsoluteFilePath = new AbsoluteFilePath(ConstantsFileExtensionsNoPeriod.C_SHARP_PROJECT_REFERENCES_FILE_EXTENSION,
            false,
            projectDependenciesParentAbsoluteFilePath.parentDirectories);

        super(myAbsoluteFilePath, "");

        this.fileKind = FileKind.cSharpProjectReferencesList;

        this.parentCSharpProjectInitialAbsoluteFilePath = cSharpProjectParentAbsoluteFilePath;
    }

    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }

    public childFiles: any[] | undefined;

    public parentCSharpProjectInitialAbsoluteFilePath: AbsoluteFilePath;

    public hideExpansionChevronWhenNoChildFiles: boolean = false;

    public readonly contextualInformation: ContextualInformationDatum[] = [
        ContextualInformationDatum.addProjectReference,
        ContextualInformationDatum.refreshChildFiles,
    ];
}