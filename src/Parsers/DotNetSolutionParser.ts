import { SolutionModel } from "../DotNet/SolutionModel";
import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { SlnParser } from "./DotNetSolutionParsing/SlnParser";
import { StringReader } from "./StringReader";

const fs = require('fs');

export class DotNetSolutionParser {
  constructor(public readonly solutionModel: SolutionModel) {
    this.solutionAbsoluteFilePath = solutionModel.absoluteFilePath;
  }

  public readonly solutionAbsoluteFilePath: AbsoluteFilePath;

  public async parse(callback: any) {
    // The solution file will be parsed by means of reading in the entire file to memory instead of streaming the contents.
    // If one finds solution files to be large enough to necessitate streaming the contents this should be changed.
    // However, solution files are typically RELATIVELY small.
    await fs.readFile(this.solutionModel.absoluteFilePath.initialAbsoluteFilePathStringInput, 'utf8', (err: any, data: any) => {
      if (err) {
        console.error(err);
        return;
      }

      let slnParser = new SlnParser(data,
        this.solutionModel);

      slnParser.parseIntoSolutionModel();

      if (callback) {
        callback();
      }
    });
  }
}


