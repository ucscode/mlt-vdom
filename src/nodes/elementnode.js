import { NodeFactory } from '../libs/factory.js';
import { ALLOWED_CHILDREN } from '../libs/constants.js';
import { MltNode } from './mltnode.js';
import { TextNode } from './textnode.js';

/**
 * Base class for all MLT Elements.
 * Handles attributes and validation logic, but does not provide
 * public methods for adding/linking children.
 */
export class ElementNode extends MltNode {
    constructor(tagName, attributes = {}, content = []) {
        super();

        // 1. Initialize factory so it's available for validation messages
        this.factory = new NodeFactory(
            tagName,
            { ...attributes },
            []
        );

        // 2. Normalize and Validate initial content
        const rawContent = Array.isArray(content)
            ? content
            : (content ? [content] : []);

        this.factory.content = rawContent.map((item) => {
            return this._normalizeAndValidate(item);
        });

        this._syncProducerAttribute();
    }

    setAttribute(k, v) {
        this.factory.attributes[k] = v;
        return this;
    }

    getAttribute(k) {
        return this.factory.attributes[k];
    }

    removeAttribute(k) {
        delete this.factory.attributes[k];
        return this;
    }

    getContents() {
        return [...this.factory.content];
    }

    indexOf(node) {
        return this.factory.content.indexOf(node);
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

    /**
     * INTERNAL: Normalizes input and validates against ALLOWED_CHILDREN
     * Prefixed with underscore to indicate "Protected" usage for subclasses.
     */
    _normalizeAndValidate(item) {
        const isText = typeof item === 'string' || typeof item === 'number';
        const node = isText ? new TextNode(item) : item;

        if (!(node instanceof MltNode)) {
            throw new Error(`Invalid Node: ${item} is not an instance of MltNode`);
        }

        const childTag = isText ? '#text' : node.factory?.tagName;
        const allowedTags = ALLOWED_CHILDREN[this.factory.tagName] || [];

        if (allowedTags.length > 0 && !allowedTags.includes(childTag)) {
            throw new Error(
                `Hierarchy Error: <${childTag}> is not a valid child for <${this.factory.tagName}>`
            );
        }

        return node;
    }

    /**
     * INTERNAL: Syncs the 'producer' attribute with the linked node's ID.
     */
    _syncProducerAttribute() {
        const node = this.factory.content[0];
        if (node && typeof node.getAttribute === 'function') {
            const id = node.getAttribute('id');
            if (id) {
                this.setAttribute('producer', id);
                return;
            }
        }
        this.removeAttribute('producer');
    }

    /**
     * This builds a single XML element and its children.
     * It returns a native DOM node, not a string.
     */
    _buildNative(doc) {
        const el = doc.createElement(this.factory.tagName);

        for (const [k, v] of Object.entries(this.factory.attributes)) {
            el.setAttribute(k, v);
        }

        for (const child of this.factory.content) {
            // If it's another ElementNode, call its _buildNative
            // If it's a TextNode, it has its own build(doc)
            el.appendChild(child._buildNative ? child._buildNative(doc) : child.build(doc));
        }

        return el;
    }
}
