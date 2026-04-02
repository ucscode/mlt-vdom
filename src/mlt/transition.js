import { ElementNode } from '../nodes/elementnode.js';
import { MLT_TAG } from '../libs/constants.js';

export class Transition extends ElementNode {
    constructor(attributes = {}, content = []) {
        super(MLT_TAG.TRANSITION, attributes, content);
    }
}
