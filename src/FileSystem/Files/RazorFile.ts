import { ConstantsContextualInformation } from "../../Constants/ConstantsContextualInformation";
import { ContextualInformationDatum } from "../../ContextMenus/ContextualInformationDatum";
import { AbsoluteFilePath } from "../AbsoluteFilePath";
import { IdeFile } from "./IdeFile";

// TODO: Directories should always end in a '/' except when accessing filenameWithoutExtension
export class RazorFile extends IdeFile {
    constructor(givenAbsoluteFilePath: AbsoluteFilePath) {
        super(givenAbsoluteFilePath, "");
    }
    
    public childFiles: IdeFile[] | undefined;

    public hideExpansionChevronWhenNoChildFiles: boolean = true;

    public setVirtualChildFiles(siblingFiles: IdeFile[]) {
        for(let i = siblingFiles.length - 1; i > -1; i--) {
            if(this.virtualChildMatchPattern(siblingFiles[i])) {
                if(!this.childFiles) {
                    this.childFiles = [];
                }
                
                this.childFiles = this.childFiles.concat(siblingFiles.splice(i, 1));
            }
        }
    }

    private virtualChildMatchPattern(sibling: IdeFile): boolean {
        if(sibling.absoluteFilePath.filenameWithExtension === 
            this.absoluteFilePath.filenameWithExtension + ".cs") {
            
            return true;
        }

        // I think combining these two if statements with an ||
        // would be a bit hard to read as such they are separate.
        if(sibling.absoluteFilePath.filenameWithExtension === 
            this.absoluteFilePath.filenameWithExtension + ".css") {
            
            return true;
        }

        return false;
    }
    
    public readonly contextualInformation: ContextualInformationDatum[] = [
    ];
}
