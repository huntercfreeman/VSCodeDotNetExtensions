import { SolutionModel } from "./SolutionModel";

export class TemporaryProjectModel {
    /**
     * 
     * @param parentSolutionModel 
     * @param projectTypeGuid Identifies project type and is likely to be seen many times in one .sln file.
     * @param displayName 
     * @param projectRelativePathFromSolution 
     * @param projectIdGuid Identifies one unique project from another
     * @param rootNamespace 
     */
    constructor(parentSolutionModel: SolutionModel,
        public projectTypeGuid: string,
        public displayName: string,
        public projectRelativePathFromSolution: string,
        public projectIdGuid: string,
        rootNamespace: string | null) {
    }
}