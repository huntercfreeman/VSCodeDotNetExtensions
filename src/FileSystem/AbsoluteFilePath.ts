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
            if(nonce === null) {
                nonce = getNonce();
            }

            initialAbsoluteFilePathStringInput = FilePathStandardizer.standardizeFilePath(initialAbsoluteFilePathStringInput);
            
            let possibleFileNameWithExtension: string | undefined = initialAbsoluteFilePathStringInput.split(ConstantsFilePath.STANDARDIZED_FILE_DELIMITER).pop();

            if(!possibleFileNameWithExtension) {
                throw this.fileNameException;
            }

            this.fileNameWithExtension = possibleFileNameWithExtension;

            let startingIndexOfFileExtension = possibleFileNameWithExtension.indexOf(".");

            if(startingIndexOfFileExtension !== -1) {
                this.fileNameNoExtension = possibleFileNameWithExtension
                    .substring(0, startingIndexOfFileExtension + 1);
            }
            else {
                this.fileNameNoExtension = possibleFileNameWithExtension;
            }
            
            if(!parentDirectories) {
                parentDirectories = FilePathParser.parseParentDirectories(initialAbsoluteFilePathStringInput);
            }
    }

    public fileNameNoExtension!: string; 
    public fileNameWithExtension!: string; 

    public readonly fileNameException = 'Malformed absolute path could not parse filename';
}