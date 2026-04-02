export const MLT_TAG = {
    MLT: 'mlt',
    PRODUCER: 'producer',
    PLAYLIST: 'playlist',
    ENTRY: 'entry',
    TRACTOR: 'tractor',
    MULTITRACK: 'multitrack',
    TRACK: 'track',
    FILTER: 'filter',
    TRANSITION: 'transition',
    PROPERTY: 'property',
    BLANK: 'blank'
};

export const NODE_TYPE = {
    ELEMENT: 0,
    REFERENCE: 1
};

// Define the hierarchy here to avoid importing classes into each other
export const ALLOWED_CHILDREN = {
    [MLT_TAG.MLT]: [MLT_TAG.PRODUCER, MLT_TAG.PLAYLIST, MLT_TAG.TRACTOR],
    [MLT_TAG.PRODUCER]: [MLT_TAG.PROPERTY],
    [MLT_TAG.PLAYLIST]: [MLT_TAG.ENTRY, MLT_TAG.PROPERTY],
    [MLT_TAG.ENTRY]: [MLT_TAG.PRODUCER],
    [MLT_TAG.TRACTOR]: [MLT_TAG.MULTITRACK, MLT_TAG.PROPERTY],
    [MLT_TAG.MULTITRACK]: [MLT_TAG.TRACK],
    [MLT_TAG.TRACK]: [MLT_TAG.PLAYLIST],
    [MLT_TAG.PROPERTY]: ['#text'] // Internal marker for TextNode
};
