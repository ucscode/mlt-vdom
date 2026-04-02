import { ReferenceNode } from '../nodes/referencenode.js';
import { MLT_TAG } from '../libs/constants.js';

export class Chain extends ReferenceNode {
    constructor(attributes = {}, content = []) {
        super(MLT_TAG.CHAIN, attributes, content);
    }
}
