import { ReferenceNode } from '../node-provider.js';
import { MLT_TAG } from '../../constants/mlt-tag.js';

export class Track extends ReferenceNode {
    constructor(attributes = {}, content = []) {
        super(MLT_TAG.TRACK, attributes, content);
    }
}
