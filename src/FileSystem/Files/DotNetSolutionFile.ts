import { ConstantsContextualInformation } from "../../Constants/ConstantsContextualInformation";
import { AbsoluteFilePath } from "../AbsoluteFilePath";
import { IdeFile } from "./IdeFile";
import { SolutionModel } from "../../DotNet/SolutionModel";

export class DotNetSolutionFile extends IdeFile {

    constructor(givenAbsoluteFilePath: AbsoluteFilePath, 
        containingCSharpProjectModelAbsoluteFilePath: AbsoluteFilePath) {
        super(givenAbsoluteFilePath, containingCSharpProjectModelAbsoluteFilePath);
    }
    
    public childFiles: any[] | undefined;
    
    public hideExpansionChevronWhenNoChildFiles: boolean = true;
    
    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }

    public readonly contextualInformation: string = ConstantsContextualInformation.TREE_VIEW_DEFAULT_FILE_CONTEXT;
    
}