import fs from 'fs/promises';
import convert from 'xml-js';
import { getMltRegistry } from './registry.js';

export class MltParser {
    /**
     * @param {Object} registry - A mapping of MLT_TAGs to their Class constructors.
     */
    constructor(registry = null) {
        this.registry = registry || getMltRegistry();
    }

    /**
     * Converts an XML string into VDOM instances using xml-js (non-compact)
     * @param {string} xmlString
     * @returns {Array} Array of hydrated VDOM nodes
     */
    parse(xmlString) {
        const nativeObj = convert.xml2js(xmlString, { compact: false });

        if (!nativeObj.elements) return [];

        return this._hydrate(nativeObj.elements);
    }

    /**
     * Reads a file and calls parse()
     * @param {string} filePath
     * @returns {Promise<Array>}
     */
    async parseFromFile(filePath) {
        try {
            const xmlContent = await fs.readFile(filePath, 'utf-8');
            return this.parse(xmlContent);
        } catch (err) {
            throw new Error(`[MltParser] File error: ${filePath}. ${err.message}`);
        }
    }

    /**
     * Recursive Hydrator for xml-js non-compact format
     * @private
     */
    _hydrate(elements) {
        if (!Array.isArray(elements)) return [];

        const instances = [];

        for (const el of elements) {
            // 1. Dynamic Lookup: Check if this tag name exists in our injected registry
            const ClassRef = this.registry[el.name];

            // Ignore non-elements (comments, etc.) or tags not in our registry
            if (el.type !== 'element' || !ClassRef) continue;

            // 2. Attributes are strictly isolated in el.attributes by xml-js
            const attributes = el.attributes || {};

            // 3. Extract inner text (primarily for <property> tags)
            let innerText = '';
            const textNode = el.elements?.find(child => child.type === 'text');
            if (textNode) {
                innerText = textNode.text;
            }

            // 4. Instantiate the VDOM node
            const instance = new ClassRef(attributes, innerText);

            // 5. Recursion: Hydrate children and attach to the current instance
            if (el.elements && el.elements.length > 0) {
                const childElements = el.elements.filter(child => child.type === 'element');
                const children = this._hydrate(childElements);

                children.forEach(child => instance.add(child));
            }

            instances.push(instance);
        }

        return instances;
    }
}
