import { AbsoluteFilePath } from "./AbsoluteFilePath";
import { FileKind } from "./FileKind";
import { FileKindMatcher } from "./FileKindMatcher";

export abstract class IdeFile {
    constructor(public readonly absoluteFilePath: AbsoluteFilePath) {
        this.fileKind = FileKindMatcher.getFileKind(absoluteFilePath.extensionNoPeriod);
    }

    public fileKind: FileKind;
}