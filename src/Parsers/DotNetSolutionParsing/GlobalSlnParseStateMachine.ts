import { ConstantsSolutionFile } from "../../Constants/ConstantsSolutionFile";
import { ConstantsWhitespace } from "../../Constants/ConstantsWhitespace";
import { SolutionModelGlobal } from "../../DotNet/SolutionModelGlobal";
import { SolutionModelGlobalSection } from "../../DotNet/SolutionModelGlobalSection";
import { endOfFile } from "../CommonParserUtility";
import { StringReader } from "../StringReader";
import { SlnParseStateMachineBase } from "./SlnParseStateMachineBase";

export class GlobalSlnParseStateMachine extends SlnParseStateMachineBase {
    constructor(stringReader: StringReader,
        private readonly solutionModelGlobal: SolutionModelGlobal) {
        super(stringReader);
    }

    public override parseRecursively() {

        let currentCharacter: string = "";

        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {
            if (this.stringReader.isStartOfToken(ConstantsSolutionFile.START_OF_GLOBAL_SECTION,
                currentCharacter)) {

                let _ = this.stringReader.consume(ConstantsSolutionFile.START_OF_GLOBAL_SECTION.length - 1);

                let globalSection = new SolutionModelGlobalSection();

                // Read in GlobalSection's title to know what function to call
                //
                //               -----------------------------
                // GlobalSection(ProjectConfigurationPlatforms) = postSolution
                //               -----------------------------
                while(!endOfFile(currentCharacter = this.stringReader.consume(1))) {
                    
                    if (currentCharacter === ConstantsSolutionFile.END_OF_GLOBAL_SECTION_TITLE) {
                        break;
                    }

                    globalSection.title += currentCharacter;
                }

                switch (globalSection.title) {
                    case ConstantsSolutionFile.GLOBAL_SECTION_TITLE_SOLUTION_CONFIGURATION_PLATFORMS: {
                        this.getSolutionConfigurationPlatforms(globalSection);
                        break;
                    }
                    case ConstantsSolutionFile.GLOBAL_SECTION_TITLE_PROJECT_CONFIGURATION_PLATFORMS: {
                        this.getProjectConfigurationPlatforms(globalSection);
                        break;
                    }
                    case ConstantsSolutionFile.GLOBAL_SECTION_TITLE_SOLUTION_PROPERTIES: {
                        this.getSolutionProperties(globalSection);
                        break;
                    }
                    case ConstantsSolutionFile.GLOBAL_SECTION_TITLE_NESTED_PROJECTS: {
                        this.getNestedProjects(globalSection);
                        break;
                    }
                    case ConstantsSolutionFile.GLOBAL_SECTION_TITLE_EXTENSIBILITY_GOALS: {
                        this.getExtensibilityGoals(globalSection);
                        break;
                    }
                }
            }
        }
    }

    private getSolutionConfigurationPlatforms(globalSection: SolutionModelGlobalSection) {
        let currentCharacter = "";

        // Format Version Skip
        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            if (this.stringReader.isStartOfToken(ConstantsSolutionFile.START_OF_FORMAT_VERSION_TOKEN,
                currentCharacter)) {

                //                                          --------------
                // 'Microsoft Visual Studio Solution File, Format Version 12.00'
                //                                          --------------
                let _ = this.stringReader.consume(ConstantsSolutionFile.START_OF_FORMAT_VERSION_TOKEN.length - 1);

                break;
            }
        }

        // Format Version if unnecessary whitespace
        //                                                        --------
        // 'Microsoft Visual Studio Solution File, Format Version         12.00'
        //                                                        --------
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

        // Format Version Read
        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            let whitespaceMatch = ConstantsWhitespace.whitespaceCharacters.find((character) =>
                character === currentCharacter);

            if (whitespaceMatch !== undefined) {
                break;
            }

            //                                                        -----
            // 'Microsoft Visual Studio Solution File, Format Version 12.00'
            //                                                        -----
            this.solutionModelFileHeader.formatVersion += currentCharacter;
        }
    }
    private getProjectConfigurationPlatforms(globalSection: SolutionModelGlobalSection) {
        let currentCharacter = "";

        // Format Version Skip
        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            if (this.stringReader.isStartOfToken(ConstantsSolutionFile.START_OF_FORMAT_VERSION_TOKEN,
                currentCharacter)) {

                //                                          --------------
                // 'Microsoft Visual Studio Solution File, Format Version 12.00'
                //                                          --------------
                let _ = this.stringReader.consume(ConstantsSolutionFile.START_OF_FORMAT_VERSION_TOKEN.length - 1);

                break;
            }
        }

        // Format Version if unnecessary whitespace
        //                                                        --------
        // 'Microsoft Visual Studio Solution File, Format Version         12.00'
        //                                                        --------
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

        // Format Version Read
        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            let whitespaceMatch = ConstantsWhitespace.whitespaceCharacters.find((character) =>
                character === currentCharacter);

            if (whitespaceMatch !== undefined) {
                break;
            }

            //                                                        -----
            // 'Microsoft Visual Studio Solution File, Format Version 12.00'
            //                                                        -----
            this.solutionModelFileHeader.formatVersion += currentCharacter;
        }
    }
    private getSolutionProperties(globalSection: SolutionModelGlobalSection) {
        let currentCharacter = "";

        // Format Version Skip
        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            if (this.stringReader.isStartOfToken(ConstantsSolutionFile.START_OF_FORMAT_VERSION_TOKEN,
                currentCharacter)) {

                //                                          --------------
                // 'Microsoft Visual Studio Solution File, Format Version 12.00'
                //                                          --------------
                let _ = this.stringReader.consume(ConstantsSolutionFile.START_OF_FORMAT_VERSION_TOKEN.length - 1);

                break;
            }
        }

        // Format Version if unnecessary whitespace
        //                                                        --------
        // 'Microsoft Visual Studio Solution File, Format Version         12.00'
        //                                                        --------
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

        // Format Version Read
        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            let whitespaceMatch = ConstantsWhitespace.whitespaceCharacters.find((character) =>
                character === currentCharacter);

            if (whitespaceMatch !== undefined) {
                break;
            }

            //                                                        -----
            // 'Microsoft Visual Studio Solution File, Format Version 12.00'
            //                                                        -----
            this.solutionModelFileHeader.formatVersion += currentCharacter;
        }
    }
    private getNestedProjects(globalSection: SolutionModelGlobalSection) {
        let currentCharacter = "";

        // Format Version Skip
        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            if (this.stringReader.isStartOfToken(ConstantsSolutionFile.START_OF_FORMAT_VERSION_TOKEN,
                currentCharacter)) {

                //                                          --------------
                // 'Microsoft Visual Studio Solution File, Format Version 12.00'
                //                                          --------------
                let _ = this.stringReader.consume(ConstantsSolutionFile.START_OF_FORMAT_VERSION_TOKEN.length - 1);

                break;
            }
        }

        // Format Version if unnecessary whitespace
        //                                                        --------
        // 'Microsoft Visual Studio Solution File, Format Version         12.00'
        //                                                        --------
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

        // Format Version Read
        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            let whitespaceMatch = ConstantsWhitespace.whitespaceCharacters.find((character) =>
                character === currentCharacter);

            if (whitespaceMatch !== undefined) {
                break;
            }

            //                                                        -----
            // 'Microsoft Visual Studio Solution File, Format Version 12.00'
            //                                                        -----
            this.solutionModelFileHeader.formatVersion += currentCharacter;
        }
    }
    private getExtensibilityGoals(globalSection: SolutionModelGlobalSection) {
        let currentCharacter = "";

        // Format Version Skip
        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            if (this.stringReader.isStartOfToken(ConstantsSolutionFile.START_OF_FORMAT_VERSION_TOKEN,
                currentCharacter)) {

                //                                          --------------
                // 'Microsoft Visual Studio Solution File, Format Version 12.00'
                //                                          --------------
                let _ = this.stringReader.consume(ConstantsSolutionFile.START_OF_FORMAT_VERSION_TOKEN.length - 1);

                break;
            }
        }

        // Format Version if unnecessary whitespace
        //                                                        --------
        // 'Microsoft Visual Studio Solution File, Format Version         12.00'
        //                                                        --------
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

        // Format Version Read
        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            let whitespaceMatch = ConstantsWhitespace.whitespaceCharacters.find((character) =>
                character === currentCharacter);

            if (whitespaceMatch !== undefined) {
                break;
            }

            //                                                        -----
            // 'Microsoft Visual Studio Solution File, Format Version 12.00'
            //                                                        -----
            this.solutionModelFileHeader.formatVersion += currentCharacter;
        }
    }
}