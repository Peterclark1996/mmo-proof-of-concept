import { AppConsumer, Sprite, Stage, Text } from "@inlet/react-pixi"
import { TextStyle } from "@pixi/text"
import { useState } from "react"
import Character from "./assets/Character.png"
import GameMap from "./GameMap"
import Point from "./types/Point"

const GAME_SCREEN_WIDTH = 600
const GAME_SCREEN_HEIGHT = 600

const MOUSE_MOVEMENT_BUTTON = 2

type GameScreenProps = {
    offset: Point,
    onOffsetUpdated: (point: Point) => void
}

const GameScreen = ({ offset, onOffsetUpdated }: GameScreenProps) => {
    const [settingTarget, setSettingTarget] = useState(false)
    const [targetOffset, setTargetOffset] = useState<Point>({ x: 0, y: 0 })

    const updateTargetFromScreenPos = (event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect()
        setTargetOffset({
            x: offset.x + (GAME_SCREEN_WIDTH / 2) - (event.clientX - rect.left),
            y: offset.y + (GAME_SCREEN_HEIGHT / 2) - (event.clientY - rect.top)
        })
    }

    const onMouseDown = (event: React.MouseEvent) => {
        if (event.button !== MOUSE_MOVEMENT_BUTTON) return
        setSettingTarget(true)
        updateTargetFromScreenPos(event)
    }

    const onMouseUp = (event: React.MouseEvent) => {
        if (event.button !== MOUSE_MOVEMENT_BUTTON) return
        setSettingTarget(false)
    }

    const onMouseMove = (event: React.MouseEvent) => {
        if (!settingTarget) return
        updateTargetFromScreenPos(event)
    }

    const onContextMenu = (event: React.MouseEvent) => event.preventDefault()

    return (
        <div onMouseMove={onMouseMove} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onContextMenu={onContextMenu}>
            <Stage width={GAME_SCREEN_WIDTH} height={GAME_SCREEN_HEIGHT} options={{ backgroundColor: 0x84DC8B, antialias: false }}>
                <AppConsumer>
                    {app => <GameMap app={app} targetOffset={targetOffset} offset={offset} onOffsetUpdated={onOffsetUpdated} />}
                </AppConsumer>
                <Sprite image={Character} anchor={0.5} x={300} y={300} />
                <Text text="Pete" anchor={0.5} x={300} y={270} style={new TextStyle({ fontSize: 20 })} />
            </Stage>
        </div>
    )
}

export default GameScreen