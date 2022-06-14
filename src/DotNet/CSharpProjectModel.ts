import { ConstantsContextualInformation } from "../Constants/ConstantsContextualInformation";
import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { CSharpProjectNugetPackageDependenciesFile } from "../FileSystem/Files/CSharpProjectNugetPackageDependenciesFile";
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
        public readonly secondGuid: string,
        rootNamespace: string | null) {
            this.absoluteFilePath = AbsoluteFilePath
                .constructAbsoluteFilePathFromAbsoluteFilePathAndRelativePath(parentSolutionModel.absoluteFilePath,
                    this.projectRelativePathFromSolution,
                    false);

            this.rootNamespace = rootNamespace ?? displayName;

            if (!this.absoluteFilePath.extensionNoPeriod) {
                // Is likely a solution folder
                // I am not sure if this is fool proof however.
                //
                // This is necessary for when a solution folder
                // is empty otherwise it would 100% be guaranteed
                // to be a solution folder as it would show in the
                // solution folders section of the .sln file.;
                
                this.solutionFolderEntries = [];
                this.contextualInformation = ConstantsContextualInformation.TREE_VIEW_SOLUTION_FOLDER_CONTEXT;
            }
    }

    public static async getFileContents(solution: SolutionModel, callback: any) : Promise<string> {
        return await fs.readFile(solution.absoluteFilePath.initialAbsoluteFilePathStringInput, 'utf8', (err: any, data: any) => {
            callback(err, data);
        });
    }
    
    public static async parseRootNamespace(cSharpProjectModel: CSharpProjectModel,
        callback: any) : Promise<void> {

        cSharpProjectModel.rootNamespace = cSharpProjectModel.displayName;

        let cSharpProjectParser = new CSharpProjectParser(undefined, 
            undefined,
            undefined,
            cSharpProjectModel);
        
        cSharpProjectParser.parse(callback);
    }

    public static async parseCSharpProjectProjectReferences(cSharpProjectAbsoluteFilePath: AbsoluteFilePath,
        cSharpProjectProjectReferencesFile: CSharpProjectProjectReferencesFile,
        callback: any) : Promise<void> {

        cSharpProjectProjectReferencesFile.virtualChildFiles = [];

        let cSharpProjectParser = new CSharpProjectParser(cSharpProjectAbsoluteFilePath, 
            cSharpProjectProjectReferencesFile,
            undefined,
            undefined);
        
        cSharpProjectParser.parse(callback);
    }
    
    public static async parseCSharpProjectNugetPackageReferences(cSharpProjectAbsoluteFilePath: AbsoluteFilePath,
        cSharpProjectNugetPackageDependenciesFile: CSharpProjectNugetPackageDependenciesFile,
        callback: any) : Promise<void> {

            cSharpProjectNugetPackageDependenciesFile.virtualChildFiles = [];

            let cSharpProjectParser = new CSharpProjectParser(cSharpProjectAbsoluteFilePath, 
                undefined,
                cSharpProjectNugetPackageDependenciesFile,
                undefined);
        
        cSharpProjectParser.parse(callback);
    }

    public readonly absoluteFilePath: AbsoluteFilePath;
    public solutionFolderEntries: CSharpProjectModel[] | undefined;
	public childFiles: IdeFile[] | undefined;
    public solutionFolderParentSecondGuid: string | undefined;
    public projectReferences: CSharpProjectProjectReferenceFile[] = [];
    public rootNamespace: string;

    public contextualInformation: string = ConstantsContextualInformation.TREE_VIEW_CSHARP_PROJECT_CONTEXT;
}