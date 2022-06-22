import { ContextualInformationDatum } from "../../../ContextMenus/ContextualInformationDatum";
import { FSharpProjectModel } from "../../../DotNet/FSharpProjectModel";
import { IProjectModel } from "../../../DotNet/IProjectModel";
import { IdeFile } from "../IdeFile";
import { IProjectFile } from "../IProjectFile";

export class FSharpProjectFile extends IdeFile implements IProjectFile {

    constructor(public readonly fSharpProjectModel: FSharpProjectModel) {
        super(fSharpProjectModel.absoluteFilePath, fSharpProjectModel.rootNamespace);

        this.contextualInformation = [
            ContextualInformationDatum.createNewTemplatedFile,
            ContextualInformationDatum.createNewEmptyFile,
            ContextualInformationDatum.createDirectory,
            ContextualInformationDatum.refreshChildFiles,
            ContextualInformationDatum.removeProject,
            ContextualInformationDatum.startWithoutDebugging,
            ContextualInformationDatum.startDebugging,
            ContextualInformationDatum.putProjectInSolutionFolder,
            ContextualInformationDatum.paste,
        ];

        this.constantChildFiles = [
        ];
        
        this.isExpanded = fSharpProjectModel.initialIsExpandedState;

        this.projectModel = fSharpProjectModel;
    }

    public constantChildFiles: any[] | undefined;

    public childFiles: any[] | undefined;

    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }

    public projectModel: IProjectModel;

    public readonly contextualInformation: ContextualInformationDatum[];
}