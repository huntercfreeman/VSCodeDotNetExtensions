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
    public static constructIdeFile(absoluteFilePath: AbsoluteFilePath, containingCSharpProjectModel: CSharpProjectModel): IdeFile {
        switch (FileKindMatcher.getFileKind(absoluteFilePath.extensionNoPeriod)) {
            // case FileKind.cSharpProject:
            //     return ;
            // case FileKind.solution:
            //     return ;
            case FileKind.cSharp:
                return new CSharpFile(absoluteFilePath, containingCSharpProjectModel);
            case FileKind.cshtml:
                return new CshtmlFile(absoluteFilePath, containingCSharpProjectModel);
            case FileKind.css:
                return new CssFile(absoluteFilePath, containingCSharpProjectModel);
            case FileKind.directory:
                return new DirectoryFile(absoluteFilePath, containingCSharpProjectModel);
            case FileKind.razor:
                return new RazorFile(absoluteFilePath, containingCSharpProjectModel);
            case FileKind.json:
                return new JsonFile(absoluteFilePath, containingCSharpProjectModel);
            default:
                return new DefaultFile(absoluteFilePath, containingCSharpProjectModel);
        }
    }
}