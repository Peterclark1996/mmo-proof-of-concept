import { Application } from "pixi.js"
import Point from "../../types/Point"

type DebugInfoProps = {
    appHandle: Application | undefined
    playerId: string
    playerPositionServerSide: Point
    playerPostionClientSide: Point
}

const DebugInfo = ({ appHandle, playerId, playerPositionServerSide, playerPostionClientSide }: DebugInfoProps) => {
    const fps = Math.round(appHandle?.ticker?.FPS ?? 0)
    const maxFps = appHandle?.ticker?.maxFPS ?? 0

    const serverX = Math.round(playerPositionServerSide.x)
    const serverY = Math.round(playerPositionServerSide.y)

    const clientX = Math.round(playerPostionClientSide.x)
    const clientY = Math.round(playerPostionClientSide.y)

    return (
        <div className="absolute flex flex-col items-start">
            <span>
                FPS: {fps}/{maxFps}
            </span>
            <span>Player Id: {playerId}</span>
            <span>
                Server Position: {serverX}, {serverY}
            </span>
            <span>
                Client Position: {clientX}, {clientY}
            </span>
        </div>
    )
}

export default DebugInfo
