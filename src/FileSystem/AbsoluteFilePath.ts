import { ConstantsFilePath } from "../Constants/ConstantsFilePath";
import { getNonce } from "../IdGeneration/getNonce";
import { FilePathParser } from "../Parsers/FilePathParser";
import { FilePathStandardizer } from "./FilePathStandardizer";

export class AbsoluteFilePath {
    /**
     * 
     * @param initialAbsoluteFilePathStringInput 
     * @param isDirectory 
     * @param parentDirectories If passed as null the parentDirectories will be parsed from the initialAbsoluteFilePathStringInput. If passed with a value parent directories will not be parsed from initialAbsoluteFilePathStringInput as this could cause an infinite loop of parsing for parent directories.
     */
    constructor(public readonly initialAbsoluteFilePathStringInput: string,
        public readonly isDirectory: boolean,
        public readonly parentDirectories: AbsoluteFilePath[] | null,
        public readonly nonce: string | null) {
        if (nonce === null) {
            nonce = getNonce();
        }

        initialAbsoluteFilePathStringInput = FilePathStandardizer.standardizeFilePath(initialAbsoluteFilePathStringInput);

        this.fileNameWithExtension = AbsoluteFilePath.GetFileNameWithExtension(initialAbsoluteFilePathStringInput);

        this.fileNameNoExtension = AbsoluteFilePath
            .GetFileNameWithoutExtensionFromFileNameWithExtension(this.fileNameWithExtension)
                ?? "";

        if (!parentDirectories) {
            parentDirectories = FilePathParser.parseParentDirectories(initialAbsoluteFilePathStringInput);
        }
    }

    public static ConstructAbsoluteFilePathFromAbsoluteFilePathAndRelativePath(absoluteFilePath: AbsoluteFilePath,
        relativePathFromGivenAbsoluteFilePath: string,
        isDirectory: boolean)
        : AbsoluteFilePath {
        let normalizedRelativePath = FilePathStandardizer
            .standardizeFilePath(relativePathFromGivenAbsoluteFilePath);

        if (normalizedRelativePath.startsWith("./")) {
            return new AbsoluteFilePath(absoluteFilePath.initialAbsoluteFilePathStringInput
                .replace(absoluteFilePath.fileNameWithExtension, relativePathFromGivenAbsoluteFilePath),
                isDirectory,
                absoluteFilePath.parentDirectories,
                null);
        }
        else if (normalizedRelativePath.startsWith("..")) {
            
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