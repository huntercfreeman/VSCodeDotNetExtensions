import { ConstantsContextualInformation } from "../../Constants/ConstantsContextualInformation";
import { AbsoluteFilePath } from "../AbsoluteFilePath";
import { IdeFile } from "./IdeFile";
import { CSharpProjectModel } from "../../DotNet/CSharpProjectModel";

export class CSharpProjectFile extends IdeFile {

    constructor(public readonly csharpProjectModel: CSharpProjectModel) {
        super(csharpProjectModel.absoluteFilePath, "");
    }
    
    public childFiles: any[] | undefined;
    
    public hideExpansionChevronWhenNoChildFiles: boolean = true;
    
    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }

    public readonly contextualInformation: string = ConstantsContextualInformation.TREE_VIEW_DEFAULT_FILE_CONTEXT;
    
}