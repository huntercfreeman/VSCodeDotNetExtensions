import { ConstantsContextualInformation } from "../../Constants/ConstantsContextualInformation";
import { AbsoluteFilePath } from "../AbsoluteFilePath";
import { IdeFile } from "./IdeFile";

export class CssFile extends IdeFile {
    constructor(givenAbsoluteFilePath: AbsoluteFilePath) {
        super(givenAbsoluteFilePath, "");
    }
    
    public childFiles: any[] | undefined;
    
    public hideExpansionChevronWhenNoChildFiles: boolean = true;
    
    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        throw new Error("Method not implemented.");
    }

    public readonly contextualInformation: string = ConstantsContextualInformation.TREE_VIEW_DEFAULT_FILE_CONTEXT;
}