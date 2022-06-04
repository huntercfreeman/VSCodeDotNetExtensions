export class AbsoluteFilePath {
    public get absoluteFilePathString(): string {
        return this._initialAbsoluteFilePathStringInput;
    }
    
    public set initialAbsoluteFilePathStringInput(value: string) {
        this._initialAbsoluteFilePathStringInput = value;
    }

    public get isDirectory(): boolean {
        return this._isDirectory;
    }

    constructor(private _initialAbsoluteFilePathStringInput: string, private _isDirectory: boolean) {
        
    }

    private _parentDirectories: AbsoluteFilePath[] = [];
}