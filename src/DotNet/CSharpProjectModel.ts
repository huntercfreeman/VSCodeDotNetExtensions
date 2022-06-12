import { ConstantsContextualInformation } from "../Constants/ConstantsContextualInformation";
import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { CSharpProjectProjectReferenceFile } from "../FileSystem/Files/CSharpProjectProjectReferenceFile";
import { CSharpProjectProjectReferencesFile } from "../FileSystem/Files/CSharpProjectProjectReferencesFile";
import { IdeFile } from "../FileSystem/Files/IdeFile";
import { CSharpProjectParser } from "../Parsers/CSharpProjectParser";
import { SolutionModel } from "./SolutionModel";

const fs = require('fs');

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

    public static async getFileContents(solution: SolutionModel, callback: any) : Promise<string> {
        return await fs.readFile(solution.absoluteFilePath.initialAbsoluteFilePathStringInput, 'utf8', (err: any, data: any) => {
            callback(err, data);
        });
    }
    
    public static async parseCSharpProject(cSharpProjectAbsoluteFilePath: AbsoluteFilePath,
        cSharpProjectProjectReferencesFile: CSharpProjectProjectReferencesFile,
        callback: any) : Promise<void> {

        cSharpProjectProjectReferencesFile.virtualChildFiles = [];

        let cSharpProjectParser = new CSharpProjectParser(cSharpProjectAbsoluteFilePath, cSharpProjectProjectReferencesFile);
        
        cSharpProjectParser.parse(callback);
    }

    public readonly absoluteFilePath: AbsoluteFilePath;
    public solutionFolderEntries: CSharpProjectModel[] | undefined;
	public childFiles: IdeFile[] | undefined;
    public solutionFolderParentSecondGuid: string | undefined;
    public projectReferences: CSharpProjectProjectReferenceFile[] = [];

    public contextualInformation: string = ConstantsContextualInformation.TREE_VIEW_CSHARP_PROJECT_CONTEXT;
}