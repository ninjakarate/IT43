export const KeyTypeEnum = {
    forward: 'w',
    backward: 's',
    left: 'a',
    right: 'd',
    sideLeft: 'q',
    sideRight: 'e',
} as const;
export type KeyType = typeof KeyTypeEnum[keyof typeof KeyTypeEnum];