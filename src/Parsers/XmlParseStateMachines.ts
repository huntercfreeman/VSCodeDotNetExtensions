import { ConstantsXmlFile } from "../Constants/ConstantsXmlFile";
import { endOfFile } from "./CommonParserUtility";
import { StringReader } from "./StringReader";

export class XmlParser {
    constructor(private readonly content: string) {
        this._stringReader = new StringReader(content);
    }

    private _stringReader!: StringReader;

    public parse(): XmlFileModel {
        this._stringReader = new StringReader(this.content);

        let xmlFileModel = new XmlFileModel();

        let fileXmlParseStateMachine =
            new FileXmlParseStateMachine(this._stringReader,
                xmlFileModel);

        fileXmlParseStateMachine.parseRecursively();

        return xmlFileModel;
    }
}

export abstract class XmlParseStateMachineBase {
    constructor(protected readonly stringReader: StringReader) {
    }

    public abstract parseRecursively(): void;
}

export class FileXmlParseStateMachine extends XmlParseStateMachineBase {
    constructor(stringReader: StringReader,
        private readonly xmlFileModel: XmlFileModel) {
        super(stringReader);
    }

    public override parseRecursively() {
        let currentCharacter: string = "";

        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {
            switch (currentCharacter) {
                case ConstantsXmlFile.START_OF_OPENING_XML_TAG: {
                    let xmlTagModel = new XmlTagModel();

                    this.xmlFileModel.xmlTagModels.push(xmlTagModel);

                    let tagXmlParseStateMachine =
                        new TagXmlParseStateMachine(this.stringReader,
                            xmlTagModel);

                    tagXmlParseStateMachine.parseRecursively();
                    break;
                }
                default: {
                    let xmlTextModel = new XmlTextModel();

                    this.xmlFileModel.xmlTagModels.push(xmlTextModel);

                    let textXmlParseStateMachine =
                        new TextXmlParseStateMachine(this.stringReader,
                            xmlTextModel);

                    this.stringReader.skipBackwards(1);
                    textXmlParseStateMachine.parseRecursively();
                    this.stringReader.skipBackwards(1);

                    if (ConstantsXmlFile.ENDING_OF_XML_TAG_FOR_CHILD_CONTENT_CONTAINING_TAGS ===
                        this.stringReader.peek(1)) {

                        let _ = this.stringReader.consume(1);
                        return;
                    }
                    else if (ConstantsXmlFile.START_OF_OPENING_XML_TAG !==
                        this.stringReader.peek(1)) {

                        return;
                    }

                    break;
                }
            }
        }
    }
}

export class TagXmlParseStateMachine extends XmlParseStateMachineBase {
    constructor(stringReader: StringReader,
        private readonly xmlTagModel: XmlTagModel) {
        super(stringReader);
    }

    public override parseRecursively() {
        let tagNameXmlParseStateMachine =
            new TagNameXmlParseStateMachine(this.stringReader, this.xmlTagModel);

        tagNameXmlParseStateMachine.parseRecursively();

        this.stringReader.skipBackwards(1);

        let currentCharacter = "";

        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            let isTagEnding = false;
            for (let i = 0; i < ConstantsXmlFile.ENDINGS_OF_XML_TAG.length; i++) {

                let tagEnding = ConstantsXmlFile.ENDINGS_OF_XML_TAG[i];

                if (this.stringReader.isStartOfToken(tagEnding, currentCharacter)) {
                    isTagEnding = true;
                    break;
                }
            }

            if (isTagEnding) {
                if (this.stringReader.isStartOfToken(ConstantsXmlFile.ENDING_OF_XML_TAG_FOR_CHILD_CONTENT_CONTAINING_TAGS,
                    currentCharacter)) {

                    let xmlFileModel = new XmlFileModel();

                    this.xmlTagModel.children = xmlFileModel;

                    let fileXmlParseStateMachine =
                        new FileXmlParseStateMachine(this.stringReader,
                            xmlFileModel);

                    fileXmlParseStateMachine.parseRecursively();
                }
                else {
                    // ConstantsXmlFile.ENDING_OF_XML_TAG_FOR_CHILD_CONTENT_CONTAINING_TAGS is 1 character
                    // ConstantsXmlFile.ENDING_OF_XML_TAG_FOR_EMPTY_CONTAINING_TAGS is 2 characters
                    //
                    // Calling this.stringReader.consume(1); evens out the character length in this situation.
                    let _ = this.stringReader.consume(1);
                }

                break;
            }

            if (currentCharacter !== ' ') {
                let xmlAttributeModel = new XmlAttributeModel();

                this.xmlTagModel.xmlAttributeModels
                    .push(xmlAttributeModel);

                let tagAttributeXmlParseStateMachine =
                    new TagAttributeXmlParseStateMachine(this.stringReader, xmlAttributeModel);

                this.stringReader.skipBackwards(1);
                tagAttributeXmlParseStateMachine.parseRecursively();
            }
        }
    }
}

export class TagNameXmlParseStateMachine extends XmlParseStateMachineBase {
    constructor(stringReader: StringReader,
        private readonly xmlTagModel: XmlTagModel) {
        super(stringReader);
    }

    public override parseRecursively() {
        let currentCharacter = "";

        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {
            let isTagEnding = false;
            for (let i = 0; i < ConstantsXmlFile.ENDINGS_OF_XML_TAG.length; i++) {

                let tagEnding = ConstantsXmlFile.ENDINGS_OF_XML_TAG[i];

                if (this.stringReader.isStartOfToken(tagEnding, currentCharacter)) {
                    isTagEnding = true;
                    break;
                }
            }

            if (isTagEnding) {
                break;
            }

            let nameIsEnding = false;
            switch (currentCharacter) {
                case ' ':
                    nameIsEnding = true;
                    break;
                default:
                    this.xmlTagModel.tagName += currentCharacter;
                    break;
            }

            if (nameIsEnding) {
                break;
            }
        }
    }
}

export class TagAttributeXmlParseStateMachine extends XmlParseStateMachineBase {
    constructor(stringReader: StringReader,
        private readonly xmlAttributeModel: XmlAttributeModel) {
        super(stringReader);
    }

    public override parseRecursively() {
        let currentCharacter = this.stringReader.peek(1);

        for (; ;) {
            if (endOfFile(currentCharacter = this.stringReader.consume(1)) ||
                currentCharacter !== ' ') {

                break;
            }
        }

        let tagAttibuteNameXmlParseStateMachine =
            new TagAttibuteNameXmlParseStateMachine(this.stringReader,
                this.xmlAttributeModel);

        this.stringReader.skipBackwards(1);
        tagAttibuteNameXmlParseStateMachine.parseRecursively();

        let tagAttibuteValueXmlParseStateMachine =
            new TagAttibuteValueXmlParseStateMachine(this.stringReader,
                this.xmlAttributeModel);

        tagAttibuteValueXmlParseStateMachine.parseRecursively();
    }
}

export class TagAttibuteNameXmlParseStateMachine extends XmlParseStateMachineBase {
    constructor(stringReader: StringReader,
        private readonly xmlAttributeModel: XmlAttributeModel) {
        super(stringReader);
    }

    public override parseRecursively() {
        let currentCharacter = "";

        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {
            let isTagEnding = false;
            for (let i = 0; i < ConstantsXmlFile.ENDINGS_OF_XML_TAG.length; i++) {

                let tagEnding = ConstantsXmlFile.ENDINGS_OF_XML_TAG[i];

                if (this.stringReader.isStartOfToken(tagEnding, currentCharacter)) {
                    break;
                }
            }

            if (isTagEnding) {
                break;
            }

            let attributeNameIsEnding = false;
            switch (currentCharacter) {
                case '=':
                    if (this.stringReader.peek(1) === '"') {
                        let _ = this.stringReader.consume(1);
                        attributeNameIsEnding = true;
                        break;
                    }
                default:
                    this.xmlAttributeModel.attributeName += currentCharacter;
                    break;
            }

            if (attributeNameIsEnding) {
                break;
            }
        }
    }
}

export class TagAttibuteValueXmlParseStateMachine extends XmlParseStateMachineBase {
    constructor(stringReader: StringReader,
        private readonly xmlAttributeModel: XmlAttributeModel) {
        super(stringReader);
    }

    public override parseRecursively() {
        let currentCharacter = "";

        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {
            let isTagEnding = false;
            for (let i = 0; i < ConstantsXmlFile.ENDINGS_OF_XML_TAG.length; i++) {

                let tagEnding = ConstantsXmlFile.ENDINGS_OF_XML_TAG[i];

                if (this.stringReader.isStartOfToken(tagEnding, currentCharacter)) {
                    break;
                }
            }

            if (isTagEnding) {
                break;
            }

            let attributeValueIsEnding = false;
            switch (currentCharacter) {
                case '\"':
                    attributeValueIsEnding = true;
                    break;
                default:
                    this.xmlAttributeModel.attributeValue += currentCharacter;
                    break;
            }

            if (attributeValueIsEnding) {
                break;
            }
        }
    }
}

export class TextXmlParseStateMachine extends XmlParseStateMachineBase {
    constructor(stringReader: StringReader,
        private readonly xmlTextModel: XmlTextModel) {

        super(stringReader);
    }

    public override parseRecursively() {
        let currentCharacter = "";

        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            if (this.stringReader.isStartOfToken(ConstantsXmlFile.START_OF_CLOSING_XML_TAG, currentCharacter)) {
                break;
            }

            if (this.stringReader.isStartOfToken(ConstantsXmlFile.START_OF_OPENING_XML_TAG, currentCharacter)) {
                return;
            }

            this.xmlTextModel.text += currentCharacter;
        }

        // Getting here indicates ConstantsXmlFile.START_OF_CLOSING_XML_TAG
        // so skip until after the closing tag as closing tag has no data

        while (!endOfFile(currentCharacter = this.stringReader.consume(1))) {

            if (this.stringReader
                .isStartOfToken(ConstantsXmlFile.ENDING_OF_XML_TAG_FOR_CHILD_CONTENT_CONTAINING_TAGS,
                    currentCharacter)) {

                return;
            }
        }
    }
}

/**
 * An XmlFileModel is recursively defined, see the following example:
 *
 * (I am not sure why vscode peek renders this weirdly so use 'go to definition' for source code comment)
 *  
 * '\r\n
 * <ParentTag>\r\n
 *     <ChildTag>\r\n
 *     </ChildTag>\r\n
 * </ParentTag>\r\n'
 * 
 * The XmlFileModel itself is the entirety of what represents the .xml file
 * 
 * However, any so called 'ChildContent' is represented as well
 * by an XmlFileModel as the parsing is identical. 
 */
export class XmlFileModel {
    public xmlTagModels: XmlTagModel[] = [];

    public selectRecursively(predicate: (xmlTagModel: XmlTagModel) => boolean,
        matches: XmlTagModel[]) {

        for (let i = 0; i < this.xmlTagModels.length; i++) {
            let tagModel = this.xmlTagModels[i];

            if (predicate(tagModel)) {
                matches.push(tagModel);
            }

            tagModel.children.selectRecursively(predicate, matches);
        }
    }
}

export class XmlTagModel {
    public tagName: string = "";
    public xmlAttributeModels: XmlAttributeModel[] = [];
    public children: XmlFileModel = new XmlFileModel();
}

export class XmlTextModel extends XmlTagModel {
    public text: string = "";
}

export class XmlAttributeModel {
    public attributeName: string = "";
    public attributeValue: string = "";
}
