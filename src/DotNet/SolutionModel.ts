import { ConstantsContextualInformation } from "../Constants/ConstantsContextualInformation";
import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { DotNetSolutionFile } from "../FileSystem/Files/DotNetSolutionFile";
import { IProjectFile } from "../FileSystem/Files/IProjectFile";
import { DotNetSolutionParser } from "../Parsers/DotNetSolutionParser";
import { IProjectModel } from "./IProjectModel";
import { SolutionModelFileHeader } from "./SolutionModelFileHeader";
import { SolutionModelGlobal } from "./SolutionModelGlobal";

const fs = require('fs');

export class SolutionModel {
    constructor(public readonly absoluteFilePath: AbsoluteFilePath) {
    }

    public projects: IProjectModel[] = [];

    public static async getFileContents(solution: SolutionModel, callback: any): Promise<string> {
        return await fs.readFile(solution.absoluteFilePath.initialAbsoluteFilePathStringInput, 'utf8', (err: any, data: any) => {
            callback(err, data);
        });
    }

    public static async parseSolution(dotNetSolutionFile: DotNetSolutionFile, callback: any): Promise<void> {

        let solution = dotNetSolutionFile.solutionModel;

        solution.projects = [];

        let dotNetSolutionParser = new DotNetSolutionParser(solution);

        dotNetSolutionParser.parse(() => {

            // Virtual Child Files are updated after calling the parseSolution method argument named callback()
            // Therefore we still have access to the previous user interface 'isExpanded' boolean
            if (dotNetSolutionFile.virtualChildFiles) {
                for (let i = 0; i < dotNetSolutionFile.virtualChildFiles.length; i++) {
                    let oldProjectFileState = dotNetSolutionFile.virtualChildFiles[i];
                    
                    let oldProjectFileStateProjectIdGuid: string = (oldProjectFileState as unknown as IProjectFile)
                        .projectModel.projectIdGuid;

                    //200847FD-6FD5-4F6C-B9E1-96472010C379
                    //200847FD-6FD5-4F6C-B9E1-96472010C379
                    let projectModelStillExists = solution.projects.find(project => {
                        return oldProjectFileStateProjectIdGuid === 
                            project.projectIdGuid;
                    });
                    
                    if (projectModelStillExists) {
                        projectModelStillExists.initialIsExpandedState = oldProjectFileState.isExpanded;
                    }
                }
            }

            callback();
        });
    }

    public static async addSolutionFolder(solution: SolutionModel, solutionFolderName: string, callback: any): Promise<void> {
        let dotNetSolutionParser = new DotNetSolutionParser(solution);

        // dotNetSolutionParser.addSolutionFolder(solutionFolderName, callback);
    }

    public readonly fileHeader: SolutionModelFileHeader = new SolutionModelFileHeader();
    public readonly global: SolutionModelGlobal = new SolutionModelGlobal();

    public readonly contextualInformation: string = ConstantsContextualInformation.TREE_VIEW_SOLUTION_CONTEXT;
}
