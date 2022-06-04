/// <reference types="svelte" />

import * as _vscode from "vscode";

declare global {
	const tsVscode: {
		postMessage: ({type: string, value: any}) => void;
	};
}