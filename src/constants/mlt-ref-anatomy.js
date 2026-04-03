import { MLT_TAG } from './mlt-tag.js';

export const ALLOWED_REFERENCES = {
    [MLT_TAG.ENTRY]: [
        MLT_TAG.PRODUCER,
        MLT_TAG.PLAYLIST,
        MLT_TAG.TRACTOR,
        MLT_TAG.CHAIN
    ],

    [MLT_TAG.TRACK]: [
        MLT_TAG.PRODUCER,
        MLT_TAG.PLAYLIST,
        MLT_TAG.TRACTOR,
        MLT_TAG.CHAIN,
        MLT_TAG.BLANK
    ],

    [MLT_TAG.CHAIN]: [
        MLT_TAG.PRODUCER
    ],

    [MLT_TAG.TRANSITION]: [
        MLT_TAG.TRACK,
        MLT_TAG.PRODUCER,
        MLT_TAG.PLAYLIST,
        MLT_TAG.TRACTOR
    ],

    [MLT_TAG.FILTER]: [
        MLT_TAG.PRODUCER,
        MLT_TAG.PLAYLIST,
        MLT_TAG.CHAIN
    ],

    [MLT_TAG.MLT]: [
        MLT_TAG.PROFILE,
        MLT_TAG.TRACTOR
    ]
};
