import { ConstantsContextualInformation } from "../../Constants/ConstantsContextualInformation";
import { ConstantsFileExtensionsNoPeriod } from "../../Constants/ConstantsFileExtensionsNoPeriod";
import { ContextualInformationDatum } from "../../ContextMenus/ContextualInformationDatum";
import { AbsoluteFilePath } from "../AbsoluteFilePath";
import { FileKind } from "../FileKind";
import { IdeFile } from "./IdeFile";

export class CSharpProjectProjectReferenceFile extends IdeFile {
    constructor(cSharpProjectParentAbsoluteFilePath: AbsoluteFilePath, projectDependenciesParentAbsoluteFilePath: AbsoluteFilePath,
        cSharpProjectReferenceRelativePathFromReceivingCSharpProject: string) {

        let temporaryCSharpProjectReferenceAbsoluteFilePath = AbsoluteFilePath
            .constructAbsoluteFilePathFromAbsoluteFilePathAndRelativePath(cSharpProjectParentAbsoluteFilePath,
                cSharpProjectReferenceRelativePathFromReceivingCSharpProject,
                false);

        let myAbsoluteFilePath = new AbsoluteFilePath(temporaryCSharpProjectReferenceAbsoluteFilePath.filenameWithExtension,
        false,
        projectDependenciesParentAbsoluteFilePath.parentDirectories);

        super(myAbsoluteFilePath, "");
        
        this.fileKind = FileKind.projectReference;

        this.parentCSharpProjectInitialAbsoluteFilePath = cSharpProjectParentAbsoluteFilePath;

        this.cSharpProjectReferenceAbsoluteFilePath = temporaryCSharpProjectReferenceAbsoluteFilePath;
    }

    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }
    
    public childFiles: any[] | undefined;
    
    public parentCSharpProjectInitialAbsoluteFilePath: AbsoluteFilePath;

    public readonly cSharpProjectReferenceAbsoluteFilePath: AbsoluteFilePath;

    public hideExpansionChevronWhenNoChildFiles: boolean = true;
    
    public readonly contextualInformation: ContextualInformationDatum[] = [
        ContextualInformationDatum.removeProjectReference,
    ];
}