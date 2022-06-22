import { ContextualInformationDatum } from "../../../ContextMenus/ContextualInformationDatum";
import { AbsoluteFilePath } from "../../AbsoluteFilePath";
import { FileKind } from "../../FileKind";
import { IdeFile } from "../IdeFile";


export class ProjectToProjectReferenceFile extends IdeFile {
    constructor(projectParentAbsoluteFilePath: AbsoluteFilePath, projectDependenciesParentAbsoluteFilePath: AbsoluteFilePath,
        projectReferenceRelativePathFromReceivingProject: string) {

        let temporaryProjectReferenceAbsoluteFilePath = AbsoluteFilePath
            .constructAbsoluteFilePathFromAbsoluteFilePathAndRelativePath(projectParentAbsoluteFilePath,
                projectReferenceRelativePathFromReceivingProject,
                false);

        let myAbsoluteFilePath = new AbsoluteFilePath(temporaryProjectReferenceAbsoluteFilePath.filenameWithExtension,
            false,
            projectDependenciesParentAbsoluteFilePath.parentDirectories);

        super(myAbsoluteFilePath, "");

        this.fileKind = FileKind.projectReference;

        this.parentProjectInitialAbsoluteFilePath = projectParentAbsoluteFilePath;

        this.projectReferenceAbsoluteFilePath = temporaryProjectReferenceAbsoluteFilePath;
    }

    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }

    public childFiles: any[] | undefined;

    public parentProjectInitialAbsoluteFilePath: AbsoluteFilePath;

    public readonly projectReferenceAbsoluteFilePath: AbsoluteFilePath;

    public hideExpansionChevronWhenNoChildFiles: boolean = true;

    public readonly contextualInformation: ContextualInformationDatum[] = [
        ContextualInformationDatum.removeProjectReference,
    ];
}