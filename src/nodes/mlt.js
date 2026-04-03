import fs from 'fs/promises';
import format from 'xml-formatter';
import { JSDOM } from 'jsdom';
import { MLT_TAG } from '../constants/mlt-tag.js';
import { ElementNode } from './node-provider.js';
import { MltParser } from '../libs/parser.js';
import {
    Producer,
    Chain,
    Profile,
    Playlist,
    Tractor,
    Property,
    Entry,
    Track,
    Multitrack,
    Filter,
    Transition,
    Blank
} from './service-provider.js';

export class Mlt extends ElementNode {
    static Profile = Profile;
    static Property = Property;
    static Producer = Producer;
    static Chain = Chain;
    static Playlist = Playlist;
    static Entry = Entry;
    static Track = Track;
    static Multitrack = Multitrack;
    static Tractor = Tractor;
    static Filter = Filter;
    static Transition = Transition;
    static Blank = Blank;

    constructor(attrs = {}, content = []) {
        const defaultAttrs = {
            LC_NUMERIC: 'C',
            version: '7.37.0',
            xmlns: 'http://www.mltframework.org/bin/view/MLT/',
            ...attrs
        };
        super(MLT_TAG.MLT, defaultAttrs, content);
    }

    /**
     * Converts the VDOM tree back into an MLT XML string or file.
     * @param {boolean|number} indent - False for minified, or a number/string for indentation.
     * @param {string|null} filePath - Optional path to save the file.
     * @returns {Promise<string|void>} - Returns the XML string if no filePath is provided.
     */
    async dump(indent = false, filePath = null) {
        const { window } = new JSDOM('<mlt></mlt>', { contentType: 'text/xml' });
        const doc = window.document;

        // Start the recursive build from the root node
        const finalDom = this._buildNative(doc);

        const serializer = new (new JSDOM().window).XMLSerializer();
        let xmlContent = serializer.serializeToString(finalDom);

        // Detect if indentation is requested (checks for truthy values)
        if (indent) {
            const indentation = typeof indent === 'number' ? ' '.repeat(indent) :
                (typeof indent === 'string' ? indent : '  ');

            xmlContent = format(xmlContent, {
                indentation: indentation,
                collapseContent: true,
                lineSeparator: '\n'
            });
        }

        const finalXml = '<?xml version="1.0" encoding="utf-8"?>\n' + xmlContent;

        if (filePath) {
            try {
                await fs.writeFile(filePath, finalXml, 'utf-8');
            } catch (err) {
                throw new Error(`[Mlt-VDOM] Failed to dump to file: ${filePath}. ${err.message}`);
            }
            return;
        }

        return finalXml;
    }

    static load(xmlString) {
        // Inject the registry here. Explicit and safe.
        const parser = new MltParser();
        const nodes = parser.parse(xmlString);
        return this.#ensureRoot(nodes, 'provided XML string');
    }

    static async loadFromFile(filePath) {
        const parser = new MltParser();
        const nodes = await parser.parseFromFile(filePath);
        return this.#ensureRoot(nodes, `file "${filePath}"`);
    }

    static #ensureRoot(nodes, source) {
        const root = nodes.find(node => node.factory?.tagName === MLT_TAG.MLT);
        if (!root) {
            throw new Error(`[Mlt-VDOM] Schema Error: No <mlt> root in ${source}.`);
        }
        return root;
    }
}
