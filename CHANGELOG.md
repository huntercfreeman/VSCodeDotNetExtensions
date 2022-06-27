# Change Log

All notable changes to the "dot-net-ide" extension will be documented in this file.

## [1.0.0] - 2022-06-18 (Initial Release)
### Added
- Solution Explorer
    - Toggle Control Buttons
        - New Solution with the default Name, or a provided name
        - Reload Solutions in Workspace
    - Select html element for choosing the .sln file to use. User can choose from any of the .sln files that are in their Visual Studio Code workspace.
    - Tree View Context Menu Options
        - Any file clicked will cause the Visual Studio Code folder explorer to sync its active file.
            - Folder explorer scrolls to active file
            - Folder explorer highlights active file
            - This functionality of syncing with the folder explorer is intended to allow for typical editing ContextMenu options that currently do not exist.
                - Cut
                - Copy
                - Paste
                - Rename
                - Delete
            - One can and it is recommended, to use the mouse and drag the .NET IDE extension's icon from the sidebar, and place it inside the sidebar panel that shows the Folder Explorer.
                - Dragging the .NET IDE extension's icon over the Visual Studio Code Folder Explorer icon on the sidebar will open the sidebar.
                - Following this one can place the .NET IDE Solution Explorer, and Nuget Package Manager underneath the Folder Explorer and on the same side panel.
                - If one then does non .NET development they can right click the .NET IDE webview titles in the vscode sidebar and vscode allows one to click a context menu options to 'Reset Location'.
        - Solution File (.sln)
            - New C# project
            - Add existing C# project
            - Refresh child files
        - C# Project (.csproj)
            - Create templated file
            - Create empty file
            - Create directory
            - Remove Project (no files are deleted)
            - Refresh child files
            - Start without debugging
            - Start with debugging
            - Put in solution folder
        - C# Project Dependencies
            - No context menu options for this item.
        - C# Project Nuget Packages List
            - Refresh child files
        - C# Project Nuget Package Entry
            - Remove nuget package reference
        - C# Project, Project References List
            - Refresh child files
            - Add project reference
        - C# Project, Project Reference Entry
            - Remove project reference
        - Directories
            - Create templated file
            - Create empty file
            - Create directory
            - Refresh child files
        - Files
            - No context menu options for this item
    - Tree View nesting of file patterns.
        - razor files
            - Nest when the filename is the same but with .cs
                - Ex: 'MyComponent.razor' and 'MyComponent.razor.cs'
            - Nest when is the same but with .css
                - Ex: 'MyComponent.razor' and 'MyComponent.razor.css'
        - json files
            - Nest when the beginning of the filename is the same, the ending of the filename is the same, and the middle of the filename is different. The delimiter for beginning, middle, end is a '.' character (period).
                - Ex: 'appsettings.json' and 'appsettings.Development.json'
    - Tree View will render filenames that are considered 'unique' differently from other files of the same extension. As well these 'unique' files come before others of the same extension.
        - The folder wwwroot
        - The folder Properties
- Nuget Package Manager
    - Nuget Package Manager will sync with the Solution Explorer when the .sln file is modified or changed to an entirely different file.
    - Toggle control buttons
        - Sync Active .NET Solution from Solution Explorer
            - Fire off a one time per click forced sync attempt with the Solution Explorer.
    - Active Solution Display
    - Select html element for choosing the .csproj file to add chosen nuget package to.
        - Solution Folders will not show up in this list.
    - Text input field to allow user to alter their query string before it is sent.
        - The query that will be sent is interpolated with their text input field value on every keystroke.
    - Checkbox html element to allow user to toggle the inclusion of pre release nuget packages.
    - The website source of the nuget packages is displayed to the user.
    - The chosen Project to modify is displayed to the user.
    - Send GET Request button to submit form
    - Iterate and render out as separate expandable sections the Nuget Packages from the Get Request.
        - The expandable section when not expanded only displays the nuget package's Title and the total count of the downloads accross all versions of the nuget package.
    - Upon expanding a nuget package section one can choose the version number of the nuget package to reference.
        - The first version of the nuget package reference that is selected by default is the most recent version.
        - The select html element displays all versions of the nuget package.
        - Picking a nuget package version will update the user interface accordingly.
    - The chosen version of the nuget package is displayed to the user.
        - As well the downloads of that specific version are displayed.
    - A button to add the nuget package to the selected .csproj
        - The selected .csproj is displayed on the button.
    - A 'description' expandable section.
    - A 'summary' expandable section.
    - A 'Meta Data' expandable section.
- General Code Decisions
    - Namespaces are calculated by the extension and interpolated into any templated files that need them.
    - The RootNamespace of the .csproj is parsed from the .csproj file and used if provided.
    - The TargetFramework of the .csproj is parsed from the .csproj file.
    - Parsers
        - An XML Parser
            - Used for the .csproj files.
        - A .sln file parser
            - Used for the .NET Solution files.
    - File Path standardization
    - All ambiguous file path strings are parsed to be an AbsoluteFilePath class and a calculation is performed if given a relative path from an absolute path.
    - The messaging between Visual Studio Code and the webviews is done via a typed system. This consists of the interface IMessage, and the MessageHandlers which receive an IMessage.
    - Svelte Applications
        - Nuget Package Manager Webview
        - Solution Explorer Webview
    - Many constants are clearly defined

## [1.1.0] - 2022-06-21
### Added
- Solution Explorer
    - Tree View Context Menu Options
        - Added Cut
        - Added Copy
        - Added Paste
        - Added Rename
        - Added Delete

## [1.2.0] - 2022-06-22
### Added
- F# Support

## [1.2.1] - 2022-06-22
### Added
- .vcxproj files have their the filters parsed and the solution explorer shows files matched by the extensions specified.
- Renaming a file will invoke a refresh on its parent container showing the new name for the file instead of requiring manual refresh.

## [1.3.0] - 2022-06-24

### Added
- Support for the typical arrow key movement expected in a TreeView.
    - 'h', 'j', 'k', 'l' were also mapped to the corresponding arrow keys in regards to Vim
- 'Enter' key opens the selected file in the TreeView
- 'Space' previews the selected file in the TreeView
- Right clicking a file in the tree view will give it a border to more obviously indicate it is the one that was right clicked.
- Single clicking a file in the tree view will set that file as the 'active' file in regards to keyboard responses.
- Single clicking a file in the tree view will preview the file in vscode.
- Double clicking a file in the tree view will set that file as the 'active' file in regards to keyboard responses
- Double clicking a file in the tree view will open the file in vscode
- When the selected file in the TreeView changes, if that selected file is not within the viewport the solution explorer will scroll accordingly so it is visible.

## [1.3.1] - 2022-06-25

### Added
- Bug Fixes
    - scrollIntoView on an undefined html element
    - calls to old methods that no longer exist causing an exception

## [1.3.2] - 2022-06-26

### Added
- Bug Fixes
    - Memory leak when subscribing to Svelte Store
- File Extension Support
    - JavaScript (.js)
    - TypeScript (.ts)
    - C (.c)
    - C++ (.cpp)
- Light Theme
    - Fix coloring issues that made certain UI elements hard to see

## [1.4.0] - 2022-06-27

### Added
- Context Menu keyboard presses work
    - Shift + F10
    - Dedicated Context Menu button
- Movement up and down the an opened context menu with arrowkeys.
- Using arrow keys to navigate the context menu will appropriately set focus to that context menu option
- The currently focused context menu option has a border
- Hitting 'Enter' will execute the 'OnClick' of the currently focused context menu option
- To move within a context menu option after it is 'Enter' keyed use 'tab' and 'shift + tab'
- 'Escape' will close the context menu if a context menu option is focused
- If there is no active ide file (for example immediately after selecting .sln one must click an ide file to start using keyboard movement) hitting a keyboard movement will put the .sln as active
- It is believed one could do everything in the Solution Explorer with only their keyboard in this update.
- The vscode command: 'View: Focus on Solution Explorer View' allows one to focus the Solution Explorer webview without using their mouse.
    - I have this mapped to 'alt + s' where s is for solution explorer.
    - I also mapped 'alt + a' to 'View: Focus Active Editor Group'. This will set focus the last focused editor one was using even if there is a split view the most recent of then split view will get focus. The a is for active.
- OnClick of a context menu option will set focus to it. (Should it not be something like 'copy' where the context menu is told to close after the button is pressed.)
- Indicate to user whether the solution explorer is in focus by making the active IdeFile have a background-color that indicates inactivity and is visually different from the background-color used when in focus.

---

## Keep this keepachangelog link
Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.