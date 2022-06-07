import { ConstantsContextualInformation } from "../Constants/ConstantsContextualInformation";
import { CSharpProjectModel } from "../DotNet/CSharpProjectModel";
import { AbsoluteFilePath } from "./AbsoluteFilePath";
import { FileKind } from "./FileKind";
import { FileKindMatcher } from "./FileKindMatcher";
import { IdeFile } from "./IdeFile";

export class CSharpFile extends IdeFile {
    constructor(givenAbsoluteFilePath: AbsoluteFilePath, containingCSharpProjectModelAbsoluteFilePath: AbsoluteFilePath) {
        super(givenAbsoluteFilePath, containingCSharpProjectModelAbsoluteFilePath);
    }
    
    public childFiles: any[] | undefined;
    
    public hideExpansionChevronWhenNoChildFiles: boolean = true;
    
    public readonly contextualInformation: string = ConstantsContextualInformation.TREE_VIEW_DEFAULT_FILE_CONTEXT;
}