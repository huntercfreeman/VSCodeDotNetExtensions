import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { SolutionModel } from "./SolutionModel";

export class CSharpProjectModel {
    constructor(public readonly parentSolutionModel: SolutionModel,
        public readonly firstGuid: string,
        public readonly displayName: string,
        public readonly projectRelativePathFromSolution: string,
        public readonly secondGuid: string) {
            absoluteFilePath = new AbsoluteFilePath();
    }

    public readonly absoluteFilePath: AbsoluteFilePath;
}