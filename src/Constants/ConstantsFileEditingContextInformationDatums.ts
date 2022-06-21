import { ContextualInformationDatum } from "../ContextMenus/ContextualInformationDatum";

/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantsContextInformationDatums {
    public static readonly DEFAULT_FILE_EDITING_CONTEXTUAL_INFORMATION_DATUMS: ContextualInformationDatum[] = [
        ContextualInformationDatum.rename,
        ContextualInformationDatum.deleteFile,
        ContextualInformationDatum.copyFile,
        ContextualInformationDatum.cutFile,
    ];
}