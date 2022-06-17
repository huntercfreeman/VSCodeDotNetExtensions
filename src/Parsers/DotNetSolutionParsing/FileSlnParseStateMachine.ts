import { ConstantsSolutionFile } from "../../Constants/ConstantsSolutionFile";
import { CSharpProjectModel } from "../../DotNet/CSharpProjectModel";
import { SolutionModel } from "../../DotNet/SolutionModel";
import { SolutionModelGlobal } from "../../DotNet/SolutionModelGlobal";
import { TemporaryCSharpProjectModel } from "../../DotNet/TemporaryCSharpProjectModel";
import { endOfFile } from "../CommonParserUtility";
import { StringReader } from "../StringReader";
import { FileHeaderSlnParseStateMachine } from "./FileHeaderSlnParseStateMachine";
import { GlobalSlnParseStateMachine } from "./GlobalSlnParseStateMachine";
import { ProjectDefinitionSlnParseStateMachine } from "./ProjectDefinitionSlnParseStateMachine";
import { SlnParseStateMachineBase } from "./SlnParseStateMachineBase";

export class FileSlnParseStateMachine extends SlnParseStateMachineBase {
    constructor(stringReader: StringReader,
        private readonly solutionModel: SolutionModel) {
        super(stringReader);
    }

    public override parse() {
        let currentCharacter: string = "";

        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {
            if (this.stringReader.isStartOfToken(ConstantsSolutionFile.START_OF_FILE_HEADER_TOKEN,
                currentCharacter)) {
                let fileHeaderSlnParseStateMachine =
                    new FileHeaderSlnParseStateMachine(this.stringReader,
                        this.solutionModel.fileHeader);

                fileHeaderSlnParseStateMachine.parse();

                this.stringReader.skipBackwards(1);
            }
            else if (this.stringReader.isStartOfToken(ConstantsSolutionFile.START_OF_PROJECT_DEFINITION,
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

                projectDefinitionSlnParseStateMachine.parse();

                let definedCSharpProjectModel = new CSharpProjectModel(this.solutionModel,
                    temporaryCSharpProjectModel.projectTypeGuid,
                    temporaryCSharpProjectModel.displayName,
                    temporaryCSharpProjectModel.projectRelativePathFromSolution,
                    temporaryCSharpProjectModel.projectIdGuid,
                    null);

                this.solutionModel.projects.push(definedCSharpProjectModel);
            }
            else if (this.stringReader.isStartOfToken(ConstantsSolutionFile.START_OF_GLOBAL,
                currentCharacter)) {

                let globalSlnParseStateMachine =
                    new GlobalSlnParseStateMachine(this.stringReader,
                        this.solutionModel);

                globalSlnParseStateMachine.parse();
            }
        }
    }
}