import { createContext, useEffect, useMemo, useState } from "react";
import Game from "../c/Game";
import { RaycastType } from "../utils/types";
import Canvas from "./Canvas";

const RaycasterContext = createContext<Game>(null!);

export default function Raycaster({
    map,
    tiles,
    player,
    children,
    ...props
}: RaycastType) {
    const game = useMemo(() => {
        try {
            return new Game(map, tiles, player, props.width, props.height)
        } catch (e) {
            return console.error(e)
        }
    }, [map, tiles, player, props.width, props.height])

    const [textures, setTextures] = useState<HTMLImageElement[]>()

    useEffect(() => {
        if (tiles) {
            const tilesArray = Object.values(tiles)
            const imgArr = new Array(tilesArray.length);
            tilesArray.forEach((o, i) => {
                const image = new Image();
                imgArr[i] = null
                image.onload = () => imgArr[i] = image
                image.crossOrigin = "Anonymous";
                image.src = o.src;
            })

            setTextures(imgArr)
        }
    }, [tiles])

    if (!game) return null

    return (
        <RaycasterContext.Provider value={game}>
            <Canvas g={game} textures={textures} {...props} />
            {children ? (
                <RaycasterContext.Consumer>
                    {contextValue => children(contextValue)}
                </RaycasterContext.Consumer>
            ) : null}
        </RaycasterContext.Provider>
    )
}