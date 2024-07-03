import { Tiles } from '../types';
import emblem from "../assets/tex/1.png";
import red_brick from "../assets/tex/2.png";
import purple_wall from "../assets/tex/3.png";
import stone_wall from "../assets/tex/4.png";
import blue_wall from "../assets/tex/5.png";
import dirty_wall from "../assets/tex/6.png";
import wood from "../assets/tex/7.png";
import stones from "../assets/tex/8.png";
import barrel from "../assets/tex/9.png";
import brick from "../assets/tex/10.png";
import char from "../assets/tex/char.png";
import ghost from "../assets/tex/ghost.png";

export const tiles: Tiles = {
    1: {
        type: "wall",
        src: brick,
        collision: true,
    },
    2: {
        type: "wall",
        src: red_brick,
        collision: true,
    },
    3: {
        type: "wall",
        src: purple_wall,
        collision: true,
    },
    4: {
        type: "wall",
        src: stone_wall,
        collision: true,
    },
    5: {
        type: "door",
        src: blue_wall,
        collision: true,
    },
    6: {
        type: "wall",
        src: dirty_wall,
        collision: true,
    },
    7: {
        type: "wall",
        src: wood,
        collision: false,
    },
    8: {
        type: "wall",
        src: stones,
        collision: false,
    },
    9: {
        type: "sprite",
        src: barrel,
        collision: true,
    },
    10: {
        type: "wall",
        src: emblem,
        collision: true,
    },
    11: {
        type: "sprite",
        src: char,
        collision: true,
    },
    12: {
        type: "sprite",
        src: ghost,
        collision: true,
    },
}