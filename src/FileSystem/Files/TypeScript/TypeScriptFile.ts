import { ConstantsContextInformationDatums } from "../../../Constants/ConstantsFileEditingContextInformationDatums";
import { ContextualInformationDatum } from "../../../ContextMenus/ContextualInformationDatum";
import { AbsoluteFilePath } from "../../AbsoluteFilePath";
import { IdeFile } from "../IdeFile";

export class TypeScriptFile extends IdeFile {
    constructor(givenAbsoluteFilePath: AbsoluteFilePath, currentNamespaceString: string) {
        super(givenAbsoluteFilePath, currentNamespaceString);

        this.contextualInformation = [
            
        ];

        this.contextualInformation = this.contextualInformation
            .concat(ConstantsContextInformationDatums.DEFAULT_FILE_EDITING_CONTEXTUAL_INFORMATION_DATUMS);
    }

    public childFiles: any[] | undefined;
    public readonly contextualInformation: ContextualInformationDatum[];

    public hideExpansionChevronWhenNoChildFiles: boolean = true;

    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }
}