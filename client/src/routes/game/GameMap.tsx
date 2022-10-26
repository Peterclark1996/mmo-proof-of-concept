import { Graphics } from "@inlet/react-pixi"
import Point from "./../../types/Point"
import { Application, Graphics as PixiGraphics } from "pixi.js"
import { useCallback, useEffect } from "react"
import { mousePosToGamePos, moveTowards, PLAYER_SPEED } from "./../../Constants"

type GameMapProps = {
    app: Application,
    isMoving: boolean,
    mousePosition: Point,
    lastTargetPosition: Point,
    offset: Point,
    onOffsetUpdated: (point: Point) => void
}

const GameMap = ({ app, isMoving, mousePosition, lastTargetPosition, offset, onOffsetUpdated }: GameMapProps) => {
    const updatePostion = useCallback((delta: number) => {
        const speed = PLAYER_SPEED * delta
        const targetPosition = mousePosToGamePos(mousePosition, offset)
        onOffsetUpdated(moveTowards(offset, isMoving ? targetPosition : lastTargetPosition, speed))
    }, [offset, mousePosition])

    useEffect(() => {
        app.ticker.add(updatePostion)
        return () => {
            if (app.ticker === null) return
            app.ticker.remove(updatePostion)
        }
    }, [app, updatePostion])

    const draw = useCallback((g: PixiGraphics) => {
        g.clear()
        g.beginFill(0x88898c, 1)

        g.drawRect(-250 + offset.x, -250 + offset.y, 100, 100)
        g.drawRect(150 + offset.x, -250 + offset.y, 100, 100)
        g.drawRect(-250 + offset.x, 150 + offset.y, 100, 100)
        g.drawRect(150 + offset.x, 150 + offset.y, 100, 100)

        g.drawRect(-325 + offset.x, -50 + offset.y, 100, 100)
        g.drawRect(225 + offset.x, -50 + offset.y, 100, 100)
        g.drawRect(-50 + offset.x, 225 + offset.y, 100, 100)
        g.drawRect(-50 + offset.x, -325 + offset.y, 100, 100)

        g.endFill()
    }, [offset])

    return (
        <Graphics draw={draw} />
    )
}

export default GameMap