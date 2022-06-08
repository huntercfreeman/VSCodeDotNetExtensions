import { IdeFile } from './Files/IdeFile';
import { FileKind } from "./FileKind";

export class FileSorter {
    private constructor() { }

    public static organizeContainer(fileBases: IdeFile[]): IdeFile[] {
        let isDirectoryFiles: IdeFile[] = [];
        let notDirectoryFiles: IdeFile[] = [];

        for (let i = 0; i < fileBases.length; i++) {
            let currentFile = fileBases[i];

            switch (currentFile.fileKind) {
                case FileKind.directory:
                    isDirectoryFiles.push(currentFile);
                    break;
                default:
                    notDirectoryFiles.push(currentFile);
                    break;
            }
        }

        isDirectoryFiles.sort((fileOne, fileTwo) => {
            return fileOne.absoluteFilePath.filenameWithExtension
                .localeCompare(fileTwo.absoluteFilePath.filenameWithExtension);
        });

        notDirectoryFiles.sort((fileOne, fileTwo) => {
            return fileOne.absoluteFilePath.filenameWithExtension
                .localeCompare(fileTwo.absoluteFilePath.filenameWithExtension);
        });

        return isDirectoryFiles
            .concat(notDirectoryFiles);
    }
}
