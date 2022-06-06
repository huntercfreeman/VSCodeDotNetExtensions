import { SolutionModel } from "../DotNet/SolutionModel";
import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { getNonce } from "../IdGeneration/getNonce";

/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantsMessages {
    /**
     * 
     * @param solutionAbsoluteFilePaths Null indicates a request for the loaded solutions, value means response of loaded solutions.
     * @returns 
     */
    public static ConstructMessage(type: string, value: any) {
        return {
            type: type,
            value: value,
            nonce: getNonce()
        };
    }
    
    public static readonly LOAD_SOLUTIONS_IN_WORKSPACE: string = "loadSolutionsInWorkspace";
    public static readonly READ_SOLUTION: string = "readSolution";
    public static readonly PARSE_SOLUTION: string = "parseSolution";
    public static readonly LOAD_CSHARP_PROJECT_CHILD_FILES: string = "loadCSharpProjectChildFiles";
    public static readonly LOAD_DIRECTORY_CHILD_FILES: string = "loadDirectoryChildFiles";
}