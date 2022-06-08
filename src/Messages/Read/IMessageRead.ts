import * as vscode from 'vscode';
import { IMessage } from "../IMessage";
import { MessageReadKind } from "./MessageReadKind";

/**
 * Each IMessageRead implementations' filename is to read with this template:
 * 
 * `MessageRead${adjective | undefined}${noun}${preposition}${adjective | undefined}${noun}`
 * 
 * Example: `MessageReadFilesInDirectory`
 *     - MessageRead => Constant in every filename
 *     - Adjective | Undefined => Undefined
 *     - Noun => "Files"
 *     - Preposition => "In"
 *     - Adjective | Undefined => Undefined
 *     - Noun => "Directory"
 *     
 *    ---
 *     
 *     We can using the previous example discern that message is self documented to read the files in a directory and return them.
 */
export interface IMessageRead {
    readonly messageReadKind: MessageReadKind;
}