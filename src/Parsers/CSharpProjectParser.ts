import { ConstantsCSharpProjectFile } from "../Constants/ConstantsCSharpProjectFile";
import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { CSharpProjectNugetPackageDependenciesFile } from "../FileSystem/Files/CSharpProjectNugetPackageDependenciesFile";
import { CSharpProjectNugetPackageDependencyFile } from "../FileSystem/Files/CSharpProjectNugetPackageDependencyFile";
import { CSharpProjectProjectReferenceFile } from "../FileSystem/Files/CSharpProjectProjectReferenceFile";
import { CSharpProjectProjectReferencesFile } from "../FileSystem/Files/CSharpProjectProjectReferencesFile";
import { XmlParser, XmlTagModel } from "./XmlParseStateMachines";

const fs = require('fs');

export class CSharpProjectParser {
  constructor(public readonly cSharpProjectAbsoluteFilePath: AbsoluteFilePath,
    public readonly cSharpProjectProjectReferencesFile: CSharpProjectProjectReferencesFile | undefined,
    public readonly cSharpProjectNugetPackageDependenciesFile: CSharpProjectNugetPackageDependenciesFile | undefined) {
  }

  public async parse(callback: any) {
    // The C# Project file will be parsed by means of reading in the entire file to memory instead of streaming the contents.
    // If one finds C# Project files to be large enough to necessitate streaming the contents this should be changed.
    // However, C# Project files are typically RELATIVELY small.
    await fs.readFile(this.cSharpProjectAbsoluteFilePath.initialAbsoluteFilePathStringInput, 'utf8', (err: any, data: any) => {
      if (err) {
        console.error(err);
        return;
      }

      let xmlParser: XmlParser = new XmlParser(data);

      let xmlFileModel = xmlParser.parse();

      // Only either cSharpProjectProjectReferencesFile can be calculated or 
      // cSharpProjectProjectReferencesFile can be returned at a given time as
      // the user interface that calls this method does not have a reference to both arrays.

      if (this.cSharpProjectProjectReferencesFile) {
        let projectReferences: XmlTagModel[] = [];

        xmlFileModel.selectRecursively(
          (x) => x.tagName === ConstantsCSharpProjectFile.PROJECT_REFERENCE_TAG_NAME,
          projectReferences);

        for (let i = 0; i < projectReferences.length; i++) {
          let reference = projectReferences[i];

          let includeAttribute = reference.xmlAttributeModels.find(attribute =>
            attribute.attributeName === ConstantsCSharpProjectFile.XML_INCLUDE_ATTRIBUTE_NAME);

          if (includeAttribute) {
            if (!this.cSharpProjectProjectReferencesFile.virtualChildFiles) {
              this.cSharpProjectProjectReferencesFile.virtualChildFiles = [];
            }

            this.cSharpProjectProjectReferencesFile.virtualChildFiles.push(
              new CSharpProjectProjectReferenceFile(this.cSharpProjectAbsoluteFilePath,
                this.cSharpProjectProjectReferencesFile.absoluteFilePath, includeAttribute.attributeValue));
          }
        }
      }
      
      if (this.cSharpProjectNugetPackageDependenciesFile) {
        let nugetPackageReferences: XmlTagModel[] = [];

      xmlFileModel.selectRecursively(
        (x) => x.tagName === ConstantsCSharpProjectFile.NUGET_PACKAGE_TAG_NAME,
        nugetPackageReferences);

        for (let i = 0; i < nugetPackageReferences.length; i++) {
          let reference = nugetPackageReferences[i];

          let includeAttribute = reference.xmlAttributeModels.find(attribute =>
            attribute.attributeName === ConstantsCSharpProjectFile.XML_INCLUDE_ATTRIBUTE_NAME);
          
          let versionAttribute = reference.xmlAttributeModels.find(attribute =>
            attribute.attributeName === ConstantsCSharpProjectFile.XML_VERSION_ATTRIBUTE_NAME);

          if (includeAttribute && versionAttribute) {
            if (!this.cSharpProjectNugetPackageDependenciesFile.virtualChildFiles) {
              this.cSharpProjectNugetPackageDependenciesFile.virtualChildFiles = [];
            }
      
            this.cSharpProjectNugetPackageDependenciesFile.virtualChildFiles.push(
              new CSharpProjectNugetPackageDependencyFile(this.cSharpProjectAbsoluteFilePath,
                this.cSharpProjectNugetPackageDependenciesFile.absoluteFilePath,
                includeAttribute.attributeValue,
                versionAttribute.attributeValue));
          }
        }
      }

      callback();
    });
  }
}


