import { CSharpProjectModel } from "../DotNet/CSharpProjectModel";
import { AbsoluteFilePath } from "./AbsoluteFilePath";
import { FileKind } from "./FileKind";
import { FileKindMatcher } from "./FileKindMatcher";

export abstract class IdeFile {
    constructor(public readonly absoluteFilePath: AbsoluteFilePath, containingCSharpProjectModel: CSharpProjectModel) {
        this.fileKind = FileKindMatcher.getFileKind(absoluteFilePath.extensionNoPeriod);
        this.containingCSharpProjectModelAbsoluteFilePath = containingCSharpProjectModel.absoluteFilePath;
    }

    public fileKind: FileKind;
    public containingCSharpProjectModelAbsoluteFilePath: AbsoluteFilePath;
}