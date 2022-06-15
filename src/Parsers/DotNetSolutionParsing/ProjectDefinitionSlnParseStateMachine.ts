import { ConstantsSolutionFile } from "../../Constants/ConstantsSolutionFile";
import { ConstantsWhitespace } from "../../Constants/ConstantsWhitespace";
import { TemporaryCSharpProjectModel } from "../../DotNet/TemporaryCSharpProjectModel";
import { endOfFile } from "../CommonParserUtility";
import { StringReader } from "../StringReader";
import { SlnParseStateMachineBase } from "./SlnParseStateMachineBase";

export class ProjectDefinitionSlnParseStateMachine extends SlnParseStateMachineBase {
    constructor(stringReader: StringReader,
        private readonly temporaryCSharpProjectModel: TemporaryCSharpProjectModel) {
        super(stringReader);
    }

    public override parseRecursively() {
        this.getProjectTypeGuid();

        this.getProjectDisplayName();
    }

    private getProjectTypeGuid() {
        let currentCharacter = "";

        // Project Type Guid Skip
        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            if (this.stringReader.isStartOfToken(ConstantsSolutionFile.START_OF_GUID_TOKEN,
                currentCharacter)) {

                //           -
                // 'Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "B'
                //           -
                let _ = this.stringReader.consume(ConstantsSolutionFile.START_OF_GUID_TOKEN.length - 1);

                break;
            }
        }

        // Project Type Guid if unnecessary whitespace
        //            -------------
        // 'Project("{  \t\r\n \n\n9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "B'
        //            -------------
        if (currentCharacter === ' ') {
            for (; ;) {
                if (endOfFile(currentCharacter = this.stringReader.consume(1)) ||
                    currentCharacter !== ' ') {

                    break;
                }
            }

            // Eager consumption instead of peeking results in stringReader being one character too far into text
            this.stringReader.skipBackwards(1);
        }

        // Project Type Guid Read
        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            let whitespaceMatch = ConstantsWhitespace.whitespaceCharacters.find((character) =>
                character === currentCharacter);

            if (whitespaceMatch !== undefined) {
                break;
            }

            //                                                        -----
            // 'Microsoft Visual Studio Solution File, Format Version 12.00'
            //                                                        -----
            this.temporaryCSharpProjectModel.projectTypeGuid += currentCharacter;
        }
    }
    
    private getProjectDisplayName() {
        let currentCharacter = "";

        // Project Type Guid Skip
        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            if (this.stringReader.isStartOfToken(ConstantsSolutionFile.START_OF_GUID_TOKEN,
                currentCharacter)) {

                //           -
                // 'Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "B'
                //           -
                let _ = this.stringReader.consume(ConstantsSolutionFile.START_OF_GUID_TOKEN.length - 1);

                break;
            }
        }

        // Project Type Guid if unnecessary whitespace
        //            -------------
        // 'Project("{  \t\r\n \n\n9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "B'
        //            -------------
        if (currentCharacter === ' ') {
            for (; ;) {
                if (endOfFile(currentCharacter = this.stringReader.consume(1)) ||
                    currentCharacter !== ' ') {

                    break;
                }
            }

            // Eager consumption instead of peeking results in stringReader being one character too far into text
            this.stringReader.skipBackwards(1);
        }

        // Project Type Guid Read
        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            let whitespaceMatch = ConstantsWhitespace.whitespaceCharacters.find((character) =>
                character === currentCharacter);

            if (whitespaceMatch !== undefined) {
                break;
            }

            //                                                        -----
            // 'Microsoft Visual Studio Solution File, Format Version 12.00'
            //                                                        -----
            this.temporaryCSharpProjectModel.projectTypeGuid += currentCharacter;
        }
    }
}