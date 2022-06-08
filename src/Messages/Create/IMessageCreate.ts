import { MessageCreateKind } from "./MessageCreateKind";

/**
 * Each IMessageCreate implementations' filename is to read with this template:
 * 
 * `MessageCreate${adjective | undefined}${noun}${preposition}${adjective | undefined}${noun}`
 * 
 * Example: `MessageCreateEmptyFileInDirectory`
 *     - MessageCreate => Constant in every filename
 *     - Adjective | Undefined => "Empty"
 *     - Noun => "File"
 *     - Preposition => "In"
 *     - Adjective | Undefined => Undefined
 *     - Noun => "Directory"
 *     
 *    ---
 *     
 *     We can using the previous example discern that message is self documented to create an empty file in a directory.
 */
export interface IMessageCreate {
    readonly messageCreateKind: MessageCreateKind;
}