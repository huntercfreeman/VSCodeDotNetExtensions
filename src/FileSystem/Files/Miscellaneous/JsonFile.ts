import { ContextualInformationDatum } from "../../../ContextMenus/ContextualInformationDatum";
import { AbsoluteFilePath } from "../../AbsoluteFilePath";
import { FileKind } from "../../FileKind";
import { IdeFile } from "../IdeFile";

export class JsonFile extends IdeFile {
    constructor(givenAbsoluteFilePath: AbsoluteFilePath) {
        super(givenAbsoluteFilePath, "");
    }

    public childFiles: any[] | undefined;

    public hideExpansionChevronWhenNoChildFiles: boolean = true;

    public setVirtualChildFiles(siblingFiles: IdeFile[]) {

        for (let i = 0; i < siblingFiles.length; i++) {

            let sibling = siblingFiles[i];

            if (sibling.absoluteFilePath.filenameWithExtension ===
                this.absoluteFilePath.filenameWithExtension) {
                continue;
            }
            
            if (sibling.fileKind !== FileKind.json) {
                continue;
            }
    
            if (this.absoluteFilePath.filenameWithExtension.length >
                sibling.absoluteFilePath.filenameWithExtension.length) {
                
                continue;
            }

            let siblingSplit = sibling.absoluteFilePath.filenameWithExtension.split('.');
            let selfSplit = this.absoluteFilePath.filenameWithExtension.split('.');
    
            if (siblingSplit[0] === selfSplit[0] &&
                siblingSplit[siblingSplit.length - 1] === selfSplit[selfSplit.length - 1]) {

                    if (sibling.virtualParentNonce) {
                        continue;
                    }
    
                    if (!this.virtualChildFiles) {
                        this.virtualChildFiles = [];
                    }
    
                    this.virtualChildFiles.push(sibling);
                    sibling.virtualParentNonce = this.nonce;
            }
        }
    }

    public readonly contextualInformation: ContextualInformationDatum[] = [
    ];
}