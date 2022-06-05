import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { SolutionModel } from "./SolutionModel";

export class CSharpProjectModel {
    constructor(public readonly parentSolutionModel: SolutionModel,
        public readonly firstGuid: string,
        public readonly displayName: string,
        public readonly projectRelativePathFromSolution: string,
        public readonly secondGuid: string) {
            this.absoluteFilePath = AbsoluteFilePath
                .ConstructAbsoluteFilePathFromAbsoluteFilePathAndRelativePath(parentSolutionModel.absoluteFilePath,
                    this.projectRelativePathFromSolution,
                    false);
    }

    public readonly absoluteFilePath: AbsoluteFilePath;
}