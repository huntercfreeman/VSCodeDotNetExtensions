import { ContextualInformationDatum } from "../../../ContextMenus/ContextualInformationDatum";
import { CSharpProjectModel } from "../../../DotNet/CSharpProjectModel";
import { IProjectModel } from "../../../DotNet/IProjectModel";
import { IdeFile } from "../IdeFile";
import { IProjectFile } from "../IProjectFile";
import { CSharpProjectDependenciesListFile } from "./CSharpProjectDependenciesListFile";

export class CSharpProjectFile extends IdeFile implements IProjectFile {

    constructor(public readonly cSharpProjectModel: CSharpProjectModel) {
        super(cSharpProjectModel.absoluteFilePath, cSharpProjectModel.rootNamespace);

        this.contextualInformation = [
            ContextualInformationDatum.createNewTemplatedFile,
            ContextualInformationDatum.createNewEmptyFile,
            ContextualInformationDatum.createDirectory,
            ContextualInformationDatum.refreshChildFiles,
            ContextualInformationDatum.removeCSharpProject,
            ContextualInformationDatum.startWithoutDebugging,
            ContextualInformationDatum.startDebugging,
            ContextualInformationDatum.putProjectInSolutionFolder,
            ContextualInformationDatum.openInXmlEditor,
        ];

        this.constantChildFiles = [
            new CSharpProjectDependenciesListFile(this.cSharpProjectModel.absoluteFilePath),
        ];
        
        this.isExpanded = cSharpProjectModel.initialIsExpandedState;

        this.projectModel = cSharpProjectModel;
    }

    public constantChildFiles: any[] | undefined;

    public childFiles: any[] | undefined;

    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }

    projectModel: IProjectModel;

    public readonly contextualInformation: ContextualInformationDatum[];
}