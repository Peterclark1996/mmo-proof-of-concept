import { Graphics } from "@inlet/react-pixi"
import Point from "./../../types/Point"
import { Application, Graphics as PixiGraphics } from "pixi.js"
import { useCallback, useEffect } from "react"
import { moveTowards, BASE_PLAYER_SPEED } from "../../constants"

type GameMapProps = {
    app: Application
    currentTargetPostion: Point
    offset: Point
    localPlayerPosition: Point
    onLocalPlayerPositionUpdated: (point: Point) => void
}

const pixiTickerTargetFPMS = 0.06

const GameMap = ({
    app,
    currentTargetPostion,
    offset,
    localPlayerPosition,
    onLocalPlayerPositionUpdated
}: GameMapProps) => {
    const updatePostion = useCallback(
        (delta: number) => {
            const deltaSeconds = delta / pixiTickerTargetFPMS / 1000
            const maxDistanceToTravel = BASE_PLAYER_SPEED * deltaSeconds
            const newPoint = moveTowards(localPlayerPosition, currentTargetPostion, maxDistanceToTravel)
            onLocalPlayerPositionUpdated(newPoint)
        },
        [currentTargetPostion, localPlayerPosition, onLocalPlayerPositionUpdated]
    )

    useEffect(() => {
        app.ticker.add(updatePostion)
        return () => {
            if (app.ticker === null) return
            app.ticker.remove(updatePostion)
        }
    }, [app, updatePostion])

    const draw = useCallback(
        (g: PixiGraphics) => {
            g.clear()
            g.beginFill(0x88898c, 1)

            const drawRect = (x: number, y: number, width: number, height: number) => {
                g.drawRect(offset.x + x, offset.y + y, width, height)
            }

            const drawCircle = (x: number, y: number, radius: number) => {
                g.drawCircle(offset.x + x, offset.y + y, radius)
            }

            drawRect(-250, -250, 100, 100)
            drawRect(150, -250, 100, 100)
            drawRect(-250, 150, 100, 100)
            drawRect(150, 150, 100, 100)

            drawRect(-325, -50, 100, 100)
            drawRect(225, -50, 100, 100)
            drawRect(-50, 225, 100, 100)
            drawRect(-50, -325, 100, 100)

            g.beginFill(0xff0000, 1)
            drawCircle(0, 0, 4)
            drawCircle(100, 0, 4)
            drawCircle(-100, 0, 4)
            drawCircle(0, 100, 4)
            drawCircle(0, -100, 4)

            g.endFill()
        },
        [offset]
    )

    return <Graphics draw={draw} />
}

export default GameMap
