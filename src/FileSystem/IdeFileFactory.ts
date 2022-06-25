import { FileKindMatcher } from "./FileKindMatcher";
import { FileKind } from "./FileKind";
import { AbsoluteFilePath } from "./AbsoluteFilePath";
import { CSharpFile } from "./Files/CSharp/CSharpFile";
import { IdeFile } from "./Files/IdeFile";
import { CssFile } from "./Files/Miscellaneous/CssFile";
import { DefaultFile } from "./Files/DefaultFile";
import { DirectoryFile } from "./Files/DirectoryFile";
import { RazorFile } from "./Files/CSharp/RazorFile";
import { CshtmlFile } from "./Files/CSharp/CshtmlFile";
import { JsonFile } from "./Files/Miscellaneous/JsonFile";
import { FSharpFile } from "./Files/FSharp/FSharpFile";
import { FSXFile } from "./Files/FSharp/FSXFile";
import { CFile } from "./Files/C/CFile";
import { CPlusPlusFile } from "./Files/CPlusPlus/CPlusPlusFile";

export class IdeFileFactory {
    public static constructIdeFile(absoluteFilePath: AbsoluteFilePath, currentNamespaceString: string): IdeFile {
        switch (FileKindMatcher.getFileKind(absoluteFilePath.extensionNoPeriod)) {
            case FileKind.cSharp:
                return new CSharpFile(absoluteFilePath, currentNamespaceString);
            case FileKind.fSharp:
                return new FSharpFile(absoluteFilePath, currentNamespaceString);
            case FileKind.fSX:
                return new FSXFile(absoluteFilePath, currentNamespaceString);
            case FileKind.c:
                return new CFile(absoluteFilePath, currentNamespaceString);
            case FileKind.cPlusPlus:
                return new CPlusPlusFile(absoluteFilePath, currentNamespaceString);
            case FileKind.cshtml:
                return new CshtmlFile(absoluteFilePath);
            case FileKind.css:
                return new CssFile(absoluteFilePath);
            case FileKind.directory:
                return new DirectoryFile(absoluteFilePath, currentNamespaceString);
            case FileKind.razor:
                return new RazorFile(absoluteFilePath);
            case FileKind.json:
                return new JsonFile(absoluteFilePath);
            default:
                return new DefaultFile(absoluteFilePath);
        }
    }
}