import { ConstantsFileExtensionsNoPeriod } from "../../../Constants/ConstantsFileExtensionsNoPeriod";
import { ContextualInformationDatum } from "../../../ContextMenus/ContextualInformationDatum";
import { AbsoluteFilePath } from "../../AbsoluteFilePath";
import { FileKind } from "../../FileKind";
import { IdeFile } from "../IdeFile";
import { CSharpProjectNugetPackageDependenciesListFile } from "./CSharpProjectNugetPackageDependenciesListFile";
import { CSharpProjectProjectReferencesListFile } from "./CSharpProjectProjectReferencesListFile";

export class CSharpProjectDependenciesListFile extends IdeFile {
    constructor(cSharpProjectParentAbsoluteFilePath: AbsoluteFilePath) {
        let myAbsoluteFilePath = new AbsoluteFilePath(ConstantsFileExtensionsNoPeriod.C_SHARP_PROJECT_DEPENDENCIES_FILE_EXTENSION,
            false,
            cSharpProjectParentAbsoluteFilePath.parentDirectories);

        super(myAbsoluteFilePath, "");

        this.constantChildFiles = [
            new CSharpProjectNugetPackageDependenciesListFile(cSharpProjectParentAbsoluteFilePath, myAbsoluteFilePath),
            new CSharpProjectProjectReferencesListFile(cSharpProjectParentAbsoluteFilePath, myAbsoluteFilePath),
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