import { ElementNode } from '../node-provider.js';
import { MLT_TAG } from '../../constants/mlt-tag.js';

export class Playlist extends ElementNode {
    constructor(attributes = {}, content = []) {
        super(MLT_TAG.PLAYLIST, attributes, content);
    }
}
