import { ElementNode } from '../node-provider.js';
import { MLT_TAG } from '../../constants/mlt-tag.js';

export class Producer extends ElementNode {
    constructor(attributes = {}, content = []) {
        super(MLT_TAG.PRODUCER, attributes, content);
    }
}
