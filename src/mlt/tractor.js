import { ContainerNode } from '../nodes/containernode.js';
import { MLT_TAG } from '../libs/constants.js';

export class Tractor extends ContainerNode {
    constructor(attributes = {}, content = []) {
        super(MLT_TAG.TRACTOR, attributes, content);
    }
}
