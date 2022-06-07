// https://stackoverflow.com/questions/26501688/a-typescript-guid-class

/**
 * Used for adding Solution Folders to Solutions.
 * Most if not all of the other features in dot-net-ide are done
 *      via the dotnet CLI.
 */
export class Guid {
    static newGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  }