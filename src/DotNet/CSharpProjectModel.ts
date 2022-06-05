import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { SolutionModel } from "./SolutionModel";

export class CSharpProjectModel {
    constructor(parentSolutionModel: SolutionModel,
        public readonly firstGuid: string,
        public readonly displayName: string,
        public readonly projectRelativePathFromSolution: string,
        public readonly secondGuid: string) {
            this.absoluteFilePath = AbsoluteFilePath
                .constructAbsoluteFilePathFromAbsoluteFilePathAndRelativePath(parentSolutionModel.absoluteFilePath,
                    this.projectRelativePathFromSolution,
                    false);
    }

    public readonly absoluteFilePath: AbsoluteFilePath;
}