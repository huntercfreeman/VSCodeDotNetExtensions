import { ConstantsContextualInformation } from "../../Constants/ConstantsContextualInformation";
import { ContextualInformationDatum } from "../../ContextMenus/ContextualInformationDatum";
import { getNonce } from "../../IdGeneration/getNonce";
import { AbsoluteFilePath } from "../AbsoluteFilePath";
import { IdeFile } from "./IdeFile";

// TODO: Directories should always end in a '/' except when accessing filenameWithoutExtension
export class DirectoryFile extends IdeFile {
    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        throw new Error("Method not implemented.");
    }
    constructor(givenAbsoluteFilePath: AbsoluteFilePath, currentNamespaceString: string) {
        super(givenAbsoluteFilePath, currentNamespaceString + '.' + givenAbsoluteFilePath.filenameNoExtension);
    }
    
    public nonce: string = getNonce();
    public childFiles: any[] | undefined;
    
    public readonly contextualInformation: ContextualInformationDatum[] = [
        ContextualInformationDatum.createNewTemplatedFile,
        ContextualInformationDatum.createNewEmptyFile,
        ContextualInformationDatum.createDirectory,
        ContextualInformationDatum.refreshChildFiles,
        ContextualInformationDatum.copyFile,
        ContextualInformationDatum.cutFile,
        ContextualInformationDatum.paste,
        ContextualInformationDatum.rename,
    ];
}
