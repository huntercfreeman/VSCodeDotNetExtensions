import { IMessage } from "../Messages/IMessage";
import { ContextualInformationDatumKind } from "./ContextualInformationDatumKind";

export class ContextualInformationDatum {
    /**
     * Used to display the ContextMenu when user right clicks or uses keyboard to active the ContextMenu
     */
    constructor(public readonly contextualInformationDatumKind: ContextualInformationDatumKind,
        public readonly contextualInformationIdentifier: string) {
    }

    public static readonly createNewEmptyFile: ContextualInformationDatum = 
        new ContextualInformationDatum(ContextualInformationDatumKind.create,
            "createNewEmptyFile");
    
    public static readonly createNewTemplatedFile: ContextualInformationDatum = 
        new ContextualInformationDatum(ContextualInformationDatumKind.create,
            "createNewTemplatedFile");
    
    public static readonly createDirectory: ContextualInformationDatum = 
        new ContextualInformationDatum(ContextualInformationDatumKind.create,
            "createDirectory");

    public static readonly createNewCSharpProject: ContextualInformationDatum = 
        new ContextualInformationDatum(ContextualInformationDatumKind.create,
            "createNewCSharpProject");
    
    public static readonly addExistingCSharpProject: ContextualInformationDatum = 
        new ContextualInformationDatum(ContextualInformationDatumKind.create,
            "addExistingCSharpProject");
    
    public static readonly refreshChildFiles: ContextualInformationDatum = 
        new ContextualInformationDatum(ContextualInformationDatumKind.read,
            "refreshChildFiles");

    public static readonly startWithoutDebugging: ContextualInformationDatum = 
        new ContextualInformationDatum(ContextualInformationDatumKind.execute,
            "startWithoutDebugging");
    
    public static readonly rename: ContextualInformationDatum = 
        new ContextualInformationDatum(ContextualInformationDatumKind.update,
            "rename");
    
    public static readonly deleteFile: ContextualInformationDatum = 
        new ContextualInformationDatum(ContextualInformationDatumKind.delete,
            "deleteFile");
    
    public static readonly copyFile: ContextualInformationDatum = 
        new ContextualInformationDatum(ContextualInformationDatumKind.control,
            "copyFile");
    
    public static readonly cutFile: ContextualInformationDatum = 
        new ContextualInformationDatum(ContextualInformationDatumKind.control,
            "cutFile");

    public static readonly paste: ContextualInformationDatum = 
            new ContextualInformationDatum(ContextualInformationDatumKind.control,
                "paste");

    public static checkDatumEquality(datumOne: ContextualInformationDatum, datumTwo: ContextualInformationDatum) {
        return (datumOne.contextualInformationDatumKind === datumTwo.contextualInformationDatumKind) &&
            (datumOne.contextualInformationIdentifier === datumTwo.contextualInformationIdentifier);
    }
}