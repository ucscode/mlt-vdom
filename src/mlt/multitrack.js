import { ElementNode } from '../nodes/elementnode.js';
import { MLT_TAG } from '../libs/constants.js';

export class Multitrack extends ElementNode {
    constructor(attributes = {}, content = []) {
        super(MLT_TAG.MULTITRACK, attributes, content);
    }
}
