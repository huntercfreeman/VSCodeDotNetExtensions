/**
 * Each enum member is to read with this template:
 *
 * `Create ${MessageCreateKind}`
 *
 * Example: `Create ${MessageCreateKind.emptyFileInDirectory}`
 *      Outputs: "Create emptyFileInDirectory"
 */
export enum MessageCreateKind {
    emptyFileInDirectory,
    solutionFolderInSolution,
    templatedFileInDirectory,
    projectInSolution,
    projectInSolutionFolder
}