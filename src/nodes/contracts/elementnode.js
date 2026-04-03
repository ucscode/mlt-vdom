import { NodeFactory } from '../../libs/factory.js';
import { ALLOWED_CHILDREN } from '../../constants/mlt-child-anatomy.js';
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
        this.factory = new NodeFactory(tagName, { ...attributes }, []);

        // 1. Normalize content WITHOUT auto-syncing yet
        const rawContent = Array.isArray(content) ? content : (content ? [content] : []);

        // 2. Only map content if it's not empty (prevents accidental TextNode creation for empty properties)
        this.factory.content = rawContent.map(item => this._normalizeAndValidate(item));
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

    _allowedChildTags() {
        return ALLOWED_CHILDREN[this.factory.tagName] || [];
    }

    _normalizeAndValidate(item) {
        // If the item is already a TextNode or MltNode, keep it.
        // If it's a string/number, it's a TextNode.
        const isText = typeof item === 'string' || typeof item === 'number';
        const node = isText ? new TextNode(item) : item;

        if (!(node instanceof MltNode)) {
            throw new Error(`Invalid Node: ${item} is not an instance of MltNode`);
        }

        const childTag = isText ? '#text' : node.factory?.tagName;
        const allowedTags = this._allowedChildTags();

        // Fix: If no tags are explicitly allowed (like in Property), assume #text is fine
        if (allowedTags.length > 0 && !allowedTags.includes(childTag)) {
            throw new Error(`Hierarchy Error: <${childTag}> is not valid for <${this.factory.tagName}>`);
        }

        return node;
    }

    _buildNative(doc) {
        const el = doc.createElement(this.factory.tagName);

        for (const [k, v] of Object.entries(this.factory.attributes)) {
            // Check for valid XML Name and ensure we don't dump null/undefined values
            if (isNaN(k) && k !== '' && v !== undefined && v !== null) {
                el.setAttribute(k, String(v));
            }
        }

        for (const child of this.factory.content) {
            // Logic fix: Ensure child build methods are called correctly
            const childNode = child._buildNative ? child._buildNative(doc) : child.build(doc);
            if (childNode) el.appendChild(childNode);
        }

        return el;
    }
}
