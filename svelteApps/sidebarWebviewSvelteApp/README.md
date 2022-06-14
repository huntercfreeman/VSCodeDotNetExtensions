# SidebarWebview

The extension renders a webview in the sidebar.

This directory contains the source code for the sidebar webview.

# Programming Language

TypeScript and JavaScript

# UI Framework

Svelte

# Brief description of this application

The application is mostly a TreeView display.

The application has a context menu component that can be accessed with the mouse button of 'Right Click'

Many of the context menu options available wrap the already existing dotnet CLI ([https://docs.microsoft.com/en-us/dotnet/core/tools/](https://docs.microsoft.com/en-us/dotnet/core/tools/)).

# Important ideas to follow when developing

- When adding new context menu options it is important that the dotnet CLI perform the action when possible.
    - In otherwords, be sure to check the dotnet CLI before writing a feature.
- What if dotnet CLI does not have ability to perform the desired action?
    - Ensure the implementation works with unit tests.
    - The context menu options are not UI based tests. The context menu is solely a user interface to the code. So, a unit test should be able to prove correctness.

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