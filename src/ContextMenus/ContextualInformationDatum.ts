import { MessageBase } from "../Messages/MessageBase";
import { ContextualInformationDatumKind } from "./ContextualInformationDatumKind";

export class ContextualInformationDatum {
    /**
     * Used to display the ContextMenu when user right clicks or uses keyboard to active the ContextMenu
     */
    constructor(public readonly contextualInformationDatumKind: ContextualInformationDatumKind,
        message: MessageBase) {
    }
}