import { Graphics } from "@inlet/react-pixi"
import Point from "./types/Point"
import { Application, Graphics as PixiGraphics } from "pixi.js"
import { useCallback, useEffect } from "react"

type GameMapProps = {
    app: Application,
    targetOffset: Point,
    offset: Point,
    onOffsetUpdated: (point: Point) => void
}

const GameMap = ({ app, targetOffset, offset, onOffsetUpdated }: GameMapProps) => {
    const updatePostion = useCallback((delta: number) => {
        const speed = 10 * delta
        onOffsetUpdated(moveTowards(offset, targetOffset, speed))
    }, [offset, targetOffset])

    useEffect(() => {
        app.ticker.add(updatePostion)
        return () => {
            app.ticker.remove(updatePostion)
        }
    }, [app, updatePostion])

    const draw = useCallback((g: PixiGraphics) => {
        g.clear()
        g.beginFill(0x88898c, 1)
        g.drawRect(50 + offset.x, 50 + offset.y, 100, 100)
        g.drawRect(450 + offset.x, 50 + offset.y, 100, 100)
        g.drawRect(50 + offset.x, 450 + offset.y, 100, 100)
        g.drawRect(450 + offset.x, 450 + offset.y, 100, 100)
        g.endFill()
    }, [offset])

    return (
        <Graphics draw={draw} />
    )
}

const moveTowards = (current: Point, target: Point, maxDistanceDelta: number) => {
    const difference = { x: target.x - current.x, y: target.y - current.y }
    const magnitude = Math.sqrt(difference.x * difference.x + difference.y * difference.y)
    if (magnitude <= maxDistanceDelta || magnitude === 0) return target
    return {
        x: current.x + (difference.x / magnitude) * maxDistanceDelta,
        y: current.y + (difference.y / magnitude) * maxDistanceDelta
    }
}

export default GameMap