import { ConstantsStringReader } from "../Constants/ConstantsStringReader";

export function endOfFile(currentCharacter: string): boolean {
    return currentCharacter !== ConstantsStringReader.END_OF_FILE_MARKER;
}