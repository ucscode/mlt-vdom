import { MLT_TAG } from './mlt-tag.js';

export const ALLOWED_CHILDREN = {
    [MLT_TAG.MLT]: [
        MLT_TAG.PROFILE,
        MLT_TAG.PRODUCER,
        MLT_TAG.PLAYLIST,
        MLT_TAG.TRACTOR,
        MLT_TAG.MULTITRACK, // Added for Shotcut organizational consistency
        MLT_TAG.CHAIN,
        MLT_TAG.FILTER,
        MLT_TAG.TRANSITION,
        MLT_TAG.PROPERTY
    ],

    [MLT_TAG.PROFILE]: [
        MLT_TAG.PROPERTY
    ],

    [MLT_TAG.CHAIN]: [
        MLT_TAG.PROPERTY,
        MLT_TAG.FILTER
    ],

    [MLT_TAG.PRODUCER]: [
        MLT_TAG.PROPERTY,
        MLT_TAG.FILTER
    ],

    [MLT_TAG.PLAYLIST]: [
        MLT_TAG.ENTRY,
        MLT_TAG.BLANK,
        MLT_TAG.PROPERTY,
        MLT_TAG.FILTER // Shotcut allows filters on entire playlists (bins)
    ],

    [MLT_TAG.TRACTOR]: [
        MLT_TAG.PROPERTY,
        MLT_TAG.MULTITRACK,
        MLT_TAG.TRACK, // Keep this as a fallback for flattened exports
        MLT_TAG.FILTER,
        MLT_TAG.TRANSITION,
        MLT_TAG.PRODUCER,
        MLT_TAG.PLAYLIST
    ],

    [MLT_TAG.MULTITRACK]: [
        MLT_TAG.TRACK,
        MLT_TAG.PROPERTY // Shotcut sometimes stores track metadata here
    ],

    [MLT_TAG.TRACK]: [
        MLT_TAG.PROPERTY,
        MLT_TAG.FILTER,
        MLT_TAG.PRODUCER,
        MLT_TAG.PLAYLIST,
        MLT_TAG.TRACTOR,
        MLT_TAG.BLANK
    ],

    [MLT_TAG.ENTRY]: [
        MLT_TAG.PROPERTY,
        MLT_TAG.FILTER,
        MLT_TAG.PRODUCER,
        MLT_TAG.CHAIN
    ],

    [MLT_TAG.FILTER]: [
        MLT_TAG.PROPERTY
    ],

    [MLT_TAG.TRANSITION]: [
        MLT_TAG.PROPERTY,
        MLT_TAG.FILTER // Advanced Shotcut transitions can have internal filters
    ],

    [MLT_TAG.PROPERTY]: [
        '#text'
    ],

    [MLT_TAG.BLANK]: [
        MLT_TAG.PROPERTY
    ]
};
