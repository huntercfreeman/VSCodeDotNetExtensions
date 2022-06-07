import { ConstantsFileExtensionsNoPeriod } from "../Constants/ConstantsFileExtensionsNoPeriod";
import { FileKindMatcher } from "./FileKindMatcher";
import { FileKind } from "./FileKind";
import { AbsoluteFilePath } from "./AbsoluteFilePath";
import { CSharpFile } from "./CSharpFile";
import { CshtmlFile } from "./CshtmlFile";
import { CssFile } from "./CssFile";
import { DirectoryFile } from "./DirectoryFile";
import { RazorFile } from "./RazorFile";
import { JsonFile } from "./JsonFile";
import { DefaultFile } from "./DefaultFile";
import { IdeFile } from "./IdeFile";
import { CSharpProjectModel } from "../DotNet/CSharpProjectModel";

export class IdeFileFactory {
    public static constructIdeFile(absoluteFilePath: AbsoluteFilePath, containingCSharpProjectModelAbsoluteFilePath: AbsoluteFilePath): IdeFile {
        switch (FileKindMatcher.getFileKind(absoluteFilePath.extensionNoPeriod)) {
            // case FileKind.cSharpProject:
            //     return ;
            // case FileKind.solution:
            //     return ;
            case FileKind.cSharp:
                return new CSharpFile(absoluteFilePath, containingCSharpProjectModelAbsoluteFilePath);
            case FileKind.cshtml:
                return new CshtmlFile(absoluteFilePath, containingCSharpProjectModelAbsoluteFilePath);
            case FileKind.css:
                return new CssFile(absoluteFilePath, containingCSharpProjectModelAbsoluteFilePath);
            case FileKind.directory:
                return new DirectoryFile(absoluteFilePath, containingCSharpProjectModelAbsoluteFilePath);
            case FileKind.razor:
                return new RazorFile(absoluteFilePath, containingCSharpProjectModelAbsoluteFilePath);
            case FileKind.json:
                return new JsonFile(absoluteFilePath, containingCSharpProjectModelAbsoluteFilePath);
            default:
                return new DefaultFile(absoluteFilePath, containingCSharpProjectModelAbsoluteFilePath);
        }
    }
}