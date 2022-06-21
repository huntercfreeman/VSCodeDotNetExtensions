import { ConstantsContextualInformation } from "../Constants/ConstantsContextualInformation";
import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { CSharpProjectProjectReferenceFile } from "../FileSystem/Files/CSharp/CSharpProjectProjectReferenceFile";
import { IdeFile } from "../FileSystem/Files/IdeFile";
import { XmlProjectParser } from "../Parsers/XmlProjectParser";
import { IProjectModel } from "./IProjectModel";
import { ProjectKind } from "./ProjectKind";
import { SolutionModel } from "./SolutionModel";

const fs = require('fs');

export class VCXProjectModel implements IProjectModel {
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

    public static async parseRootNamespace(vCXProjectModel: VCXProjectModel,
        callback: any): Promise<void> {

        vCXProjectModel.rootNamespace = vCXProjectModel.displayName;

        let xmlProjectParser = new XmlProjectParser(undefined,
            undefined,
            undefined,
            vCXProjectModel);

        xmlProjectParser.parse(callback);
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
    public projectKind: ProjectKind = ProjectKind.vcxProject;

    public contextualInformation: string = ConstantsContextualInformation.TREE_VIEW_VCX_PROJECT_CONTEXT;
}