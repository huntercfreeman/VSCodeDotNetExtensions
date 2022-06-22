import { ConstantsFileExtensionsNoPeriod } from "../../../Constants/ConstantsFileExtensionsNoPeriod";
import { ContextualInformationDatum } from "../../../ContextMenus/ContextualInformationDatum";
import { AbsoluteFilePath } from "../../AbsoluteFilePath";
import { FileKind } from "../../FileKind";
import { IdeFile } from "../IdeFile";
import { ProjectNugetPackageDependenciesListFile } from "../Nuget/ProjectNugetPackageDependenciesListFile";
import { ProjectToProjectReferencesListFile } from "../ProjectReference/ProjectToProjectReferencesListFile";

export class FSharpProjectDependenciesListFile extends IdeFile {
    constructor(fSharpProjectParentAbsoluteFilePath: AbsoluteFilePath) {
        let myAbsoluteFilePath = new AbsoluteFilePath(ConstantsFileExtensionsNoPeriod.F_SHARP_PROJECT_DEPENDENCIES_FILE_EXTENSION,
            false,
            fSharpProjectParentAbsoluteFilePath.parentDirectories);

        super(myAbsoluteFilePath, "");

        this.constantChildFiles = [
            new ProjectNugetPackageDependenciesListFile(fSharpProjectParentAbsoluteFilePath, myAbsoluteFilePath),
            new ProjectToProjectReferencesListFile(fSharpProjectParentAbsoluteFilePath, myAbsoluteFilePath),
        ];

        this.fileKind = FileKind.fSharpProjectDependencies;

        this.parentFSharpProjectInitialAbsoluteFilePath = fSharpProjectParentAbsoluteFilePath;
    }

    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }

    public childFiles: any[] | undefined;

    public parentFSharpProjectInitialAbsoluteFilePath: AbsoluteFilePath;

    public hideExpansionChevronWhenNoChildFiles: boolean = false;

    public readonly contextualInformation: ContextualInformationDatum[] = [
    ];
}