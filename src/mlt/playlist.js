import { ContainerNode } from '../nodes/containernode.js';
import { MLT_TAG } from '../libs/constants.js';

export class Playlist extends ContainerNode {
    constructor(attributes = {}, content = []) {
        super(MLT_TAG.PLAYLIST, attributes, content);
    }
}
