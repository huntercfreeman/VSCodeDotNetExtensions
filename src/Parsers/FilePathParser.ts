import { ConstantsFilePath } from "../Constants/ConstantsFilePath";
import { FilePathStandardizer } from "../FileSystem/FilePathStandardizer";

export class FilePathParser {
    public static parseDirectories(inputString: string) {
        inputString = FilePathStandardizer.standardizeFilePath(inputString);

        let separatedFiles = inputString.split(ConstantsFilePath.STANDARDIZED_FILE_DELIMITER);

        
    }
}