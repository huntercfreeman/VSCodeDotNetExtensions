# .NET IDE - A Visual Studio Code Extension

# How to Build this Repository

For succinct to the point 'how to build' documentation go to each application in the repo's README.md individually (following this text are the links to those README.md files)

- The Visual Studio Extension README.md:
    - [/src/README.md](/src/README.md)
- The Solution Explorer Webview README.md:
    - [/svelteApps/solutionExplorerWebview/README.md](/svelteApps/solutionExplorerWebview/README.md)
- The Nuget Package Manager Webview README.md:
    - [/svelteApps/nugetPackageManagerWebview/README.md](/svelteApps/nugetPackageManagerWebview/README.md)

Steps are labeled in the pattern '10.10, 20.10, 30.10, ...' this allows if needed at a later date a step to be added without renumbering everything. Example would be realizing an extra step is required before 10.10. One might insert the extra step as, '05.10' to indicate it is a stand alone step. Or, one might insert the extra step as, '10.05' to indicate a substep of the stand alone step labeled '10'.

00.10: Be sure to read over the terminal commands before running them.

10.10: Install node.js

``` bash
sudo snap install node --classic
```

![installNode.gif](/DocumentationImages/Root-README-Images/installNode.gif)

10.20: Restart Terminal to refresh environment variables.

10.30: Double check the versions of both 'node', and 'npm'.

``` bash
node --version
```

``` bash
npm --version
```

![nodeNpmVersion.gif](/DocumentationImages/Root-README-Images/nodeNpmVersion.gif)

20.10: (Standalone step labeled '20' is an optional step) Next is to install the project scaffolder for a Visual Studio Code extension. Microsoft documentation immediately follows this text, following the link I document it myself as well.

> https://code.visualstudio.com/api/get-started/your-first-extension

20.20: Install the project scaffolder for a Visual Studio Code extension.

``` bash
sudo npm install -g yo generator-code
```

![installVisualStudioCodeExtensionScaffolder.gif](/DocumentationImages/Root-README-Images/installVisualStudioCodeExtensionScaffolder.gif)

20.20: Scaffold a Visual Studio Code extension by running:

``` bash
yo code
```

![yoCode.gif](/DocumentationImages/Root-README-Images/yoCode.gif)

20.30: Run the default scaffolded extension and a separate instance of Visual Studio Code should start up with the extension running on that instance only.

![runExtension.gif](/DocumentationImages/Root-README-Images/runExtension.gif)

20.40: In the Visual Studio Code instance of the running extension hit the following keybind:

> [ 'ctrl' + 'shift' + 'p' ]

![commandPrompt.gif](/DocumentationImages/Root-README-Images/commandPrompt.gif)

20.50: The previous step opens the Visual Studio Code command prompt. The default scaffold of Visual Studio Code extensions comes with a "Hello World!" command. Execute the following command:

> dot-net-ide.helloWorld

![helloWorldCommand.gif](/DocumentationImages/Root-README-Images/helloWorldCommand.gif)

20.50: The scaffolded command with id 'dot-net-ide.helloWorld' exists due to the following source code.:

- /src/extension.ts
``` typescript
let disposable = vscode.commands.registerCommand('dot-net-ide.helloWorld', () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World from .NET IDE!');
});

context.subscriptions.push(disposable);
```

- /package.json

``` json
"activationEvents": [
    // Extensions do not run until activated
    "onCommand:dot-net-ide.helloWorld"
],
```

``` json
"contributes": {
    "commands": [
        {
            // Note how in extension.ts when registering this command the 'command' property below matches what is passed to the 'registerCommand' method.

            // vscode.commands.registerCommand('dot-net-ide.helloWorld'

            "command": "dot-net-ide.helloWorld",
            "title": "Hello World"
        }
    ]
},
```

![registerCommand.gif](/DocumentationImages/Root-README-Images/registerCommand.gif)

20.50: If the extension is running, stop it as we will now look at how to run the tests.

20.60: In the Visual Studio Code sidebar is a tab named "Run and Debug" to help find this tab a gif and some descriptions follow.

![openDebugTab.gif](/DocumentationImages/Root-README-Images/openDebugTab.gif)

- The Visual Studio Code sidebar defaults to be positioned on the left side of the application.
- The default icon for the "Run and Debug" tab is a play button with a 'bug' icon placed at the bottom left of the play button. The 'bug' overlaps the play button.
- Don't see the icon for the "Run and Debug" tab? The following two bullet points might help.
    - On the top of Visual Studio Code is a 'toolbar'. Select the menu option named, 'View'. This opens a dropdown where one can proceed to select the option named 'Run' to open the "Run and Debug" tab.
    - The default keyboard command to open the "Run and Debug" tab is the following:

> [ 'ctrl' + 'shift' + 'd' ]

20.70: Set the "Run and Debug" sidebar tab as the active tab to view its contents. One can do this by clicking the icon for the "Run and Debug" tab.

20.80: Now that the "Run and Debug" sidebar tab is the active tab, use the dropdown towards the top of view to change from 'Run Extension' to 'Extension Tests'.

20.90: Run the 'Extension Tests'

![runExtensionTests.gif](/DocumentationImages/Root-README-Images/runExtensionTests.gif)

25.10: The directory for the scaffolded extension's tests are located at the following location:

> /src/test

25.20: The location of the file in which one would write there tests is located at the following location:

> /src/test/suite/extension.test.ts

25.30: Create another test that will fail to showcase what a failed test looks like.

![failedTest.gif](/DocumentationImages/Root-README-Images/failedTest.gif)

25.30: How do we add a webview to the sidebar? The Microsoft documentation for this can be found at the following link:

> https://code.visualstudio.com/api/extension-guides/webview


