import { ConstantsContextualInformation } from "../Constants/ConstantsContextualInformation";
import { ConstantsCSharpProjectFile } from "../Constants/ConstantsCSharpProjectFile";
import { ConstantsSolutionFile } from "../Constants/ConstantsSolutionFile";
import { ConstantsStringReader } from "../Constants/ConstantsStringReader";
import { CSharpProjectModel } from "../DotNet/CSharpProjectModel";
import { SolutionModel } from "../DotNet/SolutionModel";
import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { CSharpProjectNugetPackageDependenciesFile } from "../FileSystem/Files/CSharpProjectNugetPackageDependenciesFile";
import { CSharpProjectProjectReferenceFile } from "../FileSystem/Files/CSharpProjectProjectReferenceFile";
import { CSharpProjectProjectReferencesFile } from "../FileSystem/Files/CSharpProjectProjectReferencesFile";
import { StringReader } from "./StringReader";

const fs = require('fs');

export class CSharpProjectParser {
  constructor(public readonly cSharpProjectAbsoluteFilePath: AbsoluteFilePath,
    public readonly cSharpProjectProjectReferencesFile: CSharpProjectProjectReferencesFile | undefined,
    public readonly cSharpProjectNugetPackageDependenciesFile: CSharpProjectNugetPackageDependenciesFile | undefined) {
  }

  private _stringReader!: StringReader;

  public async parse(callback: any) {
    // The C# Project file will be parsed by means of reading in the entire file to memory instead of streaming the contents.
    // If one finds C# Project files to be large enough to necessitate streaming the contents this should be changed.
    // However, C# Project files are typically RELATIVELY small.
    await fs.readFile(this.cSharpProjectAbsoluteFilePath.initialAbsoluteFilePathStringInput, 'utf8', (err: any, data: any) => {
      if (err) {
        console.error(err);
        return;
      }
      
      this._stringReader = new StringReader(data);

      let currentCharacter = "";

      while ((currentCharacter = this._stringReader.consume(1)) !==
        ConstantsStringReader.END_OF_FILE_MARKER) {

        var handledToken = false;

        if (!handledToken && ConstantsCSharpProjectFile.START_OF_PROJECT_REFERENCE_DEFINITION.startsWith(currentCharacter)) {
          if (ConstantsCSharpProjectFile.START_OF_PROJECT_REFERENCE_DEFINITION.substring(1) ===
            this._stringReader.peek(ConstantsCSharpProjectFile.START_OF_PROJECT_REFERENCE_DEFINITION.length - 1)) {
            handledToken = true;
            this.readInProjectReference();
          }
        }
        if (!handledToken && ConstantsCSharpProjectFile.START_OF_PROJECT_REFERENCE_DEFINITION.startsWith(currentCharacter)) {
          if (ConstantsCSharpProjectFile.START_OF_PROJECT_REFERENCE_DEFINITION.substring(1) ===
            this._stringReader.peek(ConstantsCSharpProjectFile.START_OF_PROJECT_REFERENCE_DEFINITION.length - 1)) {
            handledToken = true;
            this.readInNugetPackageReference();
          }
        }
      }

      callback();
    });
  }
  
  public readInProjectReference() {
    // In this file dashes are used to mark on the line above and below a comment what INTENDS to be parsed.

    /**
     * Example text:
     * 
     *     <ItemGroup>
     *         <ProjectReference Include="..\ClassLibraryStuff\ClassLibraryStuff.csproj" />
     *     </ItemGroup>
     */

    if (!this.cSharpProjectProjectReferencesFile) {
      return;
    }

    let currentCharacter = "";

    while ((currentCharacter = this._stringReader.consume(1)) !==
        ConstantsStringReader.END_OF_FILE_MARKER) {

        if (ConstantsCSharpProjectFile.START_OF_PROJECT_REFERENCE_INCLUDE_DEFINITION.startsWith(currentCharacter)) {
          if (ConstantsCSharpProjectFile.START_OF_PROJECT_REFERENCE_INCLUDE_DEFINITION.substring(1) ===
            this._stringReader.peek(ConstantsCSharpProjectFile.START_OF_PROJECT_REFERENCE_INCLUDE_DEFINITION.length - 1)) {
            
              let _ = this._stringReader.consume(ConstantsCSharpProjectFile.START_OF_PROJECT_REFERENCE_INCLUDE_DEFINITION.length - 1);
              
              let cSharpProjectReferenceRelativePathFromReceivingCSharpProject = "";

              while ((currentCharacter = this._stringReader.consume(1)) !==
                ConstantsStringReader.END_OF_FILE_MARKER) {

                if (ConstantsCSharpProjectFile.END_OF_PROJECT_REFERENCE_INCLUDE_DEFINITION.startsWith(currentCharacter)) {
                  if (ConstantsCSharpProjectFile.END_OF_PROJECT_REFERENCE_INCLUDE_DEFINITION.substring(1) ===
                    this._stringReader.peek(ConstantsCSharpProjectFile.END_OF_PROJECT_REFERENCE_INCLUDE_DEFINITION.length - 1)) {
                    
                      if (!this.cSharpProjectProjectReferencesFile.virtualChildFiles) {
                        this.cSharpProjectProjectReferencesFile.virtualChildFiles = [];
                      }

                      this.cSharpProjectProjectReferencesFile.virtualChildFiles.push(
                        new CSharpProjectProjectReferenceFile(this.cSharpProjectAbsoluteFilePath, 
                          this.cSharpProjectProjectReferencesFile.absoluteFilePath,
                          cSharpProjectReferenceRelativePathFromReceivingCSharpProject));
                      
                      return;
                  }
                  else {
                    cSharpProjectReferenceRelativePathFromReceivingCSharpProject += currentCharacter;
                  }
                }
                else {
                  cSharpProjectReferenceRelativePathFromReceivingCSharpProject += currentCharacter;
                }
              }
          }
        }
      }
  }
  
  public readInNugetPackageReference() {
    // In this file dashes are used to mark on the line above and below a comment what INTENDS to be parsed.

    /**
     * Example text:
     * 
     *     <ItemGroup>
     *         <PackageReference Include="Fluxor" Version="5.4.0" />
     *     </ItemGroup>
     */

    if (!this.cSharpProjectNugetPackageDependenciesFile) {
      return;
    }

    let currentCharacter = "";

    while ((currentCharacter = this._stringReader.consume(1)) !==
        ConstantsStringReader.END_OF_FILE_MARKER) {

        if (ConstantsCSharpProjectFile.START_OF_PROJECT_REFERENCE_INCLUDE_DEFINITION.startsWith(currentCharacter)) {
          if (ConstantsCSharpProjectFile.START_OF_PROJECT_REFERENCE_INCLUDE_DEFINITION.substring(1) ===
            this._stringReader.peek(ConstantsCSharpProjectFile.START_OF_PROJECT_REFERENCE_INCLUDE_DEFINITION.length - 1)) {
            
              let _ = this._stringReader.consume(ConstantsCSharpProjectFile.START_OF_PROJECT_REFERENCE_INCLUDE_DEFINITION.length - 1);
              
              let cSharpProjectReferenceRelativePathFromReceivingCSharpProject = "";

              while ((currentCharacter = this._stringReader.consume(1)) !==
                ConstantsStringReader.END_OF_FILE_MARKER) {

                if (ConstantsCSharpProjectFile.END_OF_PROJECT_REFERENCE_INCLUDE_DEFINITION.startsWith(currentCharacter)) {
                  if (ConstantsCSharpProjectFile.END_OF_PROJECT_REFERENCE_INCLUDE_DEFINITION.substring(1) ===
                    this._stringReader.peek(ConstantsCSharpProjectFile.END_OF_PROJECT_REFERENCE_INCLUDE_DEFINITION.length - 1)) {
                    
                      if (!this.cSharpProjectNugetPackageDependenciesFile.virtualChildFiles) {
                        this.cSharpProjectNugetPackageDependenciesFile.virtualChildFiles = [];
                      }

                      // this.cSharpProjectProjectReferencesFile.virtualChildFiles.push(
                      //   new CSharpProjectProjectReferenceFile(this.cSharpProjectAbsoluteFilePath, 
                      //     this.cSharpProjectProjectReferencesFile.absoluteFilePath,
                      //     cSharpProjectReferenceRelativePathFromReceivingCSharpProject));
                      
                      return;
                  }
                  else {
                    cSharpProjectReferenceRelativePathFromReceivingCSharpProject += currentCharacter;
                  }
                }
                else {
                  cSharpProjectReferenceRelativePathFromReceivingCSharpProject += currentCharacter;
                }
              }
          }
        }
      }
  }

  public readInGuid(): string {
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


