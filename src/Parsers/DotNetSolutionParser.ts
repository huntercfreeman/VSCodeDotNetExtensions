import { SolutionModel } from "../DotNet/SolutionModel";
import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
const fs = require('fs');

export class DotNetSolutionParser {
    constructor(public readonly absoluteFilePath: AbsoluteFilePath,
        public readonly solutionModel: SolutionModel) {
    }

    public async parse() {
        await fs.readFile(this.solutionModel.absoluteFilePath.initialAbsoluteFilePathStringInput, 'utf8', (err: any, data: any) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(data);
          });        
    }
}