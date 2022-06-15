# .NET IDE - A Visual Studio Code Extension

# How to Build this Repository

For succinct to the point 'how to build' documentation go to each application in the repo's README.md individually (following this text are the links to those README.md files)

- The Visual Studio Code Extension README.md:
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

20.05: All of step '20' is a showcase of making this extension entirely from scratch all over again. Step 20 is entirely optional, all required installations to build are already done from earlier documentation (node and npm for example). Once the development process is explained I never showcase this 'from scratch project' again and return to using the actual repository to showcase things.

20.10: Next is to install the project scaffolder for a Visual Studio Code extension. Microsoft documentation immediately follows this text, following the link I document it myself as well.

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

20.80: Now that the "Run and Debug" sidebar tab is the active tab, use the dropdown towards the top of the sidebar view to change from 'Run Extension' to 'Extension Tests'.

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

25.40: We can start in '/package.json'. The following bullet points are a list of what we need to change in '/package.json'.

- Add to the 'activationEvents' section of the package.json.
- Add to the 'contributes' section of the package.json.
    - Add to the 'viewsContainers' section of the 'contributes' section
        - Add to the 'activitybar section of the 'viewsContainers' section
    - Add to the 'views' section of the 'contributes' section

What follows is a JSON snippet containing the changes, and following the JSON snippet is a gif of me making the changes.

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
![addWebviewPackageJson.gif](/DocumentationImages/Root-README-Images/addWebviewPackageJson.gif)

25.50: Next we can alter, '/src/extension.ts'. The following bullet points are a list of what we need to change in '/src/extension.ts'.

- Construct an instance of the desired WebviewProvider (in the next step we'll create a WebviewProvider).
- Push another subscription onto Visual Studio Code's context.
    - The contents of the subscription will render the desired WebviewProvider.
    - Take note that in package.json we altered the 'contributes' section.
        - Follow the JSON property path: contributes.views.dot-net-ide.id. The value is to showcase as the first parameter to the method: 'vscode.window.registerWebviewViewProvider()'.

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

![addWebivewExtensionTs.gif](/DocumentationImages/Root-README-Images/addWebivewExtensionTs.gif)

25.60: As an aside, note that the order of the changes we're making does not matter as we don't compile until fully changing everything. 

25.70 Lastly we can add our webview provider file, '/src/UiProviders/SolutionExplorerWebviewProvider.ts'. The following bullet points are a list of what we need to add in '/src/UiProviders/SolutionExplorerWebviewProvider.ts'.

- Export a class that implements, 'vscode.WebviewViewProvider'.
    - In the implemented method, 'resolveWebviewView(webviewView: vscode.WebviewView)'.
        - Contruct an instance of options for the webview with the following value:
            - On webviewView.webview.options set 'localResourceRoots' to '[this.context.extensionUri]'
        - Set the webview's html content. Typically the html content is returned from a separate function as the html content can be rather verbose.
            - Example: webviewView.webview.html = this.getWebviewContent(webviewView.webview);
            - The returned value from this.getWebviewContent(...) is usually very similar. The following HTML snippet is the general template. It will work as a starting point.
``` html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
            const tsVscode = acquireVsCodeApi();
        </script>
    </head>

    <body>
    </body>
</html>`;
```

``` typescript
import * as vscode from 'vscode';

export class SolutionExplorerWebviewProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  constructor(private readonly context: vscode.ExtensionContext) { }

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      localResourceRoots: [this.context.extensionUri],
    };

    webviewView.webview.html = this.getWebviewContent(webviewView.webview);
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  private getWebviewContent(webview: vscode.Webview) {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <script>
		const tsVscode = acquireVsCodeApi();
	</script>
  </head>
  <body>
  </body>
  </html>`;
  }
}

```
25.80 After creating the file '/src/UiProviders/SolutionExplorerWebviewProvider.ts' go back to file '/src/extension.ts' and add an import so the error goes away.

![addWebviewUiProviders.gif](/DocumentationImages/Root-README-Images/addWebviewUiProviders.gif)

25.90 I was a bit foolish to use the same webview id as I did when making the actual .NET IDE. Visual Studio Code will crash when running the extension as two webview ids are conflicting. Let's just say I did this on purpose to illustrate the point that webview ids must be unique. We can remedy this by simply changing the webview id and all its references. A gif follows of me doing such.

![sameWebviewIdError.gif](/DocumentationImages/Root-README-Images/sameWebviewIdError.png)

![sameWebviewIssueResolved.gif](/DocumentationImages/Root-README-Images/sameWebviewIssueResolved.gif)

26.10 Create the folder: '/media'.

26.20 Add the icon that was referenced in package.json to the folder /media.

``` html
<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.773 3.485l-.78-.184-2.108 2.096-1.194-1.216 2.056-2.157-.18-.792a4.42 4.42 0 0 0-1.347-.228 3.64 3.64 0 0 0-1.457.28 3.824 3.824 0 0 0-1.186.84 3.736 3.736 0 0 0-.875 1.265 3.938 3.938 0 0 0 0 2.966 335.341 335.341 0 0 0-6.173 6.234c-.21.275-.31.618-.284.963a1.403 1.403 0 0 0 .464.967c.124.135.272.247.437.328.17.075.353.118.538.127.316-.006.619-.126.854-.337 1.548-1.457 4.514-4.45 6.199-6.204.457.194.948.294 1.444.293a3.736 3.736 0 0 0 2.677-1.133 3.885 3.885 0 0 0 1.111-2.73 4.211 4.211 0 0 0-.196-1.378zM2.933 13.928a.31.31 0 0 1-.135.07.437.437 0 0 1-.149 0 .346.346 0 0 1-.144-.057.336.336 0 0 1-.114-.11c-.14-.143-.271-.415-.14-.568 1.37-1.457 4.191-4.305 5.955-6.046.1.132.21.258.328.376.118.123.245.237.38.341-1.706 1.75-4.488 4.564-5.98 5.994zm11.118-9.065c.002.765-.296 1.5-.832 2.048a2.861 2.861 0 0 1-4.007 0 2.992 2.992 0 0 1-.635-3.137A2.748 2.748 0 0 1 10.14 2.18a2.76 2.76 0 0 1 1.072-.214h.254L9.649 3.839v.696l1.895 1.886h.66l1.847-1.816v.258zM3.24 6.688h1.531l.705.717.678-.674-.665-.678V6.01l.057-1.649-.22-.437-2.86-1.882-.591.066-.831.849-.066.599 1.838 2.918.424.215zm-.945-3.632L4.609 4.58 4.57 5.703H3.494L2.002 3.341l.293-.285zm7.105 6.96l.674-.673 3.106 3.185a1.479 1.479 0 0 1 0 2.039 1.404 1.404 0 0 1-1.549.315 1.31 1.31 0 0 1-.437-.315l-3.142-3.203.679-.678 3.132 3.194a.402.402 0 0 0 .153.105.477.477 0 0 0 .359 0 .403.403 0 0 0 .153-.105.436.436 0 0 0 .1-.153.525.525 0 0 0 .036-.184.547.547 0 0 0-.035-.184.436.436 0 0 0-.1-.153L9.4 10.016z"/></svg>
```

![addWebviewIcon.gif](/DocumentationImages/Root-README-Images/addWebviewIcon.gif)

26.20: When running the extension we can visit the webview in the sidebar. However, we currently have no content. Let's put some text on the webview by altering the file, 'SolutionExplorerWebviewProvider.ts' and the method in that file, 'getWebviewContent(webview: vscode.Webview)'.

![addWebviewUiHelloWorld.gif](/DocumentationImages/Root-README-Images/addWebviewUiHelloWorld.gif)

26.30: Let's get started on writing a Svelte application so we can render it in the webview. Any UI framework can be used as long as it outputs javascript at the end of the compilation stage (transpilation stage?).

26.40: I have a few quick comments to make before scaffolding the Svelte app.

26.45: I use the following extensions for Svelte in Visual Studio Code

> Svelte for VS Code
![svelteForVSCode.gif](/DocumentationImages/Root-README-Images/svelteForVSCode.png)

> ESLint
![svelteForVSCode.gif](/DocumentationImages/Root-README-Images/esLint.png)

26.50: A video that helped me learn the basic amount of Svelte knowledge I have, and get a Svelte application into a Visual Studio Code webview, is one by a youtuber named, 'Ben Awad'. Find his video at the following link:

> [How to Code a VSCode Extension by Ben Awad](https://www.youtube.com/watch?v=a5DX5pQ9p5M)

26.60: As I mentioned in the previous comment, I have a very basic amount of Svelte knowledge. I've been learning how to use Svelte as I write this extension. Luckily a lot of my .NET knowledge was transferrable to some degree. The same is true when it comes to any TypeScript I wrote for this application. The reason I bring this up is I don't want someone thinking the way I'm doing things are 'correct' or perhaps the phrase 'best practice'. I am putting in all the effort I have to write good code in these languages but, if you see peculiar conventions in regards to Svelte / TypeScript just keep this all in mind.

26.70: Time to scaffold a Svelte application. I am going to make a TypeScript Svelte application using the following documentation:

> https://svelte.dev/blog/svelte-and-typescript

26.80: The location that the Svelte application is placed I believe is important. From what I understand Visual Studio Code will allow us to 'ignore' the Svelte application source code when we package the extension to be published. This allows for a smaller download size as only the output of the compiled Svelte application would then be included in the published extension.

26.90: In the file '/.vscodeignore' we can ignore the location of the Svelte application. Make the directory '/svelteApps'. Afterwards alter the '/.vscodeignore' file as shown (add 'svelteApps/**'):

```
.vscode/**
.vscode-test/**
src/**
.gitignore
.yarnrc
vsc-extension-quickstart.md
**/tsconfig.json
**/.eslintrc.json
**/*.map
**/*.ts
svelteApps/**
```

![svelteAppsDirectory.gif](/DocumentationImages/Root-README-Images/svelteAppsDirectory.gif)

27:10: In the terminal change directory to '/svelteApps'. I'll provide the command I used but the command might be different for your setup.

``` bash
cd ./svelteApps
```
27:20: Now run the terminal commands to scaffold the Svelte application that follow:

### If you need to download degit: 'npm install -g degit'
``` bash
npx degit sveltejs/template svelte-typescript-app
cd svelte-typescript-app
node scripts/setupTypeScript.js
```

You might have to hit the 'Enter' key to send the last command if you are running all 3 in one paste action.

27:30: With the Svelte app created now we need to reference the output of the Svelte compilation step. Inside '/svelteApps/svelte-typescript-app/rollup.config.js' the location of where the output is put is located.

``` js
output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
},
```

27:40: Change the output file path to be where the Visual Studio Code extension reads from. In otherwords, 'public/build/bundle.js' needs to be changed to '../../out/svelte-typescript-app/svelte-typescript-app.js'

``` js
output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: '../../out/svelte-typescript-app/svelte-typescript-app.js'
},
```

![changeSvelteApplicationOutput.gif](/DocumentationImages/Root-README-Images/changeSvelteApplicationOutput.gif)

27:50: Now, in the terminal ensure you are in the directory, '/svelteApps/svelte-typescript-app' and then run the following command to install the dependencies (only have to do this once until you next add a dependency):

``` bash
npm install
```

The following command is used to build the svelte app:
``` bash
npm run build
```

![changeSvelteApplicationOutput.gif](/DocumentationImages/Root-README-Images/compileSvelte.gif)

27:60: We can now add a reference to the output of the Svelte application. In the file '/src/UiProviders/SolutionExplorerWebviewProvider.ts' go to the method, 'getWebviewContent(webview: vscode.Webview)'. 

We need to add references to the output of the Svelte application and render the Svelte app. Alter the 'getWebviewContent(webview: vscode.Webview)' to be the following code snippet:

``` typescript
private getWebviewContent(webview: vscode.Webview) {
    const dotNetIdeSvelteAppJavaScriptUri = webview.asWebviewUri(vscode.Uri.joinPath(
      this.context.extensionUri, 'out/svelte-typescript-app', 'svelte-typescript-app.js'));

    const dotNetIdeSvelteAppCssUri = webview.asWebviewUri(vscode.Uri.joinPath(
      this.context.extensionUri, 'out/svelte-typescript-app', 'svelte-typescript-app.css'));

    return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="${dotNetIdeSvelteAppCssUri}" rel="stylesheet">
	  <script>
		const tsVscode = acquireVsCodeApi();
	</script>
  </head>
  <body>
	  <script src="${dotNetIdeSvelteAppJavaScriptUri}"></script>
  </body>
  </html>`;
  }
```

We also must modify the method, 'resolveWebviewView(webviewView: vscode.WebviewView)'. The modification is to allow for scripts in the Webview. Within the options for the webview (webviewView.webview.options) add another property, 'enableScripts: true'. Without this the Svelte app cannot run.

``` typescript
public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,
      
      localResourceRoots: [this.context.extensionUri],
    };

    webviewView.webview.html = this.getWebviewContent(webviewView.webview);
  }
```

![enableScripts.gif](/DocumentationImages/Root-README-Images/enableScripts.gif)

27:70: Upon running the extension we now see the Svelte application.

![initialSvelteApplication.gif](/DocumentationImages/Root-README-Images/initialSvelteApplication.gif)

27:80: Let's add a counter button to the Svelte application as shown in the following gif.

![counterSvelte.gif](/DocumentationImages/Root-README-Images/counterSvelte.gif)

27:90: And next we need to run the command to build the svelte application. Afterwards, run the extension and click the button and watch it increment.

``` bash
npm run build
```

![counterIncrementation.gif](/DocumentationImages/Root-README-Images/counterIncrementation.gif)

27:90: We should make the css of the Svelte application match Visual Studio Code's css. Let's do that now.

Add to '/media' the following two files.

- '/media/reset.css'
- '/media/vscode.css'

Within those two files paste the respective file contents that are in the collapsed section below as to not take up too much space (click it to expand the collapsed section).

<details>
  <summary>Expand to see '/media/reset.css'</summary>
  
``` css
html {
	box-sizing: border-box;
	font-size: 13px;
}

*,
*:before,
*:after {
	box-sizing: inherit;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
	margin: 0;
	padding: 0;
	font-weight: normal;
}

img {
	max-width: 100%;
	height: auto;
}

```

</details>

<details>
  <summary>Expand to see '/media/vscode.css'</summary>
  
``` css
:root {
	--container-paddding: 20px;
	--input-padding-vertical: 6px;
	--input-padding-horizontal: 4px;
	--input-margin-vertical: 4px;
	--input-margin-horizontal: 0;
}

body {
	padding: 0 var(--container-paddding);
	color: var(--vscode-foreground);
	font-size: var(--vscode-font-size);
	font-weight: var(--vscode-font-weight);
	font-family: var(--vscode-font-family);
	background-color: var(--vscode-editor-background);
}

ol,
ul {
	padding-left: var(--container-paddding);
}

body > *,
form > * {
	margin-block-start: var(--input-margin-vertical);
	margin-block-end: var(--input-margin-vertical);
}

*:focus {
	outline-color: var(--vscode-focusBorder) !important;
}

a {
	color: var(--vscode-textLink-foreground);
}

a:hover,
a:active {
	color: var(--vscode-textLink-activeForeground);
}

code {
	font-size: var(--vscode-editor-font-size);
	font-family: var(--vscode-editor-font-family);
}

button {
	border: none;
	padding: var(--input-padding-vertical) var(--input-padding-horizontal);
	width: 100%;
	text-align: center;
	outline: 1px solid transparent;
	outline-offset: 2px !important;
	color: var(--vscode-button-foreground);
	background: var(--vscode-button-background);
}

button:hover {
	cursor: pointer;
	background: var(--vscode-button-hoverBackground);
}

button:focus {
	outline-color: var(--vscode-focusBorder);
}

button.secondary {
	color: var(--vscode-button-secondaryForeground);
	background: var(--vscode-button-secondaryBackground);
}

button.secondary:hover {
	background: var(--vscode-button-secondaryHoverBackground);
}

input:not([type='checkbox']),
textarea {
	display: block;
	width: 100%;
	border: none;
	font-family: var(--vscode-font-family);
	padding: var(--input-padding-vertical) var(--input-padding-horizontal);
	color: var(--vscode-input-foreground);
	outline-color: var(--vscode-input-border);
	background-color: var(--vscode-input-background);
}

input::placeholder,
textarea::placeholder {
	color: var(--vscode-input-placeholderForeground);
}

```

</details>

![vscodeCssSvelte.gif](/DocumentationImages/Root-README-Images/vscodeCssSvelte.gif)

28:10 Now we can alter the file, '/src/UiProviders/SolutionExplorerWebviewProvider.ts' and the method within that file, 'getWebviewContent(webview: vscode.Webview)'

``` typescript
private getWebviewContent(webview: vscode.Webview) {
    const dotNetIdeSvelteAppJavaScriptUri = webview.asWebviewUri(vscode.Uri.joinPath(
      this.context.extensionUri, 'out/svelte-typescript-app', 'svelte-typescript-app.js'));

    const dotNetIdeSvelteAppCssUri = webview.asWebviewUri(vscode.Uri.joinPath(
      this.context.extensionUri, 'out/svelte-typescript-app', 'svelte-typescript-app.css'));

    const resetCssUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, "media", "reset.css")
    );

    const vSCodeCssUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, "media", "vscode.css")
    );

    return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="${resetCssUri}" rel="stylesheet">
      <link href="${vSCodeCssUri}" rel="stylesheet">
      <link href="${dotNetIdeSvelteAppCssUri}" rel="stylesheet">
	  <script>
		const tsVscode = acquireVsCodeApi();
	</script>
  </head>
  <body>
	  <script src="${dotNetIdeSvelteAppJavaScriptUri}"></script>
  </body>
  </html>`;
}
```
![alterForVscodeCss.gif](/DocumentationImages/Root-README-Images/alterForVscodeCss.gif)

28:10 Build the Svelte application and then run it. The button now appears with Visual Studio Code's css applied.

> npm run build

![buttonIncrementVscodeCss.gif](/DocumentationImages/Root-README-Images/buttonIncrementVscodeCss.gif)

28:20 And that's the end of me building the extension again from scratch. The Nuget Package Manager works in the same way as the Solution Explorer from a Visual Studio Code extension webview standpoint. The actual Svelte code is not the same of course.