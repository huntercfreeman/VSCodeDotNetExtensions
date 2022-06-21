import { ContextualInformationDatum } from "../../../ContextMenus/ContextualInformationDatum";
import { AbsoluteFilePath } from "../../AbsoluteFilePath";
import { IdeFile } from "../IdeFile";


export class CshtmlFile extends IdeFile {
    constructor(givenAbsoluteFilePath: AbsoluteFilePath) {
        super(givenAbsoluteFilePath, "");
    }

    public childFiles: any[] | undefined;

    public hideExpansionChevronWhenNoChildFiles: boolean = true;

    public setVirtualChildFiles(siblingFiles: IdeFile[]) {
        return;
    }

    // private virtualChildMatchPattern(sibling: IdeFile): boolean {
    //     if (sibling.absoluteFilePath.filenameWithExtension ===
    //         this.absoluteFilePath.filenameWithExtension + ".cs") {

    //         return true;
    //     }

    //     return false;
    // }

    public readonly contextualInformation: ContextualInformationDatum[] = [
    ];
}