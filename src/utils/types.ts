import { CanvasHTMLAttributes, ReactNode } from "react"
import Game from "../c/Game"

export const KeyTypeEnum = {
    forward: 'KeyW',
    backward: 'KeyS',
    left: 'KeyA',
    right: 'KeyD',
    sideLeft: 'KeyQ',
    sideRight: 'KeyE',
    action: 'Space',
} as const;
export type KeyTypeEnum = typeof KeyTypeEnum[keyof typeof KeyTypeEnum];

export const TileTypeEnum = {
    wall: 'wall',
    sprite: 'sprite',
    door: 'door',
} as const;
export type TileTypeEnum = typeof TileTypeEnum[keyof typeof TileTypeEnum];

export type Tiles = { [key: number]: Tile }

export type Tile = {
    type: TileTypeEnum,
    src: string,
    collision?: boolean,
}

export type PlayerType = {
    x: number,
    y: number,
    rotation?: number
}

export interface RaycastType extends Omit<CanvasHTMLAttributes<HTMLCanvasElement>, "children"> {
    map: number[][],
    tiles: Tiles,
    player: PlayerType,
    width: number,
    height: number,
    settings: SettingsType,
    skybox?: string,
    floor?: string,
    ceiling?: string,
    speed?: number,
    rotSpeed?: number,
    inputs?: {
        forward: KeyTypeEnum,
        left: KeyTypeEnum,
        right: KeyTypeEnum,
        backward: KeyTypeEnum,
        action: KeyTypeEnum,
        sideLeft?: KeyTypeEnum,
        sideRight?: KeyTypeEnum,
    }
    children?: (value: Game) => ReactNode
}

export type Sprite = {
    x: number;
    y: number;
    tile: number;
}

export type SortedSprite = Sprite & {
    distance: number;
}

export type Doors = number[][]

export interface CanvasType extends CanvasHTMLAttributes<HTMLCanvasElement> {
    g: Game,
    width: number,
    height: number,
    settings: SettingsType,
    skybox?: string,
    floor?: string,
    ceiling?: string,
    speed?: number,
    rotSpeed?: number,
    inputs?: {
        forward: KeyTypeEnum,
        left: KeyTypeEnum,
        right: KeyTypeEnum,
        backward: KeyTypeEnum,
        action: KeyTypeEnum,
        sideLeft?: KeyTypeEnum,
        sideRight?: KeyTypeEnum,
    }
    textures?: HTMLImageElement[],
}

export type SettingsType = {
    isShading: boolean;
    isWiggling: boolean;
    isShowFps: boolean;
    map?: number[][];
};