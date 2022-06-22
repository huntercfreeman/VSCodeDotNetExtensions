import { MessageExecuteKind } from "./MessageExecuteKind";

/**
 * Each IMessageExecute implementations' filename is to Execute with this template:
 * 
 * `MessageExecute${adjective | undefined}${noun}${* (WildCard) | undefined}`
 *
 * 
 * Example: `MessageExecuteProjectWithoutDebugging`
 *     - MessageExecute => Constant in every filename
 *     - Adjective | Undefined => Undefined
 *     - Noun => "Project"
 *     - * (WildCard) => "Without Debugging"
 *     
 *    ---
 *     
 *     We can using the previous example discern that message is self documented to start the C# Project.
 * 
 *     The filename template for IMessageExecute necesitates more flexibility than the other filename templates.
 *     as such a * (WildCard) is used at the end to allow for extra descriptive information.
 */
export interface IMessageExecute {
    readonly messageExecuteKind: MessageExecuteKind;
}