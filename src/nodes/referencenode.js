import { ElementNode } from './elementnode.js';
import { ALLOWED_REFERENCES } from '../libs/constants.js';

export class ReferenceNode extends ElementNode {
    constructor(tagName, attributes, content) {
        super(tagName, attributes, content);
        /**
         * Private reference to the actual MltNode instance.
         * This is NOT part of this.factory.content, so it is
         * invisible to the XML build process.
         */
        this._boundNode = null;
    }

    bind(node) {
        const myTag = this.factory.tagName;
        const targetTag = node?.factory?.tagName;

        // 1. Structural Validation
        const validTargets = ALLOWED_REFERENCES[myTag] || [];
        if (!validTargets.includes(targetTag)) {
            throw new Error(`bind Error: <${myTag}> cannot bind to <${targetTag}>.`);
        }

        // 2. State/Safety Check
        if (this.getAttribute('producer')) {
            throw new Error(`bind Error: <${myTag}> is already bound. Unbind first.`);
        }

        const id = node.getAttribute('id');
        if (!id) {
            throw new Error(`bind Error: Target <${targetTag}> must have an 'id'.`);
        }

        // 3. The logical link (For the XML)
        this.setAttribute('producer', id);

        // 4. The physical link (For the Developer/State)
        this._boundNode = node;

        return this;
    }

    unbind() {
        this.removeAttribute('producer');
        this._boundNode = null;
        return this;
    }

    getBoundNode() {
        return this._boundNode;
    }
}
