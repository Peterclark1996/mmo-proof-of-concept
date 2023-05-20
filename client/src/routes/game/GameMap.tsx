import { Graphics } from "@inlet/react-pixi"
import Point from "./../../types/Point"
import { Application, Graphics as PixiGraphics } from "pixi.js"
import { useCallback, useEffect } from "react"
import { BASE_PLAYER_SPEED, INTERPOLATION_PULL_BACK_SPEED_RATIO, PIXI_TICKER_TARGET_FPMS } from "./constants"

type GameMapProps = {
    app: Application
    currentTargetPostion: Point
    offset: Point
    serverPlayerPosition: Point
    localPlayerPosition: Point
    onLocalPlayerPositionUpdated: (point: Point) => void
}

const GameMap = ({
    app,
    currentTargetPostion,
    offset,
    serverPlayerPosition,
    localPlayerPosition,
    onLocalPlayerPositionUpdated
}: GameMapProps) => {
    const updatePostion = useCallback(
        (delta: number) => {
            const deltaSeconds = delta / PIXI_TICKER_TARGET_FPMS / 1000

            const maxDistanceToTravel = BASE_PLAYER_SPEED * deltaSeconds
            const nextStepTowardsTarget = moveTowards(localPlayerPosition, currentTargetPostion, maxDistanceToTravel)

            const maxDistanceToAdjustForInterpolation = maxDistanceToTravel * INTERPOLATION_PULL_BACK_SPEED_RATIO
            const nextStepInterpolatedTowardsServerPosition = moveTowards(
                nextStepTowardsTarget,
                serverPlayerPosition,
                maxDistanceToAdjustForInterpolation
            )

            onLocalPlayerPositionUpdated(nextStepInterpolatedTowardsServerPosition)
        },
        [currentTargetPostion, localPlayerPosition, onLocalPlayerPositionUpdated, serverPlayerPosition]
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

const moveTowards = (current: Point, target: Point, maxDistanceToTravel: number) => {
    const differenceX = target.x - current.x
    const differenceY = target.y - current.y
    const magnitude = Math.sqrt(differenceX * differenceX + differenceY * differenceY)
    if (magnitude <= maxDistanceToTravel) {
        return target
    } else {
        return {
            x: current.x + (differenceX / magnitude) * maxDistanceToTravel,
            y: current.y + (differenceY / magnitude) * maxDistanceToTravel
        }
    }
}
