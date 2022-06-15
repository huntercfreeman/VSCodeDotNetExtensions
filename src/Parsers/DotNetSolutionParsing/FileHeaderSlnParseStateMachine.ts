import { ConstantsSolutionFile } from "../../Constants/ConstantsSolutionFile";
import { ConstantsWhitespace } from "../../Constants/ConstantsWhitespace";
import { SolutionModelFileHeader } from "../../DotNet/SolutionModelFileHeader";
import { endOfFile } from "../CommonParserUtility";
import { StringReader } from "../StringReader";
import { SlnParseStateMachineBase } from "./SlnParseStateMachineBase";

export class FileHeaderSlnParseStateMachine extends SlnParseStateMachineBase {
    constructor(stringReader: StringReader,
        private readonly solutionModelFileHeader: SolutionModelFileHeader) {
        super(stringReader);
    }

    public override parseRecursively() {
        this.getFormatVersion();

        this.getHashTagVisualStudioVersion();

        this.getVisualStudioVersion();

        this.getMinimumVisualStudioVersion();
    }

    private getFormatVersion() {
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

    private getHashTagVisualStudioVersion() {
        let currentCharacter = "";

        // # Visual Studio Version Skip
        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            if (this.stringReader.isStartOfToken(ConstantsSolutionFile.START_OF_HASH_TAG_VISUAL_STUDIO_VERSION_TOKEN,
                currentCharacter)) {

                //  ------------------------
                // '# Visual Studio Version 17'
                //  ------------------------
                let _ = this.stringReader.consume(ConstantsSolutionFile.START_OF_HASH_TAG_VISUAL_STUDIO_VERSION_TOKEN.length - 1);

                break;
            }
        }

        // # Visual Studio Version if unnecessary whitespace
        //                          -----
        // '# Visual Studio Version      17'
        //                          -----
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

        // # Visual Studio Version Read
        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            let whitespaceMatch = ConstantsWhitespace.whitespaceCharacters.find((character) =>
                character === currentCharacter);

            if (whitespaceMatch !== undefined) {
                break;
            }

            //                          --
            // '# Visual Studio Version 17'
            //                          --
            this.solutionModelFileHeader.hashTagVisualStudioVersion += currentCharacter;
        }
    }

    private getVisualStudioVersion() {
        let currentCharacter = "";

        // VisualStudioVersion Skip
        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            if (this.stringReader.isStartOfToken(ConstantsSolutionFile.START_OF_VISUAL_STUDIO_VERSION_TOKEN,
                currentCharacter)) {

                //  ----------------------
                // 'VisualStudioVersion = 17.0.31912.275'
                //  ----------------------
                let _ = this.stringReader.consume(ConstantsSolutionFile.START_OF_VISUAL_STUDIO_VERSION_TOKEN.length - 1);

                break;
            }
        }

        // VisualStudioVersion if unnecessary whitespace
        //                        ---------
        // 'VisualStudioVersion =    \n \n 17.0.31912.275'
        //                        ---------
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

        // VisualStudioVersion Read
        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            let whitespaceMatch = ConstantsWhitespace.whitespaceCharacters.find((character) =>
                character === currentCharacter);

            if (whitespaceMatch !== undefined) {
                break;
            }

            //                        --------------
            // 'VisualStudioVersion = 17.0.31912.275'
            //                        --------------
            this.solutionModelFileHeader.visualStudioVersion += currentCharacter;
        }
    }

    private getMinimumVisualStudioVersion() {
        let currentCharacter = "";

        // MinimumVisualStudioVersion Skip
        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            if (this.stringReader.isStartOfToken(ConstantsSolutionFile.START_OF_MINIMUM_VISUAL_STUDIO_VERSION_TOKEN,
                currentCharacter)) {

                //  -----------------------------
                // 'MinimumVisualStudioVersion = 10.0.40219.1'
                //  -----------------------------
                let _ = this.stringReader.consume(ConstantsSolutionFile.START_OF_MINIMUM_VISUAL_STUDIO_VERSION_TOKEN.length - 1);

                break;
            }
        }

        // MinimumVisualStudioVersion if unnecessary whitespace
        //                               -----------------
        // 'MinimumVisualStudioVersion =   \t\t \r\n      10.0.40219.1'
        //                               -----------------
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

        // MinimumVisualStudioVersion Read
        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            let whitespaceMatch = ConstantsWhitespace.whitespaceCharacters.find((character) =>
                character === currentCharacter);

            if (whitespaceMatch !== undefined) {
                break;
            }

            //                        --------------
            // 'VisualStudioVersion = 17.0.31912.275'
            //                        --------------
            this.solutionModelFileHeader.minimumVisualStudioVersion += currentCharacter;
        }
    }
}