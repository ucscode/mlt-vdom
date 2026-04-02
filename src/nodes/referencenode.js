import { ElementNode } from './elementnode.js';
import { NODE_TYPE } from '../libs/constants.js';

export class ReferenceNode extends ElementNode {
    getType() {
        return NODE_TYPE.REFERENCE;
    }

    link(node) {
        const validatedNode = this._normalizeAndValidate(node);

        if (this.factory.content.length > 0) {
            throw new Error(
                `Link Error: <${this.factory.tagName}> already has a linked reference. Call .unlink() first.`
            );
        }

        this.factory.content = [validatedNode];
        this._syncProducerAttribute();
        return this;
    }

    unlink() {
        this.factory.content = [];
        this._syncProducerAttribute();
        return this;
    }
}
