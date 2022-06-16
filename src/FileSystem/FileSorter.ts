import { IdeFile } from './Files/IdeFile';
import { FileKind } from "./FileKind";
import { ConstantsUniqueFiles } from '../Constants/ConstantsUniqueFiles';

export class FileSorter {
    private constructor() { }

    public static organizeContainer(fileBases: IdeFile[]): IdeFile[] {
        let isUniqueFiles: IdeFile[] = [];
        let isDirectoryFiles: IdeFile[] = [];
        let notDirectoryFiles: IdeFile[] = [];

        for (let i = 0; i < fileBases.length; i++) {
            let currentFile = fileBases[i];

            let hasUniqueFileNameNoExtension = ConstantsUniqueFiles.ALL_UNIQUE_FILENAME_NO_EXTENSION.
                find(uniqueFileNameNoExtension =>
                    currentFile.absoluteFilePath.filenameNoExtension === uniqueFileNameNoExtension);

            if (hasUniqueFileNameNoExtension) {
                isUniqueFiles.push(currentFile);
            }
            else {
                switch (currentFile.fileKind) {
                    case FileKind.directory:
                        isDirectoryFiles.push(currentFile);
                        break;
                    default:
                        notDirectoryFiles.push(currentFile);
                        break;
                }
            }
        }

        isUniqueFiles.sort((fileOne, fileTwo) => {
            return fileOne.absoluteFilePath.filenameWithExtension
                .localeCompare(fileTwo.absoluteFilePath.filenameWithExtension);
        });
        
        isDirectoryFiles.sort((fileOne, fileTwo) => {
            return fileOne.absoluteFilePath.filenameWithExtension
                .localeCompare(fileTwo.absoluteFilePath.filenameWithExtension);
        });

        notDirectoryFiles.sort((fileOne, fileTwo) => {
            return fileOne.absoluteFilePath.filenameWithExtension
                .localeCompare(fileTwo.absoluteFilePath.filenameWithExtension);
        });

        return isUniqueFiles
            .concat(isDirectoryFiles)
            .concat(notDirectoryFiles);
    }
}
