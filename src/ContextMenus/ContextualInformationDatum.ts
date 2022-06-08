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

    public static checkDatumEquality(datumOne: ContextualInformationDatum, datumTwo: ContextualInformationDatum) {
        return (datumOne.contextualInformationDatumKind === datumTwo.contextualInformationDatumKind) &&
            (datumOne.contextualInformationIdentifier === datumTwo.contextualInformationIdentifier);
    }
}