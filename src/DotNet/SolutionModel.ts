import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { DotNetSolutionParser } from "../Parsers/DotNetSolutionParser";
import { CSharpProjectModel } from "./CSharpProjectModel";

export class SolutionModel {
    constructor(public readonly absoluteFilePath: AbsoluteFilePath) {
        var dotNetSolutionParser: DotNetSolutionParser = new DotNetSolutionParser(absoluteFilePath,
            this);
    }

    public readonly projects: CSharpProjectModel[] = [];
}