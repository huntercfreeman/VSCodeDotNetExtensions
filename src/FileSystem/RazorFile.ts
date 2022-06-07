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
        if(sibling.absoluteFilePath.fileNameWithExtension === 
            this.absoluteFilePath.fileNameWithExtension + ".cs") {
            
            return true;
        }

        // I think combining these two if statements with an ||
        // would be a bit hard to read as such they are separate.
        if(sibling.absoluteFilePath.fileNameWithExtension === 
            this.absoluteFilePath.fileNameWithExtension + ".css") {
            
            return true;
        }

        return false;
    }
    
    public readonly contextualInformation: string = ConstantsContextualInformation.TREE_VIEW_DEFAULT_FILE_CONTEXT;
}
