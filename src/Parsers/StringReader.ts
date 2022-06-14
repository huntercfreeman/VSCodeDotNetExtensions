import { ConstantsStringReader } from "../Constants/ConstantsStringReader";

export class StringReader {
    private _position: number = 0;
    private _inputLength: number;

    constructor(private readonly input: string) {
        this._inputLength = input.length;
    }

    /**
     * 
     * @param length This does not relate to indices. A length of 1 returns 1 character inclusive with current position. A length of 0 returns 0 characters.
     * @returns The substring that spans the length specified inclusive with the current position. Returns END_OF_FILE_MARKER anytime a character out of bounds of the length of the string is attempted to be accessed.
     */
    public peek(length: number): string {
        let substring = "";

        let virtualPosition = this._position;

        for (let i = 0; i < length; i++) {
            substring += this.peekCharacterAt(virtualPosition++);
        }

        return substring;
    }

    public consume(length: number): string {
        let substring = "";

        for (let i = 0; i < length; i++) {
            substring += this.consumeCharacter();
        }

        return substring;
    }

    public skipForwards(length: number): void {
        this._position += length;
    }

    /**
     * 
     * This method is used most often in the case where
     * .consume(...) is called in a situation where two separate
     * state machines end up needing access to the same character
     * 
     * @param length 
     */
    public skipBackwards(length: number): void {
        this._position -= length;

        this._position = this._position < 0
            ? 0
            : this._position;
    }

    public isStartOfToken(startOfToken: string, currentCharacter: string): boolean {
        if (startOfToken.startsWith(currentCharacter)) {
            if (startOfToken ===
                (currentCharacter + this.peek(startOfToken.length - 1))) {
                return true;
            }
        }

        return false;
    }

    private peekCharacterAt(virtualPosition: number): string {
        if (virtualPosition < this._inputLength) {
            return this.input[virtualPosition];
        }

        return ConstantsStringReader.END_OF_FILE_MARKER;
    }

    private consumeCharacter(): string {
        if (this._position < this._inputLength) {
            return this.input[this._position++];
        }

        return ConstantsStringReader.END_OF_FILE_MARKER;
    }
}