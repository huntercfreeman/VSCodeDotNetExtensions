# Solution Explorer Webview

The extension renders a solution explorer webview in the sidebar.

This directory contains the source code for the solution explorer webview.

# Programming Language

TypeScript and JavaScript

# UI Framework

Svelte

# Brief description of this application

The application is mostly a TreeView display.

The application has a context menu component that can be accessed with the mouse button of 'Right Click'

Many of the context menu options available wrap the already existing dotnet CLI ([https://docs.microsoft.com/en-us/dotnet/core/tools/](https://docs.microsoft.com/en-us/dotnet/core/tools/)).

# How to Build this Svelte Application

- While using a terminal change directory to where this README.md is located and this application's 'rollup.config.js' is located.
    - As of the writing of this README.md I currently type while in the root of this repository: 'cd svelteApps/solutionExplorerWebview' as an example.

    - After following the previous step you should be in the directory that contains this Svelte app's 'rollup.config.js'. The command to build from this directory is:

> npm run build

---

- [rollup.config.js](rollup.config.js) specifies where the compiled javascript should be output to. As of writing this README.md the path is:

> ../../out/solutionExplorerWebview/solutionExplorerWebview.js

- (continuation of previous bullet). The takeaway is not the exact relative path as that likely will change, instead the takeaway is that the extension output goes into a folder named, 'out' at the root of the repository.

- The webview is rendered in Visual Studio Code by the following steps 

1: The TypeScript class [/src/UiProviders/SolutionExplorerWebviewProvider.ts](/src/UiProviders/SolutionExplorerWebviewProvider.ts)

``` typescript
private getWebviewContent(webview: vscode.Webview) {
    const dotNetIdeSvelteAppJavaScriptUri = webview.asWebviewUri(vscode.Uri.joinPath(
      this.context.extensionUri, 'out/solutionExplorerWebview', 'solutionExplorerWebview.js'));

    const dotNetIdeSvelteAppCssUri = webview.asWebviewUri(vscode.Uri.joinPath(
      this.context.extensionUri, 'out/solutionExplorerWebview', 'solutionExplorerWebview.css'));

    // take note that the compiled javascript is referenced here.

    // More code follows but is ommitted in this snippet
}
```

2: Inside [/src/extension.ts](/src/extension.ts)

``` typescript
const solutionExplorerWebviewProvider = new SolutionExplorerWebviewProvider(context);

context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
        "dot-net-ide.solution-explorer-webview",
        solutionExplorerWebviewProvider,
        {
            "webviewOptions": {
                // retainContextWhenHidden is resource intensive and should be used sparingly
                // preferably the code would maintain an 'isExpanded' property on 
                // all entries of the TreeView so that this is not needed to be here
                retainContextWhenHidden: true
            }
        }
    )
);
```
3: The root [package.json](/package.json) file. (this is the last step)

``` json
"activationEvents": [
    "onView:dot-net-ide.solution-explorer-webview",
    // others
],
// JSON in between
"contributes": {
		"viewsContainers": {
			"activitybar": [
				{
					"id": "dot-net-ide",
					"title": ".NET IDE",
					"icon": "media/solutionExplorerIcon.svg"
				}
                // others
			]
		},
		"views": {
			"dot-net-ide": [
				{
					"type": "webview",
					"id": "dot-net-ide.solution-explorer-webview",
					"name": "Solution Explorer",
					"icon": "media/solutionExplorerIcon.svg"
				},
                // others
			]
		}
	},
```

# Important ideas to follow when developing

- When adding new context menu options it is important that the dotnet CLI perform the action when possible.
    - In otherwords, be sure to check the dotnet CLI before writing a feature.

- What if dotnet CLI does not have ability to perform the desired action?
    - Ensure the implementation works with pointed unit tests that are separated from the user interface.

# Not yet implemented

- Handle typical keyboard movement found in TreeViews.
    - A simple example: hitting up and down arrow to traverse up and down the tree view elements.
    - A more complex example:
---

- Solution.sln

- ProjectOne.csproj

    - MyClass.cs
    - Program.cs
    - MyDirectory
        - MyService.cs

- ProjectTwo.csproj <--- Focus is here

// Specification: when the ArrowUp key is pressed the C# file named, 'MyService.cs' is to be set as focused.

// Solution: 

// Part 1: This is done by ProjectTwo.csproj setting focus to its previous sibling.

// Part 2: The newly focused sibling named, 'ProjectOne.csproj' is to then check if itself is Expanded.

// Part 3: If 'ProjectOne.csproj' is expanded it should then set focus to the final child in its children list which would be 'MyDirectory'.

// Part 4: If the newly focused final child is Expanded repeat Part 3 and Part 4 recursively until a 'final child' is 'not expanded'

// Part 5: This sets focus to 'MyService.cs'

---

- Create a truly generic TreeView that can be used to render anything so it may be used elsewhere as needed.

- Add Vim support. I'm not entirely sure what the ideas for this would be but it is definitely on my mind.

    - The simplist idea would be that 'h', 'j', 'k', 'l' map to 'ArrowLeft',
    'ArrowDown', 'ArrowUp', 'ArrowRight'.