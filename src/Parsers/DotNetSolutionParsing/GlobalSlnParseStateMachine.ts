import { ConstantsSolutionFile } from "../../Constants/ConstantsSolutionFile";
import { ConstantsWhitespace } from "../../Constants/ConstantsWhitespace";
import { ExtensibilityGlobals } from "../../DotNet/ExtensibilityGlobals";
import { ProjectConfigurationPlatforms } from "../../DotNet/ProjectConfigurationPlatforms";
import { SolutionConfigurationPlatforms } from "../../DotNet/SolutionConfigurationPlatforms";
import { SolutionModel } from "../../DotNet/SolutionModel";
import { SolutionModelGlobal } from "../../DotNet/SolutionModelGlobal";
import { SolutionModelGlobalSection } from "../../DotNet/SolutionModelGlobalSection";
import { SolutionProperties } from "../../DotNet/SolutionProperties";
import { endOfFile } from "../CommonParserUtility";
import { StringReader } from "../StringReader";
import { SlnParseStateMachineBase } from "./SlnParseStateMachineBase";

export class GlobalSlnParseStateMachine extends SlnParseStateMachineBase {
    constructor(stringReader: StringReader,
        private readonly solutionModel: SolutionModel) {
        super(stringReader);
    }

    public override parseRecursively() {

        let currentCharacter: string = "";

        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {
            if (this.stringReader.isStartOfToken(ConstantsSolutionFile.START_OF_GLOBAL_SECTION_ITSELF,
                currentCharacter)) {

                let _ = this.stringReader.consume(ConstantsSolutionFile.START_OF_GLOBAL_SECTION_ITSELF.length - 1);

                let globalSection = new SolutionModelGlobalSection();

                this.solutionModel.global.globalSections.push(globalSection);

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
        // TODO: Parse solutionConfigurationPlatforms
        globalSection.solutionConfigurationPlatforms = new SolutionConfigurationPlatforms();
    }

    private getProjectConfigurationPlatforms(globalSection: SolutionModelGlobalSection) {
        // TODO: Parse projectConfigurationPlatforms
        globalSection.projectConfigurationPlatforms = new ProjectConfigurationPlatforms();
    }

    private getSolutionProperties(globalSection: SolutionModelGlobalSection) {
        // TODO: Parse solutionProperties
        globalSection.solutionProperties = new SolutionProperties();
    }

    private getNestedProjects(globalSection: SolutionModelGlobalSection) {
        let currentCharacter = "";

        let idGuidLeftChild = "";
        let idGuidRightParent = "";

        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {
            if (this.stringReader.isStartOfToken(ConstantsSolutionFile.END_OF_GLOBAL_SECTION_ITSELF,
                currentCharacter)) {
                    break;
            }
            if (this.stringReader.isStartOfToken(ConstantsSolutionFile.START_OF_GUID_TOKEN,
                currentCharacter)) {

                    if (!idGuidLeftChild) {
                        this.getGuid((character) => idGuidLeftChild += character);
                    }
                    else {
                        this.getGuid((character) => idGuidRightParent += character);

                        let child = this.solutionModel.projects.find(project =>
                            project.projectIdGuid === idGuidLeftChild);
                        
                        if (!child) {
                            continue;
                        }

                        let parent = this.solutionModel.projects.find(project =>
                            project.projectIdGuid === idGuidRightParent);

                        if (!parent) {
                            continue;
                        }

                        if (!parent.solutionFolderEntries) {
                            parent.solutionFolderEntries = [];
                        }

                        parent.solutionFolderEntries.push(child);

                        idGuidLeftChild = "";
                        idGuidRightParent = "";
                    }
            }
        }
    }

    private getExtensibilityGoals(globalSection: SolutionModelGlobalSection) {
        // TODO: Parse extensibilityGlobals
        globalSection.extensibilityGlobals = new ExtensibilityGlobals();
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
}