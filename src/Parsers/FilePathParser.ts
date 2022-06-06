import { ConstantsFilePath } from "../Constants/ConstantsFilePath";
import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { FilePathStandardizer } from "../FileSystem/FilePathStandardizer";

export class FilePathParser {
    public static parseParentDirectories(inputString: string) : AbsoluteFilePath[] {
        inputString = FilePathStandardizer.standardizeFilePath(inputString);

        let separatedFiles = inputString.split(ConstantsFilePath.STANDARDIZED_FILE_DELIMITER);

        let parentDirectoriesAbsoluteFilePathStrings: string[] = [];

        // The final "absolute file path string" will not count as a parent it is the child 
        for (let i = 0; i < separatedFiles.length - 1; i++) {
            let directoryAbsoluteFilePath = "";

            for (let j = 0; j < i; j++) {
                directoryAbsoluteFilePath += 
                    separatedFiles[j] + ConstantsFilePath.STANDARDIZED_FILE_DELIMITER;    
            }

            parentDirectoriesAbsoluteFilePathStrings
                .push(directoryAbsoluteFilePath + separatedFiles[i]);
        }        

        let previouslySeenParentDirectories: AbsoluteFilePath[] = [];

        parentDirectoriesAbsoluteFilePathStrings.forEach(element => {
            let parentAbsoluteFilePath = new AbsoluteFilePath(element, true, [...previouslySeenParentDirectories], null);

            previouslySeenParentDirectories.push(parentAbsoluteFilePath);
        });

        return previouslySeenParentDirectories;
    }
}