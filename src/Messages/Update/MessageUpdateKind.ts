export enum MessageUpdateKind {
    existingProjectIntoSolution,
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