import { ConstantsFilePath } from "../Constants/ConstantsFilePath";
import { getNonce } from "../IdGeneration/getNonce";
import { FilePathParser } from "../Parsers/FilePathParser";
import { FilePathStandardizer } from "./FilePathStandardizer";

export class AbsoluteFilePath {
    /**
     * 
     * @param initialAbsoluteFilePathStringInput 
     * @param isDirectory 
     * @param initialParentDirectories If passed as a null array the parentDirectories will be parsed from the initialAbsoluteFilePathStringInput. If passed with entries parent directories will not be parsed from initialAbsoluteFilePathStringInput as this could cause an infinite loop of parsing for parent directories.
     */
    constructor(public readonly initialAbsoluteFilePathStringInput: string,
        public readonly isDirectory: boolean,
        initialParentDirectories: AbsoluteFilePath[] | null,
        public readonly nonce: string | null) {
        if (nonce === null) {
            nonce = getNonce();
        }

        initialAbsoluteFilePathStringInput = FilePathStandardizer.standardizeFilePath(initialAbsoluteFilePathStringInput);

        this.fileNameWithExtension = AbsoluteFilePath.getFileNameWithExtension(initialAbsoluteFilePathStringInput);

        let possibleFileNameNoExtension: string | undefined = AbsoluteFilePath
            .getFileNameWithoutExtensionFromFileNameWithExtension(this.fileNameWithExtension);

        if (!possibleFileNameNoExtension) {
            this.fileNameNoExtension = this.fileNameWithExtension;
        }

        if (!initialParentDirectories) {
            this.parentDirectories = FilePathParser.parseParentDirectories(initialAbsoluteFilePathStringInput);
        }
        else {
            this.parentDirectories = initialParentDirectories;
        }
    }

    public static constructAbsoluteFilePathFromAbsoluteFilePathAndRelativePath(absoluteFilePath: AbsoluteFilePath,
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
        else {
            return new AbsoluteFilePath(absoluteFilePath.initialAbsoluteFilePathStringInput
                .replace(absoluteFilePath.fileNameWithExtension, 
                    AbsoluteFilePath.getFileNameWithExtension(relativePathFromGivenAbsoluteFilePath)),
                isDirectory,
                absoluteFilePath.parentDirectories,
                null);
        }
    }

    public static getFileNameWithExtension(input: string) {
        let possibleFileNameWithExtension: string | undefined = input
            .split(ConstantsFilePath.STANDARDIZED_FILE_DELIMITER)
            .pop();

        if (!possibleFileNameWithExtension) {
            throw this.fileNameException;
        }

        return possibleFileNameWithExtension;
    }

    public static getFileNameWithoutExtensionFromFileNameWithExtension(input: string) {
        let startingIndexOfFileExtension = input.indexOf(".");

        if (startingIndexOfFileExtension !== -1) {
            return input.substring(0, startingIndexOfFileExtension + 1);
        }
    }

    public fileNameNoExtension!: string;
    public fileNameWithExtension!: string;
    public readonly parentDirectories: AbsoluteFilePath[];

    public static readonly fileNameException = 'Malformed absolute path could not parse filename';
}