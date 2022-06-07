import { ConstantsContextualInformation } from "../Constants/ConstantsContextualInformation";
import { CSharpProjectModel } from "../DotNet/CSharpProjectModel";
import { getNonce } from "../IdGeneration/getNonce";
import { AbsoluteFilePath } from "./AbsoluteFilePath";
import { FileKind } from "./FileKind";
import { IdeFile } from "./IdeFile";

// TODO: Directories should always end in a '/' except when accessing filenameWithoutExtension
export class DirectoryFile extends IdeFile {
    constructor(givenAbsoluteFilePath: AbsoluteFilePath, containingCSharpProjectModelAbsoluteFilePath: AbsoluteFilePath) {
        super(givenAbsoluteFilePath, containingCSharpProjectModelAbsoluteFilePath);
    }
    
    public nonce: string = getNonce();
    public childFiles: any[] | undefined;
    
    public readonly contextualInformation: string = ConstantsContextualInformation.TREE_VIEW_DIRECTORY_CONTEXT;
}
