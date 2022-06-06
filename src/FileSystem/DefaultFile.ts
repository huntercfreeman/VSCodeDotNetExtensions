import { AbsoluteFilePath } from "./AbsoluteFilePath";
import { FileKind } from "./FileKind";
import { IFile } from "./IFile";

export class DefaultFile implements IFile {
    constructor(givenAbsoluteFilePath: AbsoluteFilePath) {
        this.absoluteFilePath = givenAbsoluteFilePath;
    }
    
    public fileKind: FileKind = FileKind.default;
    public absoluteFilePath: AbsoluteFilePath;
    public childFiles: any[] | undefined;
}