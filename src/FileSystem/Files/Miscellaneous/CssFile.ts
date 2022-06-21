import { ContextualInformationDatum } from "../../../ContextMenus/ContextualInformationDatum";
import { AbsoluteFilePath } from "../../AbsoluteFilePath";
import { IdeFile } from "../IdeFile";

export class CssFile extends IdeFile {
    constructor(givenAbsoluteFilePath: AbsoluteFilePath) {
        super(givenAbsoluteFilePath, "");
    }

    public childFiles: any[] | undefined;

    public hideExpansionChevronWhenNoChildFiles: boolean = true;

    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }

    public readonly contextualInformation: ContextualInformationDatum[] = [
    ];
}