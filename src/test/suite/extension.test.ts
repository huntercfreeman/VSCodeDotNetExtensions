import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { ConstantsFilePath } from '../../Constants/ConstantsFilePath';
import { SolutionModel } from '../../DotNet/SolutionModel';
import { AbsoluteFilePath } from '../../FileSystem/AbsoluteFilePath';
import { DotNetSolutionFile } from '../../FileSystem/Files/DotNetSolutionFile';
// import * as myExtension from '../../extension';
import { DotNetSolutionParser } from '../../Parsers/DotNetSolutionParser';

/**
 * Needed to make TestData relative to the
 * individual running the test's computer
 * 
 * Example: const absolutePathToRepository: string = "/home/hunter/Repos/dot-net-ide/";
 * 
 * End this string with a file delimiter
 */
const absolutePathToRepository: string = "/home/hunter/Repos/dot-net-ide/";

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('DotNetSolutionParser Test', async () => {
		let solutionAbsoluteFilePath = new AbsoluteFilePath(absolutePathToRepository
			+ 'src/test/suite/TestData/BlazorStudio.sln',
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

		// done() shows up in documentation but I cannot pinpoint how to use it
		// I imagine it is the preferred way to achieve what the 'waitForCallback' method I made does
		await waitForCallback(callbackIsFinishedWrapping);
		
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