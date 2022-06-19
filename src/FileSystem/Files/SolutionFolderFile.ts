import { IdeFile } from "./IdeFile";
import { CSharpProjectModel } from "../../DotNet/CSharpProjectModel";
import { FileKind } from "../FileKind";
import { ContextualInformationDatum } from "../../ContextMenus/ContextualInformationDatum";
import { SolutionFolderModel } from "../../DotNet/SolutionFolderModel";
import { ProjectKind } from "../../DotNet/ProjectKind";
import { CSharpProjectFile } from "./CSharpProjectFile";

export class SolutionFolderFile extends IdeFile {

    constructor(public readonly solutionFolderModel: SolutionFolderModel) {
        super(solutionFolderModel.absoluteFilePath, "");

        this.fileKind = FileKind.solutionFolder;

        this.virtualChildFiles = solutionFolderModel.solutionFolderEntries
            .map(x => {
                switch (x.projectKind) {
                    case ProjectKind.solutionFolder:
                        return new SolutionFolderFile(x as SolutionFolderModel);
                    case ProjectKind.cSharpProject:
                        return new CSharpProjectFile(x as CSharpProjectModel);
                    default:
                        throw Error(`The projectKind of ${x.projectKind} is not currently supported.`);
                }
            });

        this.contextualInformation = [
        ];
        
        this.isExpanded = solutionFolderModel.initialIsExpandedState;
    }

    public constantChildFiles: any[] | undefined;

    public childFiles: any[] | undefined;

    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }

    public readonly contextualInformation: ContextualInformationDatum[];
}