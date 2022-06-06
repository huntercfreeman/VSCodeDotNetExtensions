import { AbsoluteFilePath } from "./AbsoluteFilePath";
import { FileKind } from "./FileKind";

export interface IFile {
    absoluteFilePath: AbsoluteFilePath;
    fileKind: FileKind;
}