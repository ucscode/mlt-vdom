import { ElementNode } from '../node-provider.js';
import { MLT_TAG } from '../../constants/mlt-tag.js';

export class Blank extends ElementNode {
    constructor(attributes = {}) {
        super(MLT_TAG.BLANK, attributes);
    }
}
