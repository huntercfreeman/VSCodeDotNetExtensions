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

    public static readonly LOAD_SOLUTIONS_IN_WORKSPACE: string = "LOAD_SOLUTIONS_IN_WORKSPACE";
    public static readonly ADD_PROJECT_TO_SOLUTION: string = "ADD_PROJECT_TO_SOLUTION";
    public static readonly ADD_SOLUTION_FOLDER: string = "ADD_SOLUTION_FOLDER";
    public static readonly ADD_PROJECT_TO_SOLUTION_FOLDER: string = "ADD_PROJECT_TO_SOLUTION_FOLDER";
    public static readonly READ_SOLUTION: string = "READ_SOLUTION";
    public static readonly PARSE_SOLUTION: string = "PARSE_SOLUTION";
    public static readonly LOAD_CSHARP_PROJECT_CHILD_FILES: string = "LOAD_CSHARP_PROJECT_CHILD_FILES";
    public static readonly LOAD_DIRECTORY_CHILD_FILES: string = "LOAD_DIRECTORY_CHILD_FILES";
    public static readonly ADD_FILE_WITH_TEMPLATE_TO_DIRECTORY: string = "ADD_FILE_WITH_TEMPLATE_TO_DIRECTORY";
    public static readonly ADD_EMPTY_FILE_TO_DIRECTORY: string = "ADD_EMPTY_FILE_TO_DIRECTORY";
    public static readonly OPEN_FILE: string = "OPEN_FILE";
}