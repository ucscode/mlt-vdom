import { ContainerNode } from '../nodes/containernode.js';
import { MLT_TAG } from '../libs/constants.js';

export class Multitrack extends ContainerNode {
    constructor(attributes = {}, content = []) {
        super(MLT_TAG.MULTITRACK, attributes, content);
    }
}
