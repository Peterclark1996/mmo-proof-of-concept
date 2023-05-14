import { AppConsumer, Sprite, Stage, Text } from "@inlet/react-pixi"
import { TextStyle } from "@pixi/text"
import { useCallback, useEffect, useState } from "react"
import Character from "./../../assets/Character.png"
import { GAME_SCREEN_CENTER, GAME_SCREEN_HEIGHT, GAME_SCREEN_WIDTH, SPRITE_HEIGHT } from "../../constants"
import GameMap from "./GameMap"
import Point from "./../../types/Point"
import { useWebSocket } from "../../socket/WebSocketContext"
import { EventToServerType } from "../../socket/EventToServer"
import OtherPlayers from "./OtherPlayers"
import PlayerPosition from "../../types/PlayerPosition"

type GameScreenProps = {
    playerPositions: PlayerPosition[]
    offset: Point
    localPlayerPosition: Point
    onLocalPlayerPositionUpdated: (point: Point) => void
}

let recentlySentMovement = false
let queuedMovement: Point | undefined = undefined

const GameScreen = ({
    playerPositions,
    offset,
    localPlayerPosition,
    onLocalPlayerPositionUpdated
}: GameScreenProps) => {
    const [isMoving, setIsMoving] = useState(false)
    const [mousePositionInGameWorld, setMousePositionInGameWorld] = useState<Point>({ x: 0, y: 0 })
    const [lastTargetPosition, setLastTargetPosition] = useState<Point>(localPlayerPosition)

    const { send } = useWebSocket()

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            switch (event.key) {
                case "q":
                    send({ type: EventToServerType.PLAYER_CAST, data: mousePositionInGameWorld })
            }
        },
        [mousePositionInGameWorld, send]
    )

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown)
        return document.removeEventListener("keydown", handleKeyDown)
    }, [handleKeyDown])

    const sendRateLimitedMovement = (newMousePos: Point) => {
        if (recentlySentMovement) {
            queuedMovement = newMousePos
            return
        }

        queuedMovement = undefined
        send({ type: EventToServerType.PLAYER_MOVING_TO, data: newMousePos })

        recentlySentMovement = true
        setTimeout(() => {
            recentlySentMovement = false

            if (queuedMovement === undefined) return

            sendRateLimitedMovement(queuedMovement)
            queuedMovement = undefined
        }, 100)
    }

    const updateMousePosFromScreenPos = (event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const newMousePos = {
            x: event.clientX - rect.left - offset.x,
            y: event.clientY - rect.top - offset.y
        }
        sendRateLimitedMovement(newMousePos)
        setMousePositionInGameWorld(newMousePos)
    }

    const onMouseMove = (event: React.MouseEvent) => {
        if (!isMoving) return
        updateMousePosFromScreenPos(event)
    }

    const onMouseUp = (event: React.MouseEvent) => {
        if (event.button !== 2) return
        setIsMoving(false)
        setLastTargetPosition(mousePositionInGameWorld)
    }

    const onMouseDown = (event: React.MouseEvent) => {
        if (event.button !== 2) return
        setIsMoving(true)
        updateMousePosFromScreenPos(event)
    }

    const onContextMenu = (event: React.MouseEvent) => event.preventDefault()

    const currentTargetPostion = isMoving ? mousePositionInGameWorld : lastTargetPosition

    return (
        <div onMouseMove={onMouseMove} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onContextMenu={onContextMenu}>
            <Stage
                width={GAME_SCREEN_WIDTH}
                height={GAME_SCREEN_HEIGHT}
                options={{ backgroundColor: 0x84dc8b, antialias: false }}
            >
                <AppConsumer>
                    {app => (
                        <>
                            <GameMap
                                app={app}
                                currentTargetPostion={currentTargetPostion}
                                offset={offset}
                                localPlayerPosition={localPlayerPosition}
                                onLocalPlayerPositionUpdated={onLocalPlayerPositionUpdated}
                            />
                            <OtherPlayers playerPositions={playerPositions} offset={offset} />
                        </>
                    )}
                </AppConsumer>

                <Sprite
                    image={Character}
                    anchor={0.5}
                    x={GAME_SCREEN_CENTER.x}
                    y={GAME_SCREEN_CENTER.y - SPRITE_HEIGHT / 2}
                />
                <Text
                    text="Local"
                    anchor={0.5}
                    x={GAME_SCREEN_CENTER.x}
                    y={GAME_SCREEN_CENTER.y - SPRITE_HEIGHT - 15}
                    style={new TextStyle({ fontSize: 20 })}
                />
            </Stage>
        </div>
    )
}

export default GameScreen
