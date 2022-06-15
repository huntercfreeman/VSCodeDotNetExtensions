# .NET IDE - Visual Studio Code Extension

The extension renders the following webviews:
- A solution explorer webview defaulted to being positioned in the sidebar.
- A nuget package manager webview defaulted to being positioned in the sidebar.

This directory contains the source code for the .NET IDE - Visual Studio Code Extension

# Programming Language

TypeScript and JavaScript

# Brief description of this application

This extension allows a user to manage multiple .sln files.

A solution explorer is rendered using a webview.

A nuget package manager is rendered using a webview.

Many of the features in this extension wrap the already existing dotnet CLI ([https://docs.microsoft.com/en-us/dotnet/core/tools/](https://docs.microsoft.com/en-us/dotnet/core/tools/)).

# How to Build this Extension

- Firstly if changes where made to the webviews that this extension renders they need to be built prior to the extension itself. The webviews compile javascript into [/out](/out) located at the root of the repository. The output javascript is referenced in the webview providers when they render their html.

- To build the extension I use Visual Studio Code directly as showcased in the following gif.

![howToBuildExtension.gif](/DocumentationImages/howToBuildExtension.gif)