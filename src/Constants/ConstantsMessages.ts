import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";

/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantsMessages {
    /**
     * 
     * @param solutionAbsoluteFilePaths Null indicates a request for the loaded solutions, value means response of loaded solutions.
     * @returns 
     */
    public static ConstructLoadSolutionsInWorkspaceMessage(solutionAbsoluteFilePaths: AbsoluteFilePath[] | null) {
        return {
            type: ConstantsMessages.LOAD_SOLUTIONS_IN_WORKSPACE,
            solutionAbsoluteFilePaths: solutionAbsoluteFilePaths
        };
    }
    
    public static UnwrapLoadSolutionsInWorkspaceMessage(loadSolutionsInWorkspaceMessage: any) : AbsoluteFilePath[] {
        return loadSolutionsInWorkspaceMessage.solutionAbsoluteFilePaths;
    }

    public static readonly LOAD_SOLUTIONS_IN_WORKSPACE: string = "loadSolutionsInWorkspace";
}