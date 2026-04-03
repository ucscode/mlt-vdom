import { MltNode } from './mltnode.js';

export class TextNode extends MltNode {
    constructor(value) {
        super();
        this.text = String(value);
    }

    // Text nodes only need to implement the build contract
    build(doc) {
        return doc.createTextNode(this.text);
    }
}
