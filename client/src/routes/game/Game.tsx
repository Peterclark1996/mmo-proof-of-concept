import { useEffect, useState } from "react"
import { GAME_SCREEN_HEIGHT, GAME_SCREEN_WIDTH } from "../../Constants"
import GameScreen from "./GameScreen"
import Point from "../../types/Point"
import { useNavigate } from "react-router-dom"

type GameProps = {
    username: string
}

const Game = ({ username }: GameProps) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (username === "") navigate("/login")
    }, [username])

    const [offset, setOffset] = useState<Point>({
        x: GAME_SCREEN_WIDTH / 2,
        y: GAME_SCREEN_HEIGHT / 2
    })

    return (
        <div className="d-flex flex-column">
            <GameScreen username={username} offset={offset} onOffsetUpdated={setOffset} />
            <div>Q: Spell</div>
        </div>
    )
}

export default Game
