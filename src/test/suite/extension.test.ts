import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { SolutionModel } from '../../DotNet/SolutionModel';
import { AbsoluteFilePath } from '../../FileSystem/AbsoluteFilePath';
import { DotNetSolutionFile } from '../../FileSystem/Files/DotNetSolutionFile';
// import * as myExtension from '../../extension';
import { DotNetSolutionParser } from '../../Parsers/DotNetSolutionParser';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	/**
	 * TODO: Calculate absolute file path of test files upon running the test. If a different computer runs these tests they will fail currently.
	 */
	test('DotNetSolutionParser Test', async () => {
		let solutionAbsoluteFilePath = new AbsoluteFilePath("/home/hunter/Repos/dot-net-ide/src/test/suite/TestingData/TestingData.sln",
			false,
			null);

		let solutionModel = new SolutionModel(solutionAbsoluteFilePath);

        let dotNetSolutionFile = new DotNetSolutionFile(solutionModel);

		solutionModel.projects = [];
        
        let dotNetSolutionParser = new DotNetSolutionParser(solutionModel);

		let callbackIsFinishedWrapping = new CallbackIsFinishedWrapping(false);
	
		try {
			await dotNetSolutionParser
				.parse(() => callbackIsFinishedWrapping.callbackIsFinished = true);
		}
		catch {
			callbackIsFinishedWrapping.callbackIsFinished = true;
		}

		await waitForCallback(callbackIsFinishedWrapping);

		// done() shows up in documentation but I cannot pinpoint how to use it
		// I imagine it is the preferred way to achieve 'waitForCallback'

		assert.strictEqual(solutionModel.projects[0].displayName, "CrudApp.AppHosts.BlazorServerSide");
		assert.strictEqual(solutionModel.projects[1].displayName, "CrudApp.ClassLibrary");
		assert.strictEqual(solutionModel.projects[2].displayName, "CrudApp.RazorClassLibrary");
		assert.strictEqual(solutionModel.projects[3].displayName, "CrudApp.Tests");

		assert.strictEqual(solutionModel.projects[0].projectRelativePathFromSolution, "CrudApp.AppHosts.BlazorServerSide\\CrudApp.AppHosts.BlazorServerSide.csproj");
		assert.strictEqual(solutionModel.projects[1].projectRelativePathFromSolution, "CrudApp.ClassLibrary\\CrudApp.ClassLibrary.csproj");
		assert.strictEqual(solutionModel.projects[2].projectRelativePathFromSolution, "CrudApp.RazorClassLibrary\\CrudApp.RazorClassLibrary.csproj");
		assert.strictEqual(solutionModel.projects[3].projectRelativePathFromSolution, "CrudApp.Tests\\CrudApp.Tests.csproj");
		
		assert.strictEqual(solutionModel.projects[0].absoluteFilePath.initialAbsoluteFilePathStringInput, "/home/hunter/Repos/dot-net-ide/src/test/suite/TestingData/CrudApp.AppHosts.BlazorServerSide/CrudApp.AppHosts.BlazorServerSide.csproj");
		assert.strictEqual(solutionModel.projects[1].absoluteFilePath.initialAbsoluteFilePathStringInput, "/home/hunter/Repos/dot-net-ide/src/test/suite/TestingData/CrudApp.ClassLibrary/CrudApp.ClassLibrary.csproj");
		assert.strictEqual(solutionModel.projects[2].absoluteFilePath.initialAbsoluteFilePathStringInput, "/home/hunter/Repos/dot-net-ide/src/test/suite/TestingData/CrudApp.RazorClassLibrary/CrudApp.RazorClassLibrary.csproj");
		assert.strictEqual(solutionModel.projects[3].absoluteFilePath.initialAbsoluteFilePathStringInput, "/home/hunter/Repos/dot-net-ide/src/test/suite/TestingData/CrudApp.Tests/CrudApp.Tests.csproj");

		assert.strictEqual(solutionModel.projects[0].firstGuid, "FAE04EC0-301F-11D3-BF4B-00C04F79EFBC");
		assert.strictEqual(solutionModel.projects[1].firstGuid, "FAE04EC0-301F-11D3-BF4B-00C04F79EFBC");
		assert.strictEqual(solutionModel.projects[2].firstGuid, "FAE04EC0-301F-11D3-BF4B-00C04F79EFBC");
		assert.strictEqual(solutionModel.projects[3].firstGuid, "FAE04EC0-301F-11D3-BF4B-00C04F79EFBC");
		
		assert.strictEqual(solutionModel.projects[0].secondGuid, "11D15D21-499E-4175-B94C-247E2ADE5511");
		assert.strictEqual(solutionModel.projects[1].secondGuid, "F0F0AEF9-2ED3-4795-A993-39A35C84624B");
		assert.strictEqual(solutionModel.projects[2].secondGuid, "F6E03015-29B2-43C5-A39A-D66AE3EC6943");
		assert.strictEqual(solutionModel.projects[3].secondGuid, "89A8B1FE-15A2-45AF-B2D5-608ED4627685");
	}).timeout(60_000);
});

class CallbackIsFinishedWrapping {
	constructor(public callbackIsFinished: boolean) {
	}
}

async function waitForCallback(callbackIsFinishedWrapping: CallbackIsFinishedWrapping) {
	while (!callbackIsFinishedWrapping.callbackIsFinished) {
		await new Promise(r => setTimeout(r, 1000));
	}
}
