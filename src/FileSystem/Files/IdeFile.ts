import { getNonce } from "../../IdGeneration/getNonce";
import { AbsoluteFilePath } from "../AbsoluteFilePath";
import { FileKind } from "../FileKind";
import { FileKindMatcher } from "../FileKindMatcher";

export abstract class IdeFile {
    constructor(public readonly absoluteFilePath: AbsoluteFilePath,
        public namespace: string | undefined) {
        
        this.fileKind = FileKindMatcher.getFileKind(absoluteFilePath.extensionNoPeriod);
    }

    public nonce: string = getNonce();
    public virtualParentNonce: string | undefined = undefined;
    public fileKind: FileKind;
    public childFiles: IdeFile[] | undefined = undefined;
    public virtualChildFiles: IdeFile[] | undefined = undefined;
    public virtualParent: IdeFile[] | undefined = undefined;
    public hideExpansionChevronWhenNoChildFiles: boolean = false;

    public abstract readonly contextualInformation: string;

    public abstract setVirtualChildFiles(siblingFiles: IdeFile[]): void;
}