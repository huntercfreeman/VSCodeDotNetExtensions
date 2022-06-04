import { SolutionModel } from "../DotNet/SolutionModel";
import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";

export class DotNetSolutionParser {
    constructor(public readonly absoluteFilePath: AbsoluteFilePath,
        public readonly solutionModel: SolutionModel) {
    }

    public parse() {
        
    }
}