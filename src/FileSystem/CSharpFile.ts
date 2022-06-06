import { ConstantsContextualInformation } from "../Constants/ConstantsContextualInformation";
import { AbsoluteFilePath } from "./AbsoluteFilePath";
import { FileKind } from "./FileKind";
import { FileKindMatcher } from "./FileKindMatcher";
import { IdeFile } from "./IdeFile";

export class CSharpFile extends IdeFile {
    constructor(givenAbsoluteFilePath: AbsoluteFilePath) {
        super(givenAbsoluteFilePath);
    }
    
    public childFiles: any[] | undefined;
    
    public readonly contextualInformation: string = ConstantsContextualInformation.TREE_VIEW_DEFAULT_FILE_CONTEXT;
}