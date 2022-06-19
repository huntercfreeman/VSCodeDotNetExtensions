import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { IdeFile } from "../FileSystem/Files/IdeFile";
import { ProjectKind } from "./ProjectKind";

const fs = require('fs');

export interface IProjectModel {
    readonly absoluteFilePath: AbsoluteFilePath;
    childFiles: IdeFile[] | undefined;
    solutionFolderParentProjectIdGuid: string | undefined;
    readonly parentSolutionAbsoluteFilePath: AbsoluteFilePath;
    initialIsExpandedState: boolean;
    projectKind: ProjectKind;
    readonly projectTypeGuid: string,
    readonly displayName: string,
    readonly projectRelativePathFromSolution: string,
    readonly projectIdGuid: string,

    contextualInformation: string;
}