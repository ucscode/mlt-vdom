import { ElementNode } from '../node-provider.js';
import { MLT_TAG } from '../../constants/mlt-tag.js';

export class Multitrack extends ElementNode {
    constructor(attributes = {}, content = []) {
        super(MLT_TAG.MULTITRACK, attributes, content);
    }
}
