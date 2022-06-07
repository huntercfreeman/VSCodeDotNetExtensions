import * as vscode from 'vscode';
import { FilePathParser } from '../Parsers/FilePathParser';
import { DefaultFile } from './DefaultFile';
import { IdeFile } from './IdeFile';
import { FileKind } from "./FileKind";
import { IdeFileFactory } from './IdeFileFactory';

const fs = require('fs');

export class FileSorter {
    private constructor() { }

    public static organizeContainer(fileBases: IdeFile[]): IdeFile[] {
        let csFiles: IdeFile[] = [],
            cssFiles: IdeFile[] = [],
            dirFiles: IdeFile[] = [],
            jsonFiles: IdeFile[] = [],
            csprojFiles: IdeFile[] = [],
            razorFiles: IdeFile[] = [],
            slnFiles: IdeFile[] = [],
            projectDependencies: IdeFile[] = [],
            txtFiles: IdeFile[] = [];

        let unrecognizedFiles: IdeFile[] = [];

        let organizedFiles: IdeFile[] = [];

        for (let i = 0; i < fileBases.length; i++) {
            let currentFile = fileBases[i];

            switch (currentFile.fileKind) {
                case FileKind.directory:
                    dirFiles.push(currentFile);
                    break;
                // case FileBaseKind.cs:
                //     csFiles.push(currentFile);
                //     break;
                // case FileBaseKind.css:
                //     cssFiles.push(currentFile);
                //     break;
                // case FileBaseKind.json:
                //     jsonFiles.push(currentFile);
                //     break;
                // case FileBaseKind.csproj:
                //     csprojFiles.push(currentFile);
                //     break;
                // case FileBaseKind.razor:
                //     razorFiles.push(currentFile);
                //     break;
                // case FileBaseKind.sln:
                //     slnFiles.push(currentFile);
                //     break;
                // case FileBaseKind.txt:
                //     txtFiles.push(currentFile);
                //     break;
                default:
                    unrecognizedFiles.push(currentFile);
                    break;
            }
        }

        projectDependencies.sort((fileOne, fileTwo) => {
            return fileOne.absoluteFilePath.filenameWithExtension.localeCompare(fileTwo.absoluteFilePath.filenameWithExtension);
        });
        unrecognizedFiles.sort((fileOne, fileTwo) => {
            return fileOne.absoluteFilePath.filenameWithExtension.localeCompare(fileTwo.absoluteFilePath.filenameWithExtension);
        });

        organizedFiles = organizedFiles
            .concat(projectDependencies)
            .concat(dirFiles)
            .concat(unrecognizedFiles);
        // .concat(csFiles)
        // .concat(cssFiles)
        // .concat(jsonFiles)
        // .concat(csprojFiles)
        // .concat(razorFiles)
        // .concat(slnFiles)
        // .concat(txtFiles);

        return organizedFiles;
    }
}
