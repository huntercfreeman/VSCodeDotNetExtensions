import { ConstantsContextualInformation } from "../../Constants/ConstantsContextualInformation";
import { getNonce } from "../../IdGeneration/getNonce";
import { AbsoluteFilePath } from "../AbsoluteFilePath";
import { IdeFile } from "./IdeFile";

// TODO: Directories should always end in a '/' except when accessing filenameWithoutExtension
export class DirectoryFile extends IdeFile {
    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        throw new Error("Method not implemented.");
    }
    constructor(givenAbsoluteFilePath: AbsoluteFilePath, containingCSharpProjectModelAbsoluteFilePath: AbsoluteFilePath) {
        super(givenAbsoluteFilePath, containingCSharpProjectModelAbsoluteFilePath);
    }
    
    public nonce: string = getNonce();
    public childFiles: any[] | undefined;
    
    public readonly contextualInformation: string = ConstantsContextualInformation.TREE_VIEW_DIRECTORY_CONTEXT;
}
