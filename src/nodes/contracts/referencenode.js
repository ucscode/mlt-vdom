import { ElementNode } from './elementnode.js';
import { ALLOWED_REFERENCES } from '../../constants/mlt-ref-anatomy.js';

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
        const tagName = this.factory.tagName;
        const targetTag = node?.factory?.tagName;

        // 1. Structural Validation
        const validTargets = this._allowedReferenceTags();
        if (!validTargets.includes(targetTag)) {
            throw new Error(`bind Error: <${tagName}> cannot bind to <${targetTag}>.`);
        }

        // 2. State/Safety Check
        if (this.getAttribute('producer')) {
            throw new Error(`bind Error: <${tagName}> is already bound. Unbind first.`);
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

    _allowedReferenceTags() {
        return ALLOWED_REFERENCES[this.factory.tagName] || [];
    }
}
