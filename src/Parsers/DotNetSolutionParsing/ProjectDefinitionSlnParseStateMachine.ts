import { ConstantsSolutionFile } from "../../Constants/ConstantsSolutionFile";
import { TemporaryProjectModel } from "../../DotNet/TemporaryProjectModel";
import { endOfFile } from "../CommonParserUtility";
import { StringReader } from "../StringReader";
import { SlnParseStateMachineBase } from "./SlnParseStateMachineBase";

export class ProjectDefinitionSlnParseStateMachine extends SlnParseStateMachineBase {
    constructor(stringReader: StringReader,
        private readonly temporaryProjectModel: TemporaryProjectModel) {
        super(stringReader);
    }

    public override parse() {
        this.getGuid((character) => this.temporaryProjectModel.projectTypeGuid += character);

        this.getString((character) => this.temporaryProjectModel.displayName += character);

        this.getString((character) => this.temporaryProjectModel.projectRelativePathFromSolution += character);

        this.getGuid((character) => this.temporaryProjectModel.projectIdGuid += character);
    }

    /**
     * The parsing examples use Project Type Guid
     * however this is also used for project id Guid
     */
    private getGuid(assignmentLambda: (character: string) => void): void {
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

            if (currentCharacter === ConstantsSolutionFile.END_OF_GUID_TOKEN) {
                break;
            }

            //                                                        -----
            // 'Microsoft Visual Studio Solution File, Format Version 12.00'
            //                                                        -----
            assignmentLambda(currentCharacter);
        }
    }
    
    /**
     * The parsing examples use Project Display Name
     * however this is also used for project path
     */
    private getString(assignmentLambda: (character: string) => void): void {
        this.stringReader.skipBackwards(1);
        
        let currentCharacter = "";

        // Quote Skip that marked end of project type Guid
        //
        //      -
        // '556}") = "BlazorStudio.Compiler.Tests", '
        //      -
        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            if (currentCharacter === '\"') {
                break;
            }
        }

        if (currentCharacter === '\"') {
            // Quote Skip that marks start of Display Name
            //
            //           -
            // '556}") = "BlazorStudio.Compiler.Tests", '
            //           -
            while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

                if (currentCharacter === '\"') {
                    break;
                }
            }
        }

        // Read in until quote that marks end of Display Name
        //
        //                                       -
        // '556}") = "BlazorStudio.Compiler.Tests", '
        //                                       -
        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            if (currentCharacter === '\"') {
                break;
            }
            
            assignmentLambda(currentCharacter);
        }
    }
}