import { ConstantsContextualInformation } from "../Constants/ConstantsContextualInformation";
import { AbsoluteFilePath } from "./AbsoluteFilePath";
import { IdeFile } from "./IdeFile";

export class JsonFile extends IdeFile {
    constructor(givenAbsoluteFilePath: AbsoluteFilePath) {
        super(givenAbsoluteFilePath);
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
            this.absoluteFilePath.filenameWithExtension) {
                return false;
        }

        let siblingSplit = sibling.absoluteFilePath.filenameWithExtension.split('.');
        let selfSplit = this.absoluteFilePath.filenameWithExtension.split('.');

        if(selfSplit.length > siblingSplit.length) {
            return false;
        }

        let patternMatches = true;

        for (let i = 0; i < selfSplit.length - 1; i++) {
            if(selfSplit[i] !== siblingSplit[i]) {
                patternMatches = false;
                break;
            }
        }

        return patternMatches && 
               (selfSplit[selfSplit.length - 1] === siblingSplit[siblingSplit.length - 1]);
    }
    
    public readonly contextualInformation: string = ConstantsContextualInformation.TREE_VIEW_DEFAULT_FILE_CONTEXT;
}