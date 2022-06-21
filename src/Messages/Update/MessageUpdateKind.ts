export enum MessageUpdateKind {
    existingCSharpProjectIntoSolution,
    addProjectReference,
    removeProjectReference,
    addNugetPackageReference,
    removeNugetPackageReference,
    removeProject,
    putProjectInSolutionFolder,
    pasteIntoAny,
    renameAny,
    copyAny,
    cutAny
}