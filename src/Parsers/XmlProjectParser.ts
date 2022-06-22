import { ConstantsProjectFile } from "../Constants/ConstantsProjectFile";
import { IProjectModel } from "../DotNet/IProjectModel";
import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { ProjectNugetPackageDependenciesListFile } from "../FileSystem/Files/Nuget/ProjectNugetPackageDependenciesListFile";
import { ProjectNugetPackageDependencyFile } from "../FileSystem/Files/Nuget/ProjectNugetPackageDependencyFile";
import { ProjectToProjectReferenceFile } from "../FileSystem/Files/ProjectReference/ProjectToProjectReferenceFile";
import { ProjectToProjectReferencesListFile } from "../FileSystem/Files/ProjectReference/ProjectToProjectReferencesListFile";
import { XmlParser, XmlTagModel } from "./XmlParseStateMachines";

const fs = require('fs');

export class XmlProjectParser {
  constructor(public readonly xmlProjectAbsoluteFilePath: AbsoluteFilePath | undefined,
    public readonly xmlProjectToProjectReferencesFile: ProjectToProjectReferencesListFile | undefined,
    public readonly xmlProjectNugetPackageDependenciesFile: ProjectNugetPackageDependenciesListFile | undefined,
    public readonly xmlProjectModel: IProjectModel | undefined) {
  }

  public async parse(callback: any) {
    // The .sln Project files will be parsed by means of reading in the entire file to memory instead of streaming the contents.
    // If one finds Project files to be large enough to necessitate streaming the contents this should be changed.
    let absoluteFilePathString = this.xmlProjectAbsoluteFilePath?.initialAbsoluteFilePathStringInput ??
      this.xmlProjectModel?.absoluteFilePath?.initialAbsoluteFilePathStringInput;

    await fs.readFile(absoluteFilePathString, 'utf8', (err: any, data: any) => {
      if (err) {
        console.error(err);

        if (callback) {
          callback();
        }

        return;
      }

      let xmlParser: XmlParser = new XmlParser(data);

      let xmlFileModel = xmlParser.parse();

      if (this.xmlProjectModel) {

        // The UI does not have access to the projectModel
        // however, they do have access to the absolutepath of it
        // and therefore can parse the C# project.
        // however this conditional branch does not apply for the
        // User Interface Tree View Context Menu Options

        // Get <TargetFramework>...</TargetFramework>
        let targetFramework: XmlTagModel[] = [];

        xmlFileModel.selectRecursively(
          (x) => x.tagName === ConstantsProjectFile.TARGET_FRAMEWORK_TAG_NAME,
          targetFramework);

        if (targetFramework.length !== 0) {
          // There should not be more than 1 root namespace defined in the .csproj file
          // if there is take the first root namespace that is defined.
          let reference = targetFramework[0];

          let targetFrameworkString = "";

          for (let i = 0; i < reference.children.xmlTagModels.length; i++) {
            let child = reference.children.xmlTagModels[i] as any;

            if (child.text) {
              targetFrameworkString += child.text;
            }
          }

          targetFrameworkString = targetFrameworkString.trim();

          this.xmlProjectModel.targetFramework = targetFrameworkString;
        }

        // Get <RootNamespace>...</RootNamespace>
        let rootNamespaces: XmlTagModel[] = [];

        xmlFileModel.selectRecursively(
          (x) => x.tagName === ConstantsProjectFile.ROOT_NAMESPACE_TAG_NAME,
          rootNamespaces);

        if (rootNamespaces.length !== 0) {
          // There should not be more than 1 root namespace defined in the .csproj file
          // if there is take the first root namespace that is defined.
          let reference = rootNamespaces[0];

          let rootNamespaceString = "";

          for (let i = 0; i < reference.children.xmlTagModels.length; i++) {
            let child = reference.children.xmlTagModels[i] as any;

            if (child.text) {
              rootNamespaceString += child.text;
            }
          }

          rootNamespaceString = rootNamespaceString.trim();

          this.xmlProjectModel.rootNamespace = rootNamespaceString;
        }
      }
      else {
        if (this.xmlProjectAbsoluteFilePath) {
          // Only either projectToProjectReferencesFile can be calculated or 
          // projectToProjectReferencesFile can be returned at a given time as
          // the user interface that calls this method does not have a reference to both arrays.

          if (this.xmlProjectToProjectReferencesFile) {
            let projectReferences: XmlTagModel[] = [];

            xmlFileModel.selectRecursively(
              (x) => x.tagName === ConstantsProjectFile.PROJECT_REFERENCE_TAG_NAME,
              projectReferences);

            for (let i = 0; i < projectReferences.length; i++) {
              let reference = projectReferences[i];

              let includeAttribute = reference.xmlAttributeModels.find(attribute =>
                attribute.attributeName === ConstantsProjectFile.XML_INCLUDE_ATTRIBUTE_NAME);

              if (includeAttribute) {
                if (!this.xmlProjectToProjectReferencesFile.virtualChildFiles) {
                  this.xmlProjectToProjectReferencesFile.virtualChildFiles = [];
                }

                this.xmlProjectToProjectReferencesFile.virtualChildFiles.push(
                  new ProjectToProjectReferenceFile(this.xmlProjectAbsoluteFilePath,
                    this.xmlProjectToProjectReferencesFile.absoluteFilePath, includeAttribute.attributeValue));
              }
            }
          }

          if (this.xmlProjectNugetPackageDependenciesFile) {
            let nugetPackageReferences: XmlTagModel[] = [];

            xmlFileModel.selectRecursively(
              (x) => x.tagName === ConstantsProjectFile.NUGET_PACKAGE_TAG_NAME,
              nugetPackageReferences);

            for (let i = 0; i < nugetPackageReferences.length; i++) {
              let reference = nugetPackageReferences[i];

              let includeAttribute = reference.xmlAttributeModels.find(attribute =>
                attribute.attributeName === ConstantsProjectFile.XML_INCLUDE_ATTRIBUTE_NAME);

              let versionAttribute = reference.xmlAttributeModels.find(attribute =>
                attribute.attributeName === ConstantsProjectFile.XML_VERSION_ATTRIBUTE_NAME);

              if (includeAttribute && versionAttribute) {
                if (!this.xmlProjectNugetPackageDependenciesFile.virtualChildFiles) {
                  this.xmlProjectNugetPackageDependenciesFile.virtualChildFiles = [];
                }

                this.xmlProjectNugetPackageDependenciesFile.virtualChildFiles.push(
                  new ProjectNugetPackageDependencyFile(this.xmlProjectAbsoluteFilePath,
                    this.xmlProjectNugetPackageDependenciesFile.absoluteFilePath,
                    includeAttribute.attributeValue,
                    versionAttribute.attributeValue));
              }
            }
          }
        }
      }

      if (callback) {
        callback(xmlFileModel);
      }
    });
  }

  public static async parseRootNamespace(projectModel: IProjectModel,
    callback: any): Promise<void> {

    projectModel.rootNamespace = projectModel.displayName;

    let projectParser = new XmlProjectParser(undefined,
        undefined,
        undefined,
        projectModel);

    projectParser.parse(callback);
}

public static async parseProjectToProjectReferences(projectAbsoluteFilePath: AbsoluteFilePath,
    projectToProjectReferencesFile: ProjectToProjectReferencesListFile,
    callback: any): Promise<void> {

    projectToProjectReferencesFile.virtualChildFiles = [];

    let projectParser = new XmlProjectParser(projectAbsoluteFilePath,
        projectToProjectReferencesFile,
        undefined,
        undefined);

    projectParser.parse(callback);
}

public static async parseProjectNugetPackageReferences(projectAbsoluteFilePath: AbsoluteFilePath,
    projectNugetPackageDependenciesFile: ProjectNugetPackageDependenciesListFile,
    callback: any): Promise<void> {

    projectNugetPackageDependenciesFile.virtualChildFiles = [];

    let projectParser = new XmlProjectParser(projectAbsoluteFilePath,
        undefined,
        projectNugetPackageDependenciesFile,
        undefined);

    projectParser.parse(callback);
}
}


