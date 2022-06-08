import { ConstantsContextualInformation } from "../../Constants/ConstantsContextualInformation";
import { ContextualInformationDatum } from "../../ContextMenus/ContextualInformationDatum";
import { ContextualInformationDatumKind } from "../../ContextMenus/ContextualInformationDatumKind";
import { AbsoluteFilePath } from "../AbsoluteFilePath";
import { IdeFile } from "./IdeFile";

export class CSharpFile extends IdeFile {
    constructor(givenAbsoluteFilePath: AbsoluteFilePath, currentNamespaceString: string) {
        super(givenAbsoluteFilePath, currentNamespaceString);
    }
    
    public childFiles: any[] | undefined;
    public readonly contextualInformation: ContextualInformationDatum[] = [
        
    ];
    
    public hideExpansionChevronWhenNoChildFiles: boolean = true;
    
    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }

    
}