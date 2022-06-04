import { SolutionModel } from "../DotNet/SolutionModel";
import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";

/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantsMessages {
    /**
     * 
     * @param solutionAbsoluteFilePaths Null indicates a request for the loaded solutions, value means response of loaded solutions.
     * @returns 
     */
    public static ConstructLoadSolutionsInWorkspaceMessage(solutions: SolutionModel[] | null) {
        return {
            type: ConstantsMessages.LOAD_SOLUTIONS_IN_WORKSPACE,
            value: solutions
        };
    }
    
    /**
     * 
     * @param solutionAbsoluteFilePaths Null indicates a request for the loaded solutions, value means response of loaded solutions.
     * @returns 
     */
    public static ConstructReadSolutionMessage(solutionContents: string | null) {
        return {
            type: ConstantsMessages.READ_SOLUTION,
            value: solutionContents
        };
    }

    public static readonly LOAD_SOLUTIONS_IN_WORKSPACE: string = "loadSolutionsInWorkspace";
    public static readonly READ_SOLUTION: string = "readSolution";
}