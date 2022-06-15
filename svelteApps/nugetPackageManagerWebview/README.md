# Nuget Package Manager Webview

The extension renders a nuget package manager webview in the sidebar.

This directory contains the source code for the sidebar webview.

# Programming Language

TypeScript and JavaScript

# UI Framework

Svelte

# Brief description of this application

The application allows the user of the extension to search for Nuget Packages and add them to a Project of their choosing.

The already existing dotnet CLI is leveraged to add the nuget packages that are chosen ([https://docs.microsoft.com/en-us/dotnet/core/tools/](https://docs.microsoft.com/en-us/dotnet/core/tools/)).

# How to make HTTP GET request searches for nuget packages?

The dotnet CLI does not allow for searching nuget packages as shown in this github issue.

> https://github.com/dotnet/docs/issues/6393

One can extend the dotnet CLI using this github repository:

> https://github.com/billpratt/dotnet-search

Another resource was to a stackoverflow question where the response was:
- Short answer: It's not possible (as far as I know, as of Nov 25, 2019). 
- [How to list available package versions using the dotnet cli?](https://stackoverflow.com/questions/57742638/how-to-list-available-package-versions-using-the-dotnet-cli)
> 

If the repo 'dotnet-search' were to be used a user of this extension would then have to download the nuget package that extends dotnet CLI.

Should this approach be taken the results of the search would end up in the terminal. One could redirect the output from the terminal but I ended up going with a different approach.

I found on Microsoft's documentation however that you can send out requests 'manually' using your language of choice, the link to that follows.

> https://docs.microsoft.com/en-us/nuget/api/search-query-service-resource

Following what is stated in the documentation just previously linked works. However, I feel like I'm not doing this correctly.

My questions:

- Why does microsoft in the nuget api search query documentation make a request to https://azuresearch-usnc.nuget.org/query?q=NuGet.Versioning&prerelease=false&semVerLevel=2.0.0
- Whereas, when I looked into the 'dotnet-search' github repository he queries 'https://api-v2v3search-0.nuget.org/query?q=' as shown in the following image:

![dotnet-search-url-used](/DocumentationImages/dotnet-search-url.png)

I aim to continue reading up on this.

An additional issue is, how would one handle a private nuget server? Authentication needs to be ensured to be correctly done. I as such did not include private nuget servers.

# How to Build this Svelte Application

- While using a terminal change directory to where this README.md is located and this application's 'rollup.config.js' is located.
    - As of the writing of this README.md I currently type while in the root of this repository: 'cd svelteApps/nugetPackageManagerWebview' as an example.

    - After following the previous step you should be in the directory that contains this Svelte app's 'rollup.config.js'. The command to build is from this directory is:

> npm run build

---

- [rollup.config.js](rollup.config.js) specifies where the compiled javascript should be output to. As of writing this README.md the path is:

> ../../out/nugetPackageManagerWebview/nugetPackageManagerWebview.js

- (continuation of previous bullet). The takeaway is not the exact relative path as that likely will change, instead the takeaway is that the extension output goes into a folder named, 'out' at the root of the repository.

- The webview is rendered in Visual Studio Code by the following steps 

1: The TypeScript class [/src/UiProviders/NugetPackageManagerWebviewProvider.ts](/src/UiProviders/NugetPackageManagerWebviewProvider.ts)

``` typescript
private getWebviewContent(webview: vscode.Webview) {
    const dotNetIdeSvelteAppJavaScriptUri = webview.asWebviewUri(vscode.Uri.joinPath(
      this.context.extensionUri, 'out/nugetPackageManagerWebview', 'nugetPackageManagerWebview.js'));

    const dotNetIdeSvelteAppCssUri = webview.asWebviewUri(vscode.Uri.joinPath(
      this.context.extensionUri, 'out/nugetPackageManagerWebview', 'nugetPackageManagerWebview.css'));

    // take note that the compiled javascript is referenced here.

    // More code follows but is ommitted in this snippet
}
```

2: Inside [/src/extension.ts](/src/extension.ts)

``` typescript
const nugetPackageManagerProvider = new NugetPackageManagerWebviewProvider(context);

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
```
3: The root [package.json](/package.json) file. (this is the last step)

``` json
"activationEvents": [
    "onView:dot-net-ide.nuget-package-manager-webview"
    // others
],
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
                "id": "dot-net-ide.nuget-package-manager-webview",
                "name": "Nuget Package Manager",
                "icon": "media/nugetPackageManagerIcon.svg"
            }
            // others
        ]
    }
},
```

# Important ideas to follow when developing

- When adding new features it is important that the dotnet CLI perform the action when possible.
    - In otherwords, be sure to check the dotnet CLI before writing a feature.

- What if dotnet CLI does not have ability to perform the desired action?
    - Ensure the implementation works with pointed unit tests that are separated from the user interface.

# Not yet implemented

- General procedure of making HTTP GET requests for nuget packages is not clear when searching for documentation on it. 
    - Ensure the currently used solution is the correct way to do it.
- Authenticated private nuget repos
- Local nuget repos