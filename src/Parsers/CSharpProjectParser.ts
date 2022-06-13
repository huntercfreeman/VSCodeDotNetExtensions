import { ConstantsContextualInformation } from "../Constants/ConstantsContextualInformation";
import { ConstantsCSharpProjectFile } from "../Constants/ConstantsCSharpProjectFile";
import { ConstantsSolutionFile } from "../Constants/ConstantsSolutionFile";
import { ConstantsStringReader } from "../Constants/ConstantsStringReader";
import { CSharpProjectModel } from "../DotNet/CSharpProjectModel";
import { SolutionModel } from "../DotNet/SolutionModel";
import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { CSharpProjectNugetPackageDependenciesFile } from "../FileSystem/Files/CSharpProjectNugetPackageDependenciesFile";
import { CSharpProjectNugetPackageDependencyFile } from "../FileSystem/Files/CSharpProjectNugetPackageDependencyFile";
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

        if (!handledToken && this._stringReader
          .isStartOfToken(ConstantsCSharpProjectFile.START_OF_PROJECT_REFERENCE_DEFINITION, currentCharacter)) {

          handledToken = true;
          this.readInProjectReference();
        }
        if (!handledToken && this._stringReader
          .isStartOfToken(ConstantsCSharpProjectFile.START_OF_NUGET_PACKAGE_REFERENCE_DEFINITION, currentCharacter)) {

          handledToken = true;
          this.readInNugetPackageReference();
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

      if (this._stringReader
        .isStartOfToken(ConstantsCSharpProjectFile.START_OF_PROJECT_REFERENCE_INCLUDE_DEFINITION, currentCharacter)) {

        let _ = this._stringReader.consume(ConstantsCSharpProjectFile.START_OF_PROJECT_REFERENCE_INCLUDE_DEFINITION.length - 1);

        let cSharpProjectReferenceRelativePathFromReceivingCSharpProject = "";

        while ((currentCharacter = this._stringReader.consume(1)) !==
          ConstantsStringReader.END_OF_FILE_MARKER) {

          if (this._stringReader
            .isStartOfToken(ConstantsCSharpProjectFile.END_OF_PROJECT_REFERENCE_INCLUDE_DEFINITION, currentCharacter)) {

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

    let _ = this._stringReader.consume(ConstantsCSharpProjectFile.START_OF_NUGET_PACKAGE_REFERENCE_DEFINITION.length - 1);

    let currentCharacter = "";
    let nugetPackageId = "";
    let nugetPackageVersion = "";

    // Skip to start of nuget package Id
    while ((currentCharacter = this._stringReader.consume(1)) !==
      ConstantsStringReader.END_OF_FILE_MARKER) {

      if (this._stringReader
        .isStartOfToken(ConstantsCSharpProjectFile.START_OF_NUGET_PACKAGE_REFERENCE_INCLUDE_DEFINITION, currentCharacter)) {

        break;
      }
    }

    _ = this._stringReader.consume(ConstantsCSharpProjectFile.START_OF_NUGET_PACKAGE_REFERENCE_INCLUDE_DEFINITION.length - 1);

    // Read in nuget package Id
    while ((currentCharacter = this._stringReader.consume(1)) !==
      ConstantsStringReader.END_OF_FILE_MARKER) {
      if (this._stringReader
        .isStartOfToken(ConstantsCSharpProjectFile.END_OF_NUGET_PACKAGE_REFERENCE_INCLUDE_DEFINITION, currentCharacter)) {

        break;
      }
      else {
        nugetPackageId += currentCharacter;
      }
    }

    // Skip to start of nuget package Version
    while ((currentCharacter = this._stringReader.consume(1)) !==
      ConstantsStringReader.END_OF_FILE_MARKER) {

      if (this._stringReader
        .isStartOfToken(ConstantsCSharpProjectFile.START_OF_NUGET_PACKAGE_REFERENCE_VERSION_DEFINITION, currentCharacter)) {

        break;
      }
    }

    _ = this._stringReader.consume(ConstantsCSharpProjectFile.START_OF_NUGET_PACKAGE_REFERENCE_VERSION_DEFINITION.length - 1);

    // Read in nuget package Version
    while ((currentCharacter = this._stringReader.consume(1)) !==
      ConstantsStringReader.END_OF_FILE_MARKER) {

      if (this._stringReader
        .isStartOfToken(ConstantsCSharpProjectFile.END_OF_NUGET_PACKAGE_REFERENCE_VERSION_DEFINITION, currentCharacter)) {

        break;
      }
      else {
        nugetPackageVersion += currentCharacter;
      }
    }

    // done with nuget package
    if (!this.cSharpProjectNugetPackageDependenciesFile.virtualChildFiles) {
      this.cSharpProjectNugetPackageDependenciesFile.virtualChildFiles = [];
    }

    this.cSharpProjectNugetPackageDependenciesFile.virtualChildFiles.push(
      new CSharpProjectNugetPackageDependencyFile(this.cSharpProjectAbsoluteFilePath,
        this.cSharpProjectNugetPackageDependenciesFile.absoluteFilePath,
        nugetPackageId,
        nugetPackageVersion));

    return;
  }
}


