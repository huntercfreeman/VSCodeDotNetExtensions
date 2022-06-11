import { ConstantsContextualInformation } from "../../Constants/ConstantsContextualInformation";
import { ConstantsFileExtensionsNoPeriod } from "../../Constants/ConstantsFileExtensionsNoPeriod";
import { ContextualInformationDatum } from "../../ContextMenus/ContextualInformationDatum";
import { AbsoluteFilePath } from "../AbsoluteFilePath";
import { FileKind } from "../FileKind";
import { IdeFile } from "./IdeFile";

export class CSharpProjectNugetPackageDependencyFile extends IdeFile {
    constructor(nugetPackageDependenciesParentAbsoluteFilePath: AbsoluteFilePath) {
        
        let myAbsoluteFilePath = new AbsoluteFilePath(ConstantsFileExtensionsNoPeriod.NUGET_PACKAGE_DEPENDENCIES_FILE_EXTENSION,
            false,
            nugetPackageDependenciesParentAbsoluteFilePath.parentDirectories);
    
        super(myAbsoluteFilePath, "");
        
        this.fileKind = FileKind.nugetPackageDependency;
    }

    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }
    
    public childFiles: any[] | undefined;
    
    public hideExpansionChevronWhenNoChildFiles: boolean = true;
    
    public readonly contextualInformation: ContextualInformationDatum[] = [
    ];
}