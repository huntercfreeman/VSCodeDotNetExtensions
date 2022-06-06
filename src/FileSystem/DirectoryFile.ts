import { getNonce } from "../IdGeneration/getNonce";
import { AbsoluteFilePath } from "./AbsoluteFilePath";
import { FileKind } from "./FileKind";
import { IFile } from "./IFile";

export class DirectoryFile implements IFile {
    constructor(givenAbsoluteFilePath: AbsoluteFilePath) {
        this.absoluteFilePath = givenAbsoluteFilePath;
    }
    
    public nonce: string = getNonce();
    public fileKind: FileKind = FileKind.default;
    public absoluteFilePath: AbsoluteFilePath;
    public childFiles: any[] | undefined;
}