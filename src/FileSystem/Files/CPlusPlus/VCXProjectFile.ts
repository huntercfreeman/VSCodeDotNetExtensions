import { ContextualInformationDatum } from "../../../ContextMenus/ContextualInformationDatum";
import { IProjectModel } from "../../../DotNet/IProjectModel";
import { VCXProjectModel } from "../../../DotNet/VCXProjectModel";
import { IdeFile } from "../IdeFile";
import { IProjectFile } from "../IProjectFile";
import { VCXProjectExternalDependenciesListFile } from "./VCXProjectExternalDependenciesListFile";
import { VCXProjectReferencesListFile } from "./VCXProjectReferencesListFile";

/**
 * C++ Project
 */
export class VCXProjectFile extends IdeFile implements IProjectFile {

    constructor(public readonly vcxProjectModel: VCXProjectModel) {
        super(vcxProjectModel.absoluteFilePath, vcxProjectModel.rootNamespace);

        this.contextualInformation = [
            ContextualInformationDatum.refreshChildFiles,
            ContextualInformationDatum.putProjectInSolutionFolder,
        ];

        this.constantChildFiles = [
            new VCXProjectReferencesListFile(this.vcxProjectModel.absoluteFilePath),
            new VCXProjectExternalDependenciesListFile(this.vcxProjectModel.absoluteFilePath),
        ];
        
        this.isExpanded = vcxProjectModel.initialIsExpandedState;

        this.projectModel = vcxProjectModel;
    }

    public constantChildFiles: any[] | undefined;

    public childFiles: any[] | undefined;

    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }

    public projectModel: IProjectModel;

    public readonly contextualInformation: ContextualInformationDatum[] = [];
}