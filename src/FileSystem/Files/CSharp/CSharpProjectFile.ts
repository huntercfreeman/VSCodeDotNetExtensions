import { ContextualInformationDatum } from "../../../ContextMenus/ContextualInformationDatum";
import { CSharpProjectModel } from "../../../DotNet/CSharpProjectModel";
import { IdeFile } from "../IdeFile";
import { CSharpProjectDependenciesListFile } from "./CSharpProjectDependenciesListFile";

export class CSharpProjectFile extends IdeFile {

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
        ];

        this.constantChildFiles = [
            new CSharpProjectDependenciesListFile(this.cSharpProjectModel.absoluteFilePath),
        ];
        
        this.isExpanded = cSharpProjectModel.initialIsExpandedState;
    }

    public constantChildFiles: any[] | undefined;

    public childFiles: any[] | undefined;

    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }

    public readonly contextualInformation: ContextualInformationDatum[];
}