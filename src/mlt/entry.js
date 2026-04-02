import { ReferenceNode } from '../nodes/referencenode.js';
import { MLT_TAG } from '../libs/constants.js';

export class Entry extends ReferenceNode {
    constructor(attributes = {}, content = []) {
        super(MLT_TAG.ENTRY, attributes, content);
    }
}
