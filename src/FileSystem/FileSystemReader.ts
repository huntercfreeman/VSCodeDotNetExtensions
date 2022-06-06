import { AbsoluteFilePath } from "./AbsoluteFilePath";

const fs = require('fs');

export class FileSystemReader {
    public static async getSiblingFiles(absoluteFilePath: AbsoluteFilePath, callback: any): Promise<void> {
        fs.readdir(absoluteFilePath.parentDirectories[absoluteFilePath.parentDirectories.length - 1].initialAbsoluteFilePathStringInput, 
            (err: any, files: any) => {
            callback(files);
          });
    }

    public static isDir(absoluteFilePathString: string) {
        try {
            var stat = fs.lstatSync(absoluteFilePathString);
            return stat.isDirectory();
        } catch (e) {
            // lstatSync throws an error if path doesn't exist
            return false;
        }
    }
}