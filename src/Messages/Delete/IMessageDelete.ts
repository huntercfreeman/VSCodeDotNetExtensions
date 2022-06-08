import { MessageDeleteKind } from "./MessageDeleteKind";

/**
 * Each IMessageDelete implementations' filename is to read with this template:
 * 
 * `MessageDelete${adjective | undefined}${noun}${preposition}${adjective | undefined}${noun}`
 * 
 * Example: `MessageDeleteFileInDirectory`
 *     - MessageDelete => Constant in every filename
 *     - Adjective | Undefined => Undefined
 *     - Noun => "File"
 *     - Preposition => "In"
 *     - Adjective | Undefined => Undefined
 *     - Noun => "Directory"
 *     
 *    ---
 *     
 *     We can using the previous example discern that message is self documented to delete a file in a directory.
 */
export interface IMessageDelete {
    readonly messageDeleteKind: MessageDeleteKind;
}