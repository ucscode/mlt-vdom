import { ElementNode } from '../node-provider.js';
import { MLT_TAG } from '../../constants/mlt-tag.js';

export class Profile extends ElementNode {
    constructor(attributes = {}, content = []) {
        super(MLT_TAG.PROFILE, attributes, content);
    }
}
