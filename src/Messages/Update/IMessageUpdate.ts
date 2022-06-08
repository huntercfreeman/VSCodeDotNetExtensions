import { MessageUpdateKind } from "./MessageUpdateKind";

/**
 * Each IMessageUpdate implementations' filename is to Update with this template:
 * 
 * `MessageUpdate${adjective | undefined}${noun}${preposition}${adjective | undefined}${noun}`
 * 
 * Example: `MessageUpdateFilenameOfFile`
 *     - MessageUpdate => Constant in every filename
 *     - Adjective | Undefined => Undefined
 *     - Noun => "Filename"
 *     - Preposition => "Of"
 *     - Adjective | Undefined => Undefined
 *     - Noun => "File"
 *     
 *    ---
 *     
 *     We can using the previous example discern that message is self documented to Update the filename of a file.
 */
export interface IMessageUpdate {
    readonly messageUpdateKind: MessageUpdateKind;
}