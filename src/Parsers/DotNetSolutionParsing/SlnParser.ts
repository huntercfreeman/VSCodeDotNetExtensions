import { SolutionModel } from "../../DotNet/SolutionModel";
import { StringReader } from "../StringReader";
import { FileSlnParseStateMachine } from "./FileSlnParseStateMachine";

/**
 * The '-------' lines surround what is INTENDED to be parsed should the code work as I intend
 */
export class SlnParser {
    constructor(private readonly content: string,
        private readonly solutionModel: SolutionModel) {
        this._stringReader = new StringReader(content);
    }

    private _stringReader!: StringReader;

    public parseIntoSolutionModel() {
        this._stringReader = new StringReader(this.content);

        let fileSlnParseStateMachine =
            new FileSlnParseStateMachine(this._stringReader,
                this.solutionModel);

        fileSlnParseStateMachine.parseRecursively();
    }
}