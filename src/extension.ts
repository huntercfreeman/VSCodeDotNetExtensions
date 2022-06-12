import * as vscode from 'vscode';
import { NugetPackageManagerProvider } from './UiProviders/NugetPackageManagerProvider';
import { SidebarProvider } from './UiProviders/SidebarProvider';
import { UnitTestExplorerProvider } from './UiProviders/UnitTestExplorerProvider';

export function activate(context: vscode.ExtensionContext) {
	const unitTestExplorerProvider = new UnitTestExplorerProvider(context);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			"dot-net-ide.unit-test-explorer-webview",
			unitTestExplorerProvider,
			{
				"webviewOptions": {
					// retainContextWhenHidden is resource intensive and should be used sparingly
					retainContextWhenHidden: true
				}
			}
		)
	);

	const nugetPackageManagerProvider = new NugetPackageManagerProvider(context);
	
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			"dot-net-ide.nuget-package-manager-webview",
			nugetPackageManagerProvider,
			{
				"webviewOptions": {
					// do not use retainContextWhenHidden for the nuget package manager
					// retainContextWhenHidden is resource intensive and should be used sparingly
				}
			}
		)
	);

	const sidebarProvider = new SidebarProvider(context);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			"dot-net-ide.sidebar-webview",
			sidebarProvider,
			{
				"webviewOptions": {
					// retainContextWhenHidden is resource intensive and should be used sparingly
					retainContextWhenHidden: true
				}
			}
		)
	);

	
}

export function deactivate() {}
