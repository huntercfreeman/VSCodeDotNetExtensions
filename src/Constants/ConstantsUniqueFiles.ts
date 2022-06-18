/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantsUniqueFiles {
    public static readonly WWW_ROOT_FILENAME_NO_EXTENSION: string = "wwwroot";
    public static readonly PROPERTIES_FILENAME_NO_EXTENSION: string = "Properties";
    public static readonly DEBUG_FILENAME_NO_EXTENSION: string = "bin";
    public static readonly OBJ_FILENAME_NO_EXTENSION: string = "obj";
    
    public static readonly ALL_UNIQUE_FILENAME_NO_EXTENSION: string[] = [
        this.WWW_ROOT_FILENAME_NO_EXTENSION,
        this.DEBUG_FILENAME_NO_EXTENSION,
        this.OBJ_FILENAME_NO_EXTENSION,
        this.PROPERTIES_FILENAME_NO_EXTENSION
    ];

    public static readonly ALL_IGNORED_UNIQUE_FILENAME_NO_EXTENSION: string[] = [
        this.DEBUG_FILENAME_NO_EXTENSION,
        this.OBJ_FILENAME_NO_EXTENSION
    ];
}