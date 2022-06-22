import { ConstantsContextualInformation } from "../Constants/ConstantsContextualInformation";
import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { CSharpProjectNugetPackageDependenciesListFile } from "../FileSystem/Files/CSharp/CSharpProjectNugetPackageDependenciesListFile";
import { CSharpProjectProjectReferenceFile } from "../FileSystem/Files/CSharp/CSharpProjectProjectReferenceFile";
import { CSharpProjectProjectReferencesListFile } from "../FileSystem/Files/CSharp/CSharpProjectProjectReferencesListFile";
import { IdeFile } from "../FileSystem/Files/IdeFile";
import { XmlProjectParser } from "../Parsers/XmlProjectParser";
import { IProjectModel } from "./IProjectModel";
import { ProjectKind } from "./ProjectKind";
import { SolutionModel } from "./SolutionModel";

const fs = require('fs');

export class FSharpProjectModel implements IProjectModel {
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
        public readonly projectTypeGuid: string,
        public readonly displayName: string,
        public readonly projectRelativePathFromSolution: string,
        public readonly projectIdGuid: string,
        rootNamespace: string | null) {
        this.absoluteFilePath = AbsoluteFilePath
            .constructAbsoluteFilePathFromAbsoluteFilePathAndRelativePath(parentSolutionModel.absoluteFilePath,
                this.projectRelativePathFromSolution,
                false);

        this.rootNamespace = rootNamespace ?? displayName;

        this.parentSolutionAbsoluteFilePath = parentSolutionModel.absoluteFilePath;
    }

    public static async getFileContents(solution: SolutionModel, callback: any): Promise<string> {
        return await fs.readFile(solution.absoluteFilePath.initialAbsoluteFilePathStringInput, 'utf8', (err: any, data: any) => {
            callback(err, data);
        });
    }

    public static async parseRootNamespace(fSharpProjectModel: FSharpProjectModel,
        callback: any): Promise<void> {

        fSharpProjectModel.rootNamespace = fSharpProjectModel.displayName;

        let cSharpProjectParser = new XmlProjectParser(undefined,
            undefined,
            undefined,
            fSharpProjectModel);

        cSharpProjectParser.parse(callback);
    }
    
    public readonly absoluteFilePath: AbsoluteFilePath;
    public childFiles: IdeFile[] | undefined;
    public solutionFolderParentProjectIdGuid: string | undefined;
    public projectReferences: CSharpProjectProjectReferenceFile[] = [];
    public rootNamespace: string;
    public targetFramework: string = "";
    public isExecutable: boolean = true;;
    public readonly parentSolutionAbsoluteFilePath: AbsoluteFilePath;
    public initialIsExpandedState: boolean = false;
    public projectKind: ProjectKind = ProjectKind.fSharpProject;

    public contextualInformation: string = ConstantsContextualInformation.TREE_VIEW_FSHARP_PROJECT_CONTEXT;
}