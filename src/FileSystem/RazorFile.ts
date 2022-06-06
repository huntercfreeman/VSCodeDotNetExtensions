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
    
    public childFiles: any[] | undefined;
    
    public readonly contextualInformation: string = ConstantsContextualInformation.TREE_VIEW_DIRECTORY_CONTEXT;
}
