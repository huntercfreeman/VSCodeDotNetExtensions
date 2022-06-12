import { ConstantsContextualInformation } from "../../Constants/ConstantsContextualInformation";
import { ConstantsFileExtensionsNoPeriod } from "../../Constants/ConstantsFileExtensionsNoPeriod";
import { ContextualInformationDatum } from "../../ContextMenus/ContextualInformationDatum";
import { AbsoluteFilePath } from "../AbsoluteFilePath";
import { FileKind } from "../FileKind";
import { IdeFile } from "./IdeFile";

export class CSharpProjectNugetPackageDependencyFile extends IdeFile {
    constructor(cSharpProjectParentAbsoluteFilePath: AbsoluteFilePath, 
        nugetPackageDependenciesParentAbsoluteFilePath: AbsoluteFilePath,
        nugetPackageTitle: string,
        nugetPackageVersion: string) {
        
        let myAbsoluteFilePath = new AbsoluteFilePath(`${nugetPackageTitle}--${nugetPackageVersion}`,
            false,
            nugetPackageDependenciesParentAbsoluteFilePath.parentDirectories);
    
        super(myAbsoluteFilePath, "");
        
        this.fileKind = FileKind.nugetPackageDependency;

        this.parentCSharpProjectInitialAbsoluteFilePath = cSharpProjectParentAbsoluteFilePath;
    }

    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }
    
    public childFiles: any[] | undefined;

    public parentCSharpProjectInitialAbsoluteFilePath: AbsoluteFilePath;
    
    public hideExpansionChevronWhenNoChildFiles: boolean = true;
    
    public readonly contextualInformation: ContextualInformationDatum[] = [
    ];
}