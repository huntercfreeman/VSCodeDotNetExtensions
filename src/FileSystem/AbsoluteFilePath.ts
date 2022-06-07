import { ConstantsFilePath } from "../Constants/ConstantsFilePath";
import { getNonce } from "../IdGeneration/getNonce";
import { FilePathParser } from "../Parsers/FilePathParser";
import { FilePathStandardizer } from "./FilePathStandardizer";

export class AbsoluteFilePath {
    /**
     * 
     * @param absoluteFilePathString 
     * @param isDirectory 
     * @param initialParentDirectories If passed as a null array the parentDirectories will be parsed from the initialAbsoluteFilePathStringInput. If passed with entries parent directories will not be parsed from initialAbsoluteFilePathStringInput as this could cause an infinite loop of parsing for parent directories.
     */
    constructor(public absoluteFilePathString: string,
        public readonly isDirectory: boolean,
        initialParentDirectories: AbsoluteFilePath[] | null,
        public readonly nonce: string | null) {
        if (nonce === null) {
            nonce = getNonce();
        }

        this.initialAbsoluteFilePathStringInput = FilePathStandardizer.standardizeFilePath(absoluteFilePathString);

        this.filenameWithExtension = AbsoluteFilePath.getFilenameWithExtension(this.initialAbsoluteFilePathStringInput);

        let possibleFilenameNoExtension: string | undefined = AbsoluteFilePath
            .getFilenameWithoutExtensionFromFilenameWithExtension(this.filenameWithExtension);

        if (!possibleFilenameNoExtension) {
            this.filenameNoExtension = this.filenameWithExtension;
        }

        if(isDirectory) {
            this.extensionNoPeriod = ConstantsFilePath.STANDARDIZED_FILE_DELIMITER;
        }
        else {
            this.extensionNoPeriod = AbsoluteFilePath.getExtensionNoPeriodFromFilenameWithExtension(this.filenameWithExtension);
        }

        if (!initialParentDirectories) {
            this.parentDirectories = FilePathParser.parseParentDirectories(this.initialAbsoluteFilePathStringInput);
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

            normalizedRelativePath = normalizedRelativePath
                .replace('.${ConstantsFilePath.STANDARDIZED_FILE_DELIMITER}',
                    ConstantsFilePath.STANDARDIZED_FILE_DELIMITER);

            return new AbsoluteFilePath(absoluteFilePath.initialAbsoluteFilePathStringInput
                .replace(absoluteFilePath.filenameWithExtension,
                    normalizedRelativePath),
                isDirectory,
                null,
                null);
        }
    }

    public static getFilenameWithExtension(input: string) {
        let possibleFilenameWithExtension: string | undefined = input
            .split(ConstantsFilePath.STANDARDIZED_FILE_DELIMITER)
            .pop();

        if (!possibleFilenameWithExtension) {
            throw this.filenameException;
        }

        return possibleFilenameWithExtension;
    }

    public static getFilenameWithoutExtensionFromFilenameWithExtension(input: string) {
        let startingIndexOfFileExtension = input.indexOf(".");

        if (startingIndexOfFileExtension !== -1) {
            return input.substring(0, startingIndexOfFileExtension + 1);
        }
    }
    
    public static getExtensionNoPeriodFromFilenameWithExtension(input: string): string {
        let startingIndexOfFileExtension = input.lastIndexOf(".");

        if (startingIndexOfFileExtension !== -1) {
            return input.substring(startingIndexOfFileExtension + 1);
        }

        return "";
    }

    public filenameNoExtension!: string;
    public filenameWithExtension!: string;
    public extensionNoPeriod!: string;
    public readonly parentDirectories: AbsoluteFilePath[];
    public readonly initialAbsoluteFilePathStringInput: string;

    public static readonly filenameException = 'Malformed absolute path could not parse filename';
}