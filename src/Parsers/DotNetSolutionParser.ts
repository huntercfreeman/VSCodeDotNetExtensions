import { ConstantsContextualInformation } from "../Constants/ConstantsContextualInformation";
import { ConstantsSolutionFile } from "../Constants/ConstantsSolutionFile";
import { ConstantsStringReader } from "../Constants/ConstantsStringReader";
import { CSharpProjectModel } from "../DotNet/CSharpProjectModel";
import { SolutionModel } from "../DotNet/SolutionModel";
import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { StringReader } from "./StringReader";

const fs = require('fs');

export class DotNetSolutionParser {
  constructor(public readonly solutionModel: SolutionModel) {
    this.solutionAbsoluteFilePath = solutionModel.absoluteFilePath;
  }

  public readonly solutionAbsoluteFilePath: AbsoluteFilePath;

  private _stringReader!: StringReader;

  public async parse(callback: any) {
    // The solution file will be parsed by means of reading in the entire file to memory instead of streaming the contents.
    // If one finds solution files to be large enough to necessitate streaming the contents this should be changed.
    // However, solution files are typically RELATIVELY small.
    await fs.readFile(this.solutionModel.absoluteFilePath.initialAbsoluteFilePathStringInput, 'utf8', (err: any, data: any) => {
      if (err) {
        console.error(err);
        return;
      }

      this._stringReader = new StringReader(data);

      let currentCharacter = "";

      while ((currentCharacter = this._stringReader.consume(1)) !==
        ConstantsStringReader.END_OF_FILE_MARKER) {

        var handledToken = false;

        if (!handledToken && this._stringReader
            .isStartOfToken(ConstantsSolutionFile.START_OF_PROJECT_DEFINITION, currentCharacter)) {

          handledToken = true;
          this.readInProjectDefinition();
        }
        if (!handledToken && this._stringReader
            .isStartOfToken(ConstantsSolutionFile.START_OF_GLOBAL_SECTION, currentCharacter)) {

          handledToken = true;
          this.readInGlobalSection();
        }
        if (!handledToken && this._stringReader
            .isStartOfToken(ConstantsSolutionFile.START_OF_GLOBAL, currentCharacter)) {

          handledToken = true;
          this.readInGlobalDefinition();
        }
        if (!handledToken && this._stringReader
            .isStartOfToken(ConstantsSolutionFile.START_OF_SOLUTION_PROPERTIES, currentCharacter)) {
              
          handledToken = true;
          this.readInSolutionProperties();
        }
        if (!handledToken && this._stringReader
            .isStartOfToken(ConstantsSolutionFile.START_OF_SOLUTION_FOLDERS, currentCharacter)) {

          handledToken = true;
          this.readInSolutionFolders();
        }
        if (!handledToken && this._stringReader
            .isStartOfToken(ConstantsSolutionFile.START_OF_EXTENSIBILITY_GLOBALS, currentCharacter)) {
              
          handledToken = true;
          this.readInExtensibilityGlobals();
        }
      }

      if (callback) {
        callback();
      }
    });
  }

  public async addSolutionFolder(solutionFolderName: string, callback: any) {
    // TODO: addSolutionFolder function
  }

  public readInProjectDefinition() {
    // In this file dashes are used to mark on the line above and below a comment what INTENDS to be parsed.

    let currentCharacter = "";

    // Skip to start of firstGuid
    //  ---------
    // Project("{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}") = "MyCrudApp", "MyCrudApp\MyCrudApp.csproj", "{8257B361-20EC-4D50-8987-169E8BEC46E4}"
    //  ---------
    while ((currentCharacter = this._stringReader.consume(1)) !==
            ConstantsStringReader.END_OF_FILE_MARKER) {

        if (currentCharacter === ConstantsSolutionFile.START_OF_GUID) {
          break;
        }
    }

    // Read firstGuid
    //           ------------------------------------
    // Project("{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}") = "MyCrudApp", "MyCrudApp\MyCrudApp.csproj", "{8257B361-20EC-4D50-8987-169E8BEC46E4}"
    //           ------------------------------------
    let firstGuid = this.readInGuid();

    // Skip double quote
    //                                                -
    // Project("{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}") = "MyCrudApp", "MyCrudApp\MyCrudApp.csproj", "{8257B361-20EC-4D50-8987-169E8BEC46E4}"
    //                                                -
    while ((currentCharacter = this._stringReader.consume(1)) !==
            ConstantsStringReader.END_OF_FILE_MARKER) {

        if (currentCharacter === '"') {
          break;
        }
    }

    // Skip to start of displayName
    //                                                 -----
    // Project("{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}") = "MyCrudApp", "MyCrudApp\MyCrudApp.csproj", "{8257B361-20EC-4D50-8987-169E8BEC46E4}"
    //                                                 -----
    while ((currentCharacter = this._stringReader.consume(1)) !==
      ConstantsStringReader.END_OF_FILE_MARKER) {
        
        if (currentCharacter === '"') {
          break;
        }
    }

    // Start reading displayName
    //                                                      ---------
    // Project("{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}") = "MyCrudApp", "MyCrudApp\MyCrudApp.csproj", "{8257B361-20EC-4D50-8987-169E8BEC46E4}"
    //                                                      ---------
    let displayName = "";

    // Read text into displayName variable until quote that terminates the Project display name
    while ((currentCharacter = this._stringReader.consume(1)) !==
      ConstantsStringReader.END_OF_FILE_MARKER &&
      currentCharacter !== '"') {
      
        displayName += currentCharacter;
    }

    // Skip to start of project relative path from solution
    //                                                                ---
    // Project("{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}") = "MyCrudApp", "MyCrudApp\MyCrudApp.csproj", "{8257B361-20EC-4D50-8987-169E8BEC46E4}"
    //                                                                ---
    while ((currentCharacter = this._stringReader.consume(1)) !==
      ConstantsStringReader.END_OF_FILE_MARKER) {

        if (currentCharacter === '"') {
          break;
        }
    }

    // Start reading project relative path from solution
    //                                                                   --------------------------
    // Project("{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}") = "MyCrudApp", "MyCrudApp\MyCrudApp.csproj", "{8257B361-20EC-4D50-8987-169E8BEC46E4}"
    //                                                                   --------------------------
    let projectRelativePathFromSolution = "";

    // Read text into projectRelativePathFromSolution variable until quote that terminates the Project relative path from solution
    while ((currentCharacter = this._stringReader.consume(1)) !==
      ConstantsStringReader.END_OF_FILE_MARKER &&
      currentCharacter !== '"') {

      projectRelativePathFromSolution += currentCharacter;
    }

    // Skip to start of secondGuid
    //                                                                                              ----
    // Project("{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}") = "MyCrudApp", "MyCrudApp\MyCrudApp.csproj", "{8257B361-20EC-4D50-8987-169E8BEC46E4}"
    //                                                                                              ----
    while ((currentCharacter = this._stringReader.consume(1)) !==
      ConstantsStringReader.END_OF_FILE_MARKER) {

        if (currentCharacter === ConstantsSolutionFile.START_OF_GUID) {
          break;
        }
    }

    // Read secondGuid
    //                                                                                                  ------------------------------------
    // Project("{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}") = "MyCrudApp", "MyCrudApp\MyCrudApp.csproj", "{8257B361-20EC-4D50-8987-169E8BEC46E4}"
    //                                                                                                  ------------------------------------
    let secondGuid = this.readInGuid();

    let project = new CSharpProjectModel(this.solutionModel,
      firstGuid,
      displayName,
      projectRelativePathFromSolution,
      secondGuid);

    this.solutionModel.projects.push(project);
  }

  public readInGlobalDefinition() {
    return;
  }


  public readInGlobalSection() {
    return;
  }


  public readInSolutionProperties() {
    return;
  }


  public readInSolutionFolders() {
    let currentCharacter: string = "";

    let projectGuid: string | undefined = undefined;
    let solutionFolderGuid: string | undefined = undefined;

    while ((currentCharacter = this._stringReader.consume(1)) !==
      ConstantsStringReader.END_OF_FILE_MARKER) {

      switch (currentCharacter) {
        case ConstantsSolutionFile.START_OF_GUID:
          var guid = this.readInGuid();

          if (!projectGuid) {
            projectGuid = guid;
          }
          else {
            solutionFolderGuid = guid;

            let project = this.solutionModel.projects
              .find(x => x.secondGuid === projectGuid);

            let solutionFolder = this.solutionModel.projects
              .find(x => x.secondGuid === solutionFolderGuid);

            if (project && solutionFolder) {
              solutionFolder.contextualInformation = ConstantsContextualInformation.TREE_VIEW_SOLUTION_FOLDER_CONTEXT;

              project.solutionFolderParentSecondGuid = solutionFolderGuid;

              if (!solutionFolder.solutionFolderEntries) {
                solutionFolder.solutionFolderEntries = [];
              }

              solutionFolder.solutionFolderEntries.push(project);
            }
            else {
              throw new Error("Could not map project to solution folder in solution's .sln file");
            }

            projectGuid = undefined;
            solutionFolderGuid = undefined;
          }
      }
    }
  }

  public readInExtensibilityGlobals() {
    return;
  }

  public readInGuid(): string {
    // Read in a any Guid from a file that starts at current position
    //           ------------------------------------
    // Project("{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}") = "MyCrudApp", "MyCrudApp\MyCrudApp.csproj", "{8257B361-20EC-4D50-8987-169E8BEC46E4}"
    //           ------------------------------------
    let currentCharacter = "";
    let guid = "";

    while ((currentCharacter = this._stringReader.consume(1)) !==
      ConstantsStringReader.END_OF_FILE_MARKER &&
      currentCharacter !== ConstantsSolutionFile.END_OF_GUID) {

      guid += currentCharacter;
    }

    return guid;
  }
}


