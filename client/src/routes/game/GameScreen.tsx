import { AppConsumer, Sprite, Stage, Text } from "@inlet/react-pixi"
import { TextStyle } from "@pixi/text"
import { useState } from "react"
import Character from "./../../assets/Character.png"
import { GAME_SCREEN_HEIGHT, GAME_SCREEN_WIDTH, mousePosToGamePos } from "./../../Constants"
import GameMap from "./GameMap"
import Point from "./../../types/Point"

type GameScreenProps = {
    username: string,
    offset: Point,
    onOffsetUpdated: (point: Point) => void
}

const GameScreen = ({ username, offset, onOffsetUpdated }: GameScreenProps) => {
    const [isMoving, setIsMoving] = useState(false)
    const [mousePosition, setMousePosition] = useState<Point>({ x: 0, y: 0 })
    const [lastTargetPosition, setLastTargetPosition] = useState<Point>(offset)

    const updateMousePosFromScreenPos = (event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect()
        setMousePosition({ x: event.clientX - rect.left, y: event.clientY - rect.top })
    }

    const onMouseMove = (event: React.MouseEvent) => {
        if (!isMoving) return
        updateMousePosFromScreenPos(event)
    }

    const onMouseUp = (event: React.MouseEvent) => {
        if (event.button !== 2) return
        setIsMoving(false)
        setLastTargetPosition(mousePosToGamePos(mousePosition, offset))
    }

    const onMouseDown = (event: React.MouseEvent) => {
        if (event.button !== 2) return
        setIsMoving(true)
        updateMousePosFromScreenPos(event)
    }

    const onContextMenu = (event: React.MouseEvent) => event.preventDefault()

    return (
        <div onMouseMove={onMouseMove} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onContextMenu={onContextMenu}>
            <Stage width={GAME_SCREEN_WIDTH} height={GAME_SCREEN_HEIGHT} options={{ backgroundColor: 0x84DC8B, antialias: false }}>
                <AppConsumer>
                    {app =>
                        <GameMap
                            app={app}
                            isMoving={isMoving}
                            mousePosition={mousePosition}
                            lastTargetPosition={lastTargetPosition}
                            offset={offset}
                            onOffsetUpdated={onOffsetUpdated}
                        />
                    }
                </AppConsumer>
                <Sprite image={Character} anchor={0.5} x={GAME_SCREEN_WIDTH / 2} y={GAME_SCREEN_HEIGHT / 2} />
                <Text text={username} anchor={0.5} x={GAME_SCREEN_WIDTH / 2} y={(GAME_SCREEN_HEIGHT / 2) - 30} style={new TextStyle({ fontSize: 20 })} />
            </Stage>
        </div>
    )
}

export default GameScreen