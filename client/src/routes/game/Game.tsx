import { useEffect, useState } from "react"
import GameScreen from "./GameScreen"
import Point from "../../types/Point"
import { useNavigate } from "react-router-dom"
import { useWebSocket } from "../../contexts/socket/WebSocketContext"
import { EventToServerType } from "../../contexts/socket/EventToServer"
import { GAME_SCREEN_CENTER } from "./constants"
import {
    EventFromServer,
    EventFromServerType,
    PlayerPositionsUpdatedEvent
} from "../../contexts/socket/EventFromServer"
import PlayerPosition from "../../types/PlayerPosition"
import DebugInfo from "./DebugInfo"
import { useUserSettings } from "../../contexts/UserSettingsContext"
import { Application } from "pixi.js"

type GameProps = {
    username: string
}

const Game = ({ username }: GameProps) => {
    const { settings } = useUserSettings()
    const navigate = useNavigate()
    const { on, send } = useWebSocket()

    useEffect(() => {
        if (username === "") navigate("/login")
        send({ type: EventToServerType.PLAYER_SET_USERNAME, data: { username } })
    }, [navigate, send, username])

    useEffect(() => {
        on(EventFromServerType.PLAYER_USERNAME_REQUEST, () => {
            send({ type: EventToServerType.PLAYER_SET_USERNAME, data: { username } })
        })
    }, [on, send, username])

    const [localPlayerPosition, setLocalPlayerPosition] = useState<Point>({
        x: 0,
        y: 0
    })

    const onLocalPlayerPositionUpdated = (point: Point) => {
        if (localPlayerPosition.x === point.x && localPlayerPosition.y === point.y) return
        setLocalPlayerPosition(point)
    }

    const [playerPositions, setPlayerPositions] = useState<PlayerPosition[]>([])

    useEffect(() => {
        on(EventFromServerType.PLAYER_POSITIONS_UPDATED, (data: EventFromServer) => {
            const event = data as PlayerPositionsUpdatedEvent
            setPlayerPositions(event.data.playerPositions)
        })
    }, [on, setPlayerPositions])

    const localPlayerFromServerPerspective = playerPositions.find(
        playerPosition => playerPosition.playerId === username
    )

    const offset = {
        x: GAME_SCREEN_CENTER.x - localPlayerPosition.x,
        y: GAME_SCREEN_CENTER.y - localPlayerPosition.y
    }

    const [appHandle, setAppHandle] = useState<Application>()

    return (
        <div>
            {settings.isInDebugMode && (
                <DebugInfo
                    appHandle={appHandle}
                    playerId={username}
                    playerPositionServerSide={localPlayerFromServerPerspective ?? { x: 0, y: 0 }}
                    playerPostionClientSide={localPlayerPosition}
                />
            )}
            <GameScreen
                localUsername={username}
                playerPositions={playerPositions}
                offset={offset}
                serverPlayerPosition={localPlayerFromServerPerspective ?? { x: 0, y: 0 }}
                localPlayerPosition={localPlayerPosition}
                onLocalPlayerPositionUpdated={onLocalPlayerPositionUpdated}
                onAppHandleUpdated={setAppHandle}
            />
            <div>Q: Spell</div>
        </div>
    )
}

export default Game
