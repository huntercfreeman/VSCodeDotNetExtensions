import { ConstantsContextInformationDatums } from "../../../Constants/ConstantsFileEditingContextInformationDatums";
import { ConstantsFileExtensionsNoPeriod } from "../../../Constants/ConstantsFileExtensionsNoPeriod";
import { ContextualInformationDatum } from "../../../ContextMenus/ContextualInformationDatum";
import { AbsoluteFilePath } from "../../AbsoluteFilePath";
import { IdeFile } from "../IdeFile";

export class RazorFile extends IdeFile {
    constructor(givenAbsoluteFilePath: AbsoluteFilePath) {
        super(givenAbsoluteFilePath, "");

        this.contextualInformation = [
            
        ];

        this.contextualInformation = this.contextualInformation
            .concat(ConstantsContextInformationDatums.DEFAULT_FILE_EDITING_CONTEXTUAL_INFORMATION_DATUMS);
    }

    public childFiles: IdeFile[] | undefined;

    public hideExpansionChevronWhenNoChildFiles: boolean = true;

    public setVirtualChildFiles(siblingFiles: IdeFile[]) {
        for (let i = 0; i < siblingFiles.length; i++) {

            let sibling = siblingFiles[i];

            switch (sibling.absoluteFilePath.filenameWithExtension) {
                case this.absoluteFilePath.filenameWithExtension + 
                      '.' +
                      ConstantsFileExtensionsNoPeriod.C_SHARP_FILE_EXTENSION:
                case this.absoluteFilePath.filenameWithExtension + 
                      '.' +
                      ConstantsFileExtensionsNoPeriod.CSS_FILE_EXTENSION:

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

    public readonly contextualInformation: ContextualInformationDatum[];
}
