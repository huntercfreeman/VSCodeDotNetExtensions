import { ConstantsContextualInformation } from "../../Constants/ConstantsContextualInformation";
import { AbsoluteFilePath } from "../AbsoluteFilePath";
import { IdeFile } from "./IdeFile";
import { CSharpProjectModel } from "../../DotNet/CSharpProjectModel";
import { FileKind } from "../FileKind";
import { ContextualInformationDatum } from "../../ContextMenus/ContextualInformationDatum";

export class CSharpProjectFile extends IdeFile {

    constructor(public readonly cSharpProjectModel: CSharpProjectModel) {
        super(cSharpProjectModel.absoluteFilePath, cSharpProjectModel.displayName);

        if(cSharpProjectModel.solutionFolderEntries !== undefined) {
            this.fileKind = FileKind.solutionFolder;

            this.virtualChildFiles = cSharpProjectModel.solutionFolderEntries
                .map(x => new CSharpProjectFile(x));
            
            this.contextualInformation = [];
        }
        else {
            this.contextualInformation = [
                ContextualInformationDatum.createNewTemplatedFile,
                ContextualInformationDatum.createNewEmptyFile,
                ContextualInformationDatum.createDirectory,
                ContextualInformationDatum.refreshChildFiles,
                ContextualInformationDatum.startWithoutDebugging
            ];
        }
    }
    
    public childFiles: any[] | undefined;
    
    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }

    public readonly contextualInformation: ContextualInformationDatum[];
}