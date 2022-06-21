import { IdeFile } from "./IdeFile";
import { CSharpProjectModel } from "../../DotNet/CSharpProjectModel";
import { FileKind } from "../FileKind";
import { ContextualInformationDatum } from "../../ContextMenus/ContextualInformationDatum";
import { SolutionFolderModel } from "../../DotNet/SolutionFolderModel";
import { ProjectKind } from "../../DotNet/ProjectKind";
import { CSharpProjectFile } from "./CSharp/CSharpProjectFile";
import { VCXProjectFile } from "./CPlusPlus/VCXProjectFile";
import { VCXProjectModel } from "../../DotNet/VCXProjectModel";
import { IProjectFile } from "./IProjectFile";
import { IProjectModel } from "../../DotNet/IProjectModel";

export class SolutionFolderFile extends IdeFile implements IProjectFile {

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
                    case ProjectKind.vcxProject:
                        return new VCXProjectFile(x as VCXProjectModel);
                    default:
                        throw Error(`The projectKind of ${x.projectKind} is not currently supported.`);
                }
            });

        this.contextualInformation = [
        ];
        
        this.isExpanded = solutionFolderModel.initialIsExpandedState;

        this.projectModel = solutionFolderModel;
    }
    
    public constantChildFiles: any[] | undefined;

    public childFiles: any[] | undefined;

    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }

    public projectModel: IProjectModel;

    public readonly contextualInformation: ContextualInformationDatum[];
}