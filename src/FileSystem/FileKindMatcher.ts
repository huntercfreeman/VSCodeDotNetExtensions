import { ConstantsFileExtensionsNoPeriod } from "../Constants/ConstantsFileExtensionsNoPeriod";
import { FileKind } from "./FileKind";

export class FileKindMatcher {
    public static getFileKind(fileExtensionNoPeriod: string): FileKind {
        switch (fileExtensionNoPeriod) {
            case ConstantsFileExtensionsNoPeriod.C_SHARP_PROJECT_FILE_EXTENSION:
                return FileKind.cSharpProject;
            case ConstantsFileExtensionsNoPeriod.SOLUTION_FILE_EXTENSION:
                return FileKind.solution;
            case ConstantsFileExtensionsNoPeriod.C_SHARP_FILE_EXTENSION:
                return FileKind.cSharp;
            case ConstantsFileExtensionsNoPeriod.CSHMTL_FILE_EXTENSION:
                return FileKind.cshtml;
            case ConstantsFileExtensionsNoPeriod.CSS_FILE_EXTENSION:
                return FileKind.css;
            case ConstantsFileExtensionsNoPeriod.DIRECTORY_FILE_EXTENSION:
                return FileKind.directory;
            case ConstantsFileExtensionsNoPeriod.RAZOR_FILE_EXTENSION:
                return FileKind.razor;
            case ConstantsFileExtensionsNoPeriod.JSON_FILE_EXTENSION:
                return FileKind.json;
            default:
                return FileKind.default;
        }
    }
}