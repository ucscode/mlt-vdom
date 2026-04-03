import { ReferenceNode } from '../node-provider.js';
import { MLT_TAG } from '../../constants/mlt-tag.js';

export class Entry extends ReferenceNode {
    constructor(attributes = {}, content = []) {
        super(MLT_TAG.ENTRY, attributes, content);
    }
}
