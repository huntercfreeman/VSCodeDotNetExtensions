import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { SolutionModel } from "./SolutionModel";

export class CSharpProjectModel {
    constructor(public readonly absoluteFilePath: AbsoluteFilePath, 
        public readonly solutionModel: SolutionModel) {
    }
}