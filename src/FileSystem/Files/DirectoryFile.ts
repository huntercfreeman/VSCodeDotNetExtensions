import { ContextualInformationDatum } from "../../ContextMenus/ContextualInformationDatum";
import { getNonce } from "../../IdGeneration/getNonce";
import { AbsoluteFilePath } from "../AbsoluteFilePath";
import { IdeFile } from "./IdeFile";

// TODO: Directories should always end in a '/' except when accessing filenameWithoutExtension
export class DirectoryFile extends IdeFile {
    constructor(givenAbsoluteFilePath: AbsoluteFilePath, currentNamespaceString: string) {
        let directoryNamespace = givenAbsoluteFilePath.filenameNoExtension;        

        while (directoryNamespace.indexOf(' ') !== -1) {
            directoryNamespace = directoryNamespace.replace(' ', '_');
        }

        super(givenAbsoluteFilePath, currentNamespaceString + '.' + directoryNamespace);
    }

    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }
    
    public nonce: string = getNonce();
    public childFiles: any[] | undefined;
    
    public readonly contextualInformation: ContextualInformationDatum[] = [
        ContextualInformationDatum.createNewTemplatedFile,
        ContextualInformationDatum.createNewEmptyFile,
        ContextualInformationDatum.createDirectory,
        ContextualInformationDatum.refreshChildFiles,
    ];
}
