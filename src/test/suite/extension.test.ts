import * as assert from 'assert';
import { debug } from 'console';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('myAsyncFunctionNoCallback test', async () => {
		await myAsyncFunctionNoCallback();
	});

	test('myAsyncFunctionWithACallback test', async () => {
		await myAsyncFunctionWithACallback(() => console.log("executed callback"));
	});

	test('done test', async (done) => {
		await myAsyncFunctionWithAnAsyncCallback(async (mochaDone: any) => {
			await myAsyncFunctionNoCallback();

			mochaDone();
		},
		done);
	});
	
	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
});

async function myAsyncFunctionNoCallback(): Promise<void> {
	for (let i = 0; i < 5; i++) {
		console.log("Total time: " + i);
		
		await new Promise(r => setTimeout(r, 1000));
	}

	return Promise.resolve();
}

async function myAsyncFunctionWithACallback(callback: () => any): Promise<void> {
	for (let i = 0; i < 5; i++) {
		console.log("Total time: " + i);
		
		await new Promise(r => setTimeout(r, 1000));
	}

	callback();

	return Promise.resolve();
}

async function myAsyncFunctionWithAnAsyncCallback(callback: (mochaDone: any) => Promise<any>, mochaDone: any): Promise<void> {
	for (let i = 0; i < 5; i++) {
		console.log("Total time: " + i);
		
		await new Promise(r => setTimeout(r, 1000));
	}

	callback(mochaDone);

	return Promise.resolve();
}