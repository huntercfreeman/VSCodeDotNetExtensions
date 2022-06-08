import { ConstantsContextualInformation } from "../../Constants/ConstantsContextualInformation";
import { ContextualInformationDatum } from "../../ContextMenus/ContextualInformationDatum";
import { AbsoluteFilePath } from "../AbsoluteFilePath";
import { IdeFile } from "./IdeFile";

export class DefaultFile extends IdeFile {
    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        throw new Error("Method not implemented.");
    }
    constructor(givenAbsoluteFilePath: AbsoluteFilePath) {
        super(givenAbsoluteFilePath, "");
    }
    
    public childFiles: any[] | undefined;
    
    public hideExpansionChevronWhenNoChildFiles: boolean = true;
    
    public readonly contextualInformation: ContextualInformationDatum[] = [
        
    ];
}