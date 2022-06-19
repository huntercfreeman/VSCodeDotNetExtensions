import { IdeFile } from "./IdeFile";
import { CSharpProjectModel } from "../../DotNet/CSharpProjectModel";
import { FileKind } from "../FileKind";
import { ContextualInformationDatum } from "../../ContextMenus/ContextualInformationDatum";
import { CSharpProjectDependenciesFile } from "./CSharpProjectDependenciesFile";

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
            new CSharpProjectDependenciesFile(this.cSharpProjectModel.absoluteFilePath),
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