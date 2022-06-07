import { ConstantsContextualInformation } from "../Constants/ConstantsContextualInformation";
import { CSharpProjectModel } from "../DotNet/CSharpProjectModel";
import { AbsoluteFilePath } from "./AbsoluteFilePath";
import { IdeFile } from "./IdeFile";

export class CshtmlFile extends IdeFile {
    constructor(givenAbsoluteFilePath: AbsoluteFilePath, containingCSharpProjectModel: CSharpProjectModel) {
        super(givenAbsoluteFilePath, containingCSharpProjectModel);
    }
    
    public childFiles: any[] | undefined;

    public hideExpansionChevronWhenNoChildFiles: boolean = true;

    public fosterVirtualChildFiles(siblingFiles: IdeFile[]) {
        for(let i = siblingFiles.length - 1; i > -1; i--) {
            if(this.virtualChildMatchPattern(siblingFiles[i])) {
                if(!this.childFiles) {
                    this.childFiles = [];
                }
                
                this.childFiles = this.childFiles.concat(siblingFiles.splice(i, 1));
            }
        }
    }

    public virtualChildMatchPattern(sibling: IdeFile): boolean {
        if(sibling.absoluteFilePath.filenameWithExtension === 
            this.absoluteFilePath.filenameWithExtension + ".cs") {
            
            return true;
        }

        return false;
    }
    
    public readonly contextualInformation: string = ConstantsContextualInformation.TREE_VIEW_DEFAULT_FILE_CONTEXT;
}