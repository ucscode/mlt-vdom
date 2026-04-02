import { JSDOM } from 'jsdom';
import format from 'xml-formatter';

import { MLT_TAG } from './libs/constants.js';
import { ElementNode } from './nodes/elementnode.js';
import { TextNode as Text } from './nodes/textnode.js';

import { Producer } from './mlt/producer.js';
import { Chain } from './mlt/chain.js';
import { Profile } from './mlt/profile.js';
import { Playlist } from './mlt/playlist.js';
import { Tractor } from './mlt/tractor.js';
import { Property } from './mlt/property.js';
import { Entry } from './mlt/entry.js';
import { Track } from './mlt/track.js';
import { Multitrack } from './mlt/multitrack.js';
import { Filter } from './mlt/filter.js';
import { Transition } from './mlt/transition.js';

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
    static Text = Text;

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
     * THE ENTRY POINT
     * Converts the entire VDOM tree into the final XML string.
     */
    build(indent = false) {
        const { window } = new JSDOM('<mlt></mlt>', { contentType: 'text/xml' });
        const doc = window.document;

        // Start the recursive build from the root
        const finalDom = this._buildNative(doc);

        const serializer = new (new JSDOM().window).XMLSerializer();
        let xmlContent = serializer.serializeToString(finalDom);

        if (indent !== false) {
            const indentation = typeof indent === 'number' ? ' '.repeat(indent) : '  ';
            xmlContent = format(xmlContent, {
                indentation: indentation,
                collapseContent: true,
                lineSeparator: '\n'
            });
        }

        return '<?xml version="1.0" encoding="utf-8"?>\n' + xmlContent;
    }
}
