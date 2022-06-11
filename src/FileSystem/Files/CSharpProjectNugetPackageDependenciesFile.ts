import { ConstantsContextualInformation } from "../../Constants/ConstantsContextualInformation";
import { ConstantsFileExtensionsNoPeriod } from "../../Constants/ConstantsFileExtensionsNoPeriod";
import { ContextualInformationDatum } from "../../ContextMenus/ContextualInformationDatum";
import { AbsoluteFilePath } from "../AbsoluteFilePath";
import { FileKind } from "../FileKind";
import { IdeFile } from "./IdeFile";

export class CSharpProjectNugetPackageDependenciesFile extends IdeFile {
    constructor(projectDependenciesParentAbsoluteFilePath: AbsoluteFilePath) {
        let myAbsoluteFilePath = new AbsoluteFilePath(ConstantsFileExtensionsNoPeriod.NUGET_PACKAGE_DEPENDENCIES_FILE_EXTENSION,
        false,
        projectDependenciesParentAbsoluteFilePath.parentDirectories);

        super(myAbsoluteFilePath, "");
        
        this.fileKind = FileKind.nugetPackageDependencies;
    }

    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }
    
    public childFiles: any[] | undefined;
    
    public hideExpansionChevronWhenNoChildFiles: boolean = true;
    
    public readonly contextualInformation: ContextualInformationDatum[] = [
    ];
}