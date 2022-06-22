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

        this.receivingProjectInitialAbsoluteFilePath = projectParentAbsoluteFilePath;

        this.referenceProjectAbsoluteFilePath = temporaryProjectReferenceAbsoluteFilePath;
    }

    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }

    public childFiles: any[] | undefined;

    public receivingProjectInitialAbsoluteFilePath: AbsoluteFilePath;

    public readonly referenceProjectAbsoluteFilePath: AbsoluteFilePath;

    public hideExpansionChevronWhenNoChildFiles: boolean = true;

    public readonly contextualInformation: ContextualInformationDatum[] = [
        ContextualInformationDatum.removeProjectReference,
    ];
}