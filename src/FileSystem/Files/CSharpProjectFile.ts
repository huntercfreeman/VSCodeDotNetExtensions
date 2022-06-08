import { ConstantsContextualInformation } from "../../Constants/ConstantsContextualInformation";
import { AbsoluteFilePath } from "../AbsoluteFilePath";
import { IdeFile } from "./IdeFile";
import { CSharpProjectModel } from "../../DotNet/CSharpProjectModel";
import { FileKind } from "../FileKind";

export class CSharpProjectFile extends IdeFile {

    constructor(public readonly cSharpProjectModel: CSharpProjectModel) {
        super(cSharpProjectModel.absoluteFilePath, "");

        if(cSharpProjectModel.solutionFolderEntries !== undefined) {
            this.fileKind = FileKind.solutionFolder;

            this.virtualChildFiles = cSharpProjectModel.solutionFolderEntries
                .map(x => new CSharpProjectFile(x));
        }
    }
    


    public childFiles: any[] | undefined;
    
    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }

    public readonly contextualInformation: string = ConstantsContextualInformation.TREE_VIEW_DEFAULT_FILE_CONTEXT;
    
}