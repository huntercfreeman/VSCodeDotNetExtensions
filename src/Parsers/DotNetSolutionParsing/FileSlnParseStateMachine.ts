import { ConstantsSolutionFile } from "../../Constants/ConstantsSolutionFile";
import { CSharpProjectModel } from "../../DotNet/CSharpProjectModel";
import { SolutionModel } from "../../DotNet/SolutionModel";
import { TemporaryCSharpProjectModel } from "../../DotNet/TemporaryCSharpProjectModel";
import { endOfFile } from "../CommonParserUtility";
import { StringReader } from "../StringReader";
import { FileHeaderSlnParseStateMachine } from "./FileHeaderSlnParseStateMachine";
import { ProjectDefinitionSlnParseStateMachine } from "./ProjectDefinitionSlnParseStateMachine";
import { SlnParseStateMachineBase } from "./SlnParseStateMachineBase";

export class FileSlnParseStateMachine extends SlnParseStateMachineBase {
    constructor(stringReader: StringReader,
        private readonly solutionModel: SolutionModel) {
        super(stringReader);
    }

    public override parseRecursively() {
        let currentCharacter: string = "";

        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {
            if (this.stringReader.isStartOfToken(ConstantsSolutionFile.START_OF_FILE_HEADER_TOKEN,
                currentCharacter)) {
                let fileHeaderSlnParseStateMachine =
                    new FileHeaderSlnParseStateMachine(this.stringReader,
                        this.solutionModel.fileHeader);

                fileHeaderSlnParseStateMachine.parseRecursively();
                break;
            }
            if (this.stringReader.isStartOfToken(ConstantsSolutionFile.START_OF_PROJECT_DEFINITION,
                currentCharacter)) {

                let temporaryCSharpProjectModel = new TemporaryCSharpProjectModel(this.solutionModel,
                    "",
                    "",
                    "",
                    "",
                    "");
                let projectDefinitionSlnParseStateMachine =
                    new ProjectDefinitionSlnParseStateMachine(this.stringReader,
                        temporaryCSharpProjectModel);

                projectDefinitionSlnParseStateMachine.parseRecursively();

                let definedCSharpProjectModel = new CSharpProjectModel(this.solutionModel,
                    temporaryCSharpProjectModel.projectTypeGuid,
                    temporaryCSharpProjectModel.displayName,
                    temporaryCSharpProjectModel.projectRelativePathFromSolution,
                    temporaryCSharpProjectModel.projectIdGuid,
                    null);

                this.solutionModel.projects.push(definedCSharpProjectModel);

                break;
            }
        }
    }
}