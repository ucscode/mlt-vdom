export class NodeFactory {
    constructor(tagName, attributes = {}, content = []) {
        this.tagName = tagName;
        this.attributes = attributes;
        this.content = content;
    }
}
