import { ConstantsFilePath } from "../Constants/ConstantsFilePath";

export class FilePathStandardizer {
    /**
     * Normalizes file delimiters: ['\\', '/'] to be only '/'
     */
    public static standardizeFilePath(inputString: string) {
        return inputString.replace(/\\/g, ConstantsFilePath.STANDARDIZED_FILE_DELIMITER);
    }
}