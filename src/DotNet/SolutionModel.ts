import { ConstantsContextualInformation } from "../Constants/ConstantsContextualInformation";
import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { DotNetSolutionParser } from "../Parsers/DotNetSolutionParser";
import { CSharpProjectModel } from "./CSharpProjectModel";
const fs = require('fs');

export class SolutionModel {
    constructor(public readonly absoluteFilePath: AbsoluteFilePath) {   
    }

    public readonly projects: CSharpProjectModel[] = [];
    
    public static async getFileContents(solution: SolutionModel, callback: any) : Promise<string> {
        return await fs.readFile(solution.absoluteFilePath.initialAbsoluteFilePathStringInput, 'utf8', (err: any, data: any) => {
            callback(err, data);
        });        
    }
    
    public static async parseSolution(solution: SolutionModel, callback: any) : Promise<void> {
        let dotNetSolutionParser = new DotNetSolutionParser(solution.absoluteFilePath,
            solution);
        
        dotNetSolutionParser.parse(callback);
    }

    public readonly contextualInformation: string = ConstantsContextualInformation.TREE_VIEW_SOLUTION_CONTEXT;
}
