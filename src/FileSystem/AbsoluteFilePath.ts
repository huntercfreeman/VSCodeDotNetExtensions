import { ConstantsFilePath } from "../Constants/ConstantsFilePath";
import { getNonce } from "../IdGeneration/getNonce";
import { FilePathParser } from "../Parsers/FilePathParser";
import { FilePathStandardizer } from "./FilePathStandardizer";

export class AbsoluteFilePath {
    /**
     * 
     * @param initialAbsoluteFilePathStringInput 
     * @param isDirectory 
     * @param parentDirectories If passed as an empty array the parentDirectories will be parsed from the initialAbsoluteFilePathStringInput. If passed with entries parent directories will not be parsed from initialAbsoluteFilePathStringInput as this could cause an infinite loop of parsing for parent directories.
     */
    constructor(public readonly initialAbsoluteFilePathStringInput: string,
        public readonly isDirectory: boolean,
        public readonly parentDirectories: AbsoluteFilePath[],
        public readonly nonce: string | null) {
        if (nonce === null) {
            nonce = getNonce();
        }

        initialAbsoluteFilePathStringInput = FilePathStandardizer.standardizeFilePath(initialAbsoluteFilePathStringInput);

        this.fileNameWithExtension = AbsoluteFilePath.GetFileNameWithExtension(initialAbsoluteFilePathStringInput);

        let possibleFileNameNoExtension: string | undefined = AbsoluteFilePath
            .GetFileNameWithoutExtensionFromFileNameWithExtension(this.fileNameWithExtension);

        if (!possibleFileNameNoExtension) {
            this.fileNameNoExtension = this.fileNameWithExtension;
        }

        if (parentDirectories.length == 0) {
            parentDirectories = FilePathParser.parseParentDirectories(initialAbsoluteFilePathStringInput);
        }
    }

    public static ConstructAbsoluteFilePathFromAbsoluteFilePathAndRelativePath(absoluteFilePath: AbsoluteFilePath,
        relativePathFromGivenAbsoluteFilePath: string,
        isDirectory: boolean)
        : AbsoluteFilePath {
        let normalizedRelativePath = FilePathStandardizer
            .standardizeFilePath(relativePathFromGivenAbsoluteFilePath);

        if (normalizedRelativePath.startsWith("..")) {
            // Check how many times '../' occurs in path. 
            // Example: "../../MyDirectory" is 2
            var count = (normalizedRelativePath.match(`/..${ConstantsFilePath.STANDARDIZED_FILE_DELIMITER}/g`) || [])
                            .length;
            
            var parentDirectories = absoluteFilePath.parentDirectories
                .slice(0, absoluteFilePath.parentDirectories.length - count);

            let joinedAbsolutePathString = parentDirectories
                .join(ConstantsFilePath.STANDARDIZED_FILE_DELIMITER);

            return new AbsoluteFilePath(joinedAbsolutePathString,
                isDirectory,
                parentDirectories,
                null);
        }
        else (normalizedRelativePath.startsWith(`.${ConstantsFilePath.STANDARDIZED_FILE_DELIMITER}`)) {
            return new AbsoluteFilePath(absoluteFilePath.initialAbsoluteFilePathStringInput
                .replace(absoluteFilePath.fileNameWithExtension, 
                    AbsoluteFilePath.GetFileNameWithExtension(relativePathFromGivenAbsoluteFilePath)),
                isDirectory,
                absoluteFilePath.parentDirectories,
                null);
        }
    }

    public static GetFileNameWithExtension(input: string) {
        let possibleFileNameWithExtension: string | undefined = input
            .split(ConstantsFilePath.STANDARDIZED_FILE_DELIMITER)
            .pop();

        if (!possibleFileNameWithExtension) {
            throw this.fileNameException;
        }

        return possibleFileNameWithExtension;
    }

    public static GetFileNameWithoutExtensionFromFileNameWithExtension(input: string) {
        let startingIndexOfFileExtension = input.indexOf(".");

        if (startingIndexOfFileExtension !== -1) {
            return input.substring(0, startingIndexOfFileExtension + 1);
        }
    }

    public fileNameNoExtension!: string;
    public fileNameWithExtension!: string;

    public static readonly fileNameException = 'Malformed absolute path could not parse filename';
}