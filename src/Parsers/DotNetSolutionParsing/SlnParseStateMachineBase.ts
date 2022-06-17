import { StringReader } from "../StringReader";

export abstract class SlnParseStateMachineBase {
    constructor(protected readonly stringReader: StringReader) {
    }

    public abstract parse(): void;
}