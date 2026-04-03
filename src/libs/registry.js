import { MLT_TAG } from '../constants/mlt-tag.js';
import { Mlt } from '../nodes/mlt.js';
import {
    Blank,
    Chain,
    Filter,
    Property,
    Transition,
    Track,
    Producer,
    Profile,
    Playlist,
    Tractor,
    Multitrack,
    Entry
} from '../nodes/service-provider.js';

/**
 * Returns the mapping of tags to classes.
 * Using a function defers class access until runtime,
 * bypassing "Cannot access before initialization" errors.
 */
export function getMltRegistry() {
    return {
        [MLT_TAG.MLT]: Mlt,
        [MLT_TAG.BLANK]: Blank,
        [MLT_TAG.CHAIN]: Chain,
        [MLT_TAG.FILTER]: Filter,
        [MLT_TAG.PROPERTY]: Property,
        [MLT_TAG.TRANSITION]: Transition,
        [MLT_TAG.TRACK]: Track,
        [MLT_TAG.PRODUCER]: Producer,
        [MLT_TAG.PROFILE]: Profile,
        [MLT_TAG.PLAYLIST]: Playlist,
        [MLT_TAG.TRACTOR]: Tractor,
        [MLT_TAG.MULTITRACK]: Multitrack,
        [MLT_TAG.ENTRY]: Entry
    };
}
