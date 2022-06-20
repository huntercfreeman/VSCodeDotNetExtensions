import * as vscode from 'vscode';
import { ConstantsTerminal } from '../Constants/ConstantsTerminal';

export class TerminalService {
    public static getGeneralUseTerminal() {
        let messageCreateTerminal = vscode.window.terminals.find(x => x.name === ConstantsTerminal.GENERAL_USE_TERMINAL_NAME);

        if (!messageCreateTerminal) {
            messageCreateTerminal = vscode.window.createTerminal(ConstantsTerminal.GENERAL_USE_TERMINAL_NAME);
        }

        return messageCreateTerminal;
    }

    public static getProgramExecutionTerminal() {
        let messageCreateTerminal = vscode.window.terminals.find(x => x.name === ConstantsTerminal.PROGRAM_EXECUTION_TERMINAL_NAME);

        if (!messageCreateTerminal) {
            messageCreateTerminal = vscode.window.createTerminal(ConstantsTerminal.PROGRAM_EXECUTION_TERMINAL_NAME);
        }

        return messageCreateTerminal;
    }
}