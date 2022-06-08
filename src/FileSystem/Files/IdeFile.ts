import { AbsoluteFilePath } from "../AbsoluteFilePath";
import { FileKind } from "../FileKind";
import { FileKindMatcher } from "../FileKindMatcher";

export abstract class IdeFile {
    constructor(public readonly absoluteFilePath: AbsoluteFilePath,
        public namespace: string | undefined) {
        
        this.fileKind = FileKindMatcher.getFileKind(absoluteFilePath.extensionNoPeriod);
    }

    public fileKind: FileKind;
    public childFiles: IdeFile[] | undefined;
    public virtualChildFiles: IdeFile[] | undefined;
    public virtualParent: IdeFile[] | undefined;

    public abstract readonly contextualInformation: string;

    public abstract setVirtualChildFiles(siblingFiles: IdeFile[]): void;
}