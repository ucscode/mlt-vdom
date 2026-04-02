import { ElementNode } from '../nodes/elementnode.js';
import { MLT_TAG } from '../libs/constants.js';

export class Filter extends ElementNode {
    constructor(attributes = {}, content = []) {
        super(MLT_TAG.FILTER, attributes, content);
    }
}
