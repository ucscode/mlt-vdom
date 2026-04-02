import { ContainerNode } from '../nodes/containernode.js';
import { MLT_TAG } from '../libs/constants.js';

export class Property extends ContainerNode {
    constructor(attributes = {}, content = []) {
        super(MLT_TAG.PROPERTY, attributes, content);
    }
}
