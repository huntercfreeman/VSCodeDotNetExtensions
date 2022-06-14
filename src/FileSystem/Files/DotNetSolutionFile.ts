import { IdeFile } from "./IdeFile";
import { SolutionModel } from "../../DotNet/SolutionModel";
import { ContextualInformationDatum } from "../../ContextMenus/ContextualInformationDatum";

export class DotNetSolutionFile extends IdeFile {

    constructor(public readonly solutionModel: SolutionModel) {
        super(solutionModel.absoluteFilePath, "");
    }

    public childFiles: any[] | undefined;

    public hideExpansionChevronWhenNoChildFiles: boolean = true;

    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }

    public readonly contextualInformation: ContextualInformationDatum[] = [
        ContextualInformationDatum.createNewCSharpProject,
        ContextualInformationDatum.addExistingCSharpProject,
        // ContextualInformationDatum.createSolutionFolder,
        ContextualInformationDatum.refreshChildFiles,
    ];
}