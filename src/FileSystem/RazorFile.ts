import { ConstantsContextualInformation } from "../Constants/ConstantsContextualInformation";
import { getNonce } from "../IdGeneration/getNonce";
import { AbsoluteFilePath } from "./AbsoluteFilePath";
import { FileKind } from "./FileKind";
import { IdeFile } from "./IdeFile";

// TODO: Directories should always end in a '/' except when accessing fileNameWithoutExtension
export class RazorFile extends IdeFile {
    constructor(givenAbsoluteFilePath: AbsoluteFilePath) {
        super(givenAbsoluteFilePath);
    }
    
    public childFiles: IdeFile[] | undefined;

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
        if(sibling.absoluteFilePath.fileNameWithExtension === 
            this.absoluteFilePath.fileNameWithExtension + ".cs") {
            
            return true;
        }

        return false;
    }
    
    public readonly contextualInformation: string = ConstantsContextualInformation.TREE_VIEW_DIRECTORY_CONTEXT;
}
