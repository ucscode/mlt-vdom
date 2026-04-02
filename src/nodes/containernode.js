import { ElementNode } from './elementnode.js';
import { NODE_TYPE } from '../libs/constants.js';

export class ContainerNode extends ElementNode {
    getType() {
        return NODE_TYPE.ELEMENT;
    }

    add(node) {
        const validatedNode = this._normalizeAndValidate(node);
        if (!this.factory.content.includes(validatedNode)) {
            this.factory.content.push(validatedNode);
        }
        return this;
    }

    remove(node) {
        const index = this.factory.content.indexOf(node);
        if (index !== -1) {
            this.factory.content.splice(index, 1);
        }
        return this;
    }
}
