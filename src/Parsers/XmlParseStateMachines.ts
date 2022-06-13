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
                case ConstantsXmlFile.START_OF_XML_TAG: {
                    let xmlTagModel = new XmlTagModel();

                    this.xmlFileModel.xmlTagModels.push(xmlTagModel);

                    let tagXmlParseStateMachine =
                        new TagXmlParseStateMachine(this.stringReader,
                            xmlTagModel);

                    tagXmlParseStateMachine.parseRecursively();
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

            let xmlAttributeModel = new XmlAttributeModel();

            let tagAttributeXmlParseStateMachine = 
                new TagAttributeXmlParseStateMachine(this.stringReader, xmlAttributeModel);

            tagAttributeXmlParseStateMachine.parseRecursively();
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
        
        for (;;) {
            if (endOfFile(currentCharacter = this.stringReader.consume(1)) ||
                currentCharacter !== ' ') {
                    
                    break;
            }
        }

        let tagAttibuteNameXmlParseStateMachine = 
            new TagAttibuteNameXmlParseStateMachine(this.stringReader, 
                this.xmlAttributeModel);

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
                case '\"':
                    attributeNameIsEnding = true;
                    break;
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

export class TagChildContentXmlParseStateMachine extends XmlParseStateMachineBase {
    constructor(stringReader: StringReader) {
        super(stringReader);
    }

    public override parseRecursively() {
    }
}

export class TextXmlParseStateMachine extends XmlParseStateMachineBase {
    constructor(stringReader: StringReader) {
        super(stringReader);
    }

    public override parseRecursively() {
    }
}

export class XmlFileModel {
    public xmlTagModels: XmlTagModel[] = [];
}

export class XmlTagModel {
    public tagName: string = "";
    public xmlAttributeModels: XmlAttributeModel[] = [];
    public children: XmlTagModel[] = [];
}

export class XmlTextModel extends XmlTagModel {
    constructor(public readonly text: string) {
        super();

    }
}

export class XmlAttributeModel {
    public attributeName: string = "";
    public attributeValue: string = "";
}
