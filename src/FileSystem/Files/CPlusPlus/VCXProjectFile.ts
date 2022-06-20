import { ContextualInformationDatum } from "../../../ContextMenus/ContextualInformationDatum";
import { VCXProjectModel } from "../../../DotNet/VCXProjectModel";
import { IdeFile } from "../IdeFile";
import { VCXProjectExternalDependenciesListFile } from "./VCXProjectExternalDependenciesListFile";
import { VCXProjectHeaderFilesListFile } from "./VCXProjectHeaderFilesListFile";
import { VCXProjectReferencesListFile } from "./VCXProjectReferencesListFile";
import { VCXProjectResourceFilesListFile } from "./VCXProjectResourceFilesListFile";
import { VCXProjectSourceFilesListFile } from "./VCXProjectSourceFilesListFile";

/**
 * C++ Project
 */
export class VCXProjectFile extends IdeFile {

    constructor(public readonly vcxProjectModel: VCXProjectModel) {
        super(vcxProjectModel.absoluteFilePath, vcxProjectModel.rootNamespace);

        this.contextualInformation = [
            ContextualInformationDatum.refreshChildFiles,
            ContextualInformationDatum.removeCSharpProject,
            ContextualInformationDatum.startWithoutDebugging,
            ContextualInformationDatum.startDebugging,
            ContextualInformationDatum.putProjectInSolutionFolder,
        ];

        this.constantChildFiles = [
            new VCXProjectReferencesListFile(this.vcxProjectModel.absoluteFilePath),
            new VCXProjectExternalDependenciesListFile(this.vcxProjectModel.absoluteFilePath),
            new VCXProjectHeaderFilesListFile(this.vcxProjectModel.absoluteFilePath),
            new VCXProjectResourceFilesListFile(this.vcxProjectModel.absoluteFilePath),
            new VCXProjectSourceFilesListFile(this.vcxProjectModel.absoluteFilePath)
        ];
        
        this.isExpanded = vcxProjectModel.initialIsExpandedState;
    }

    public constantChildFiles: any[] | undefined;

    public childFiles: any[] | undefined;

    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }

    public readonly contextualInformation: ContextualInformationDatum[] = [];
}