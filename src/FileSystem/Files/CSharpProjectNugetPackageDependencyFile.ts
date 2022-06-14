import { ContextualInformationDatum } from "../../ContextMenus/ContextualInformationDatum";
import { AbsoluteFilePath } from "../AbsoluteFilePath";
import { FileKind } from "../FileKind";
import { IdeFile } from "./IdeFile";

export class CSharpProjectNugetPackageDependencyFile extends IdeFile {
    constructor(cSharpProjectParentAbsoluteFilePath: AbsoluteFilePath,
        nugetPackageDependenciesParentAbsoluteFilePath: AbsoluteFilePath,
        public readonly nugetPackageId: string,
        public readonly nugetPackageVersion: string) {

        let myAbsoluteFilePath = new AbsoluteFilePath(`${nugetPackageId}--${nugetPackageVersion}`,
            false,
            nugetPackageDependenciesParentAbsoluteFilePath.parentDirectories);

        super(myAbsoluteFilePath, "");

        this.fileKind = FileKind.nugetPackageDependency;

        this.parentCSharpProjectInitialAbsoluteFilePath = cSharpProjectParentAbsoluteFilePath;
    }

    public setVirtualChildFiles(siblingFiles: IdeFile[]): void {
        return;
    }

    public childFiles: any[] | undefined;

    public parentCSharpProjectInitialAbsoluteFilePath: AbsoluteFilePath;

    public hideExpansionChevronWhenNoChildFiles: boolean = true;

    public readonly contextualInformation: ContextualInformationDatum[] = [
        ContextualInformationDatum.removeNugetPackageReference
    ];
}