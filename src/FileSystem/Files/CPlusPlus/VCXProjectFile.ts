import { ContextualInformationDatum } from "../../../ContextMenus/ContextualInformationDatum";
import { VCXProjectModel } from "../../../DotNet/VCXProjectModel";
import { IdeFile } from "../IdeFile";

/**
 * C++ Project
 */
export class VCXProjectFile extends IdeFile {

    constructor(public readonly vcxProjectModel: VCXProjectModel) {
        super(vcxProjectModel.absoluteFilePath, vcxProjectModel.rootNamespace);

        this.contextualInformation = [
        ];

        this.constantChildFiles = [
        ];
        
        this.isExpanded = vcxProjectModel.initialIsExpandedState;
    }

    public constantChildFiles: any[] | undefined;

    public childFiles: any[] | undefined;

    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }

    public readonly contextualInformation: ContextualInformationDatum[];
}