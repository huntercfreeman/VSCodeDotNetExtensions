import { ConstantsFileExtensionsNoPeriod } from "../../Constants/ConstantsFileExtensionsNoPeriod";
import { ContextualInformationDatum } from "../../ContextMenus/ContextualInformationDatum";
import { AbsoluteFilePath } from "../AbsoluteFilePath";
import { FileKind } from "../FileKind";
import { CSharpProjectNugetPackageDependenciesFile } from "./CSharpProjectNugetPackageDependenciesFile";
import { CSharpProjectProjectReferencesFile } from "./CSharpProjectProjectReferencesFile";
import { IdeFile } from "./IdeFile";

export class CSharpProjectDependenciesFile extends IdeFile {
    constructor(cSharpProjectParentAbsoluteFilePath: AbsoluteFilePath) {
        let myAbsoluteFilePath = new AbsoluteFilePath(ConstantsFileExtensionsNoPeriod.PROJECT_DEPENDENCIES_FILE_EXTENSION,
            false,
            cSharpProjectParentAbsoluteFilePath.parentDirectories);

        super(myAbsoluteFilePath, "");

        this.constantChildFiles = [
            new CSharpProjectNugetPackageDependenciesFile(cSharpProjectParentAbsoluteFilePath, myAbsoluteFilePath),
            new CSharpProjectProjectReferencesFile(cSharpProjectParentAbsoluteFilePath, myAbsoluteFilePath),
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