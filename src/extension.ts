import * as vscode from 'vscode';
import { SidebarProvider } from './UiProviders/SidebarProvider';

export function activate(context: vscode.ExtensionContext) {
	const sidebarProvider = new SidebarProvider(context);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			"dot-net-ide.sidebar-webview",
			sidebarProvider,
			{
				"webviewOptions": {
					retainContextWhenHidden: true
				}
			}
		)
	);
}

export function deactivate() {}
