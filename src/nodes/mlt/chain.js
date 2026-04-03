import { ReferenceNode } from '../node-provider.js';
import { MLT_TAG } from '../../constants/mlt-tag.js';

export class Chain extends ReferenceNode {
    constructor(attributes = {}, content = []) {
        super(MLT_TAG.CHAIN, attributes, content);
    }
}
