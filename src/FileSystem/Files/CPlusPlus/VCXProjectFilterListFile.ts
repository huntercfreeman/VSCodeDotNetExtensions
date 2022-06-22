import { ContextualInformationDatum } from "../../../ContextMenus/ContextualInformationDatum";
import { AbsoluteFilePath } from "../../AbsoluteFilePath";
import { FileKind } from "../../FileKind";
import { IdeFile } from "../IdeFile";

export class VCXProjectFilterListFile extends IdeFile {
    constructor(myAbsoluteFilePath: AbsoluteFilePath) {
        super(myAbsoluteFilePath, "");

        this.constantChildFiles = [
        ];

        this.fileKind = FileKind.vcxProjectFilterListFile;
    }

    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }

    public childFiles: any[] | undefined;

    public hideExpansionChevronWhenNoChildFiles: boolean = false;

    public readonly contextualInformation: ContextualInformationDatum[] = [
    ];
}