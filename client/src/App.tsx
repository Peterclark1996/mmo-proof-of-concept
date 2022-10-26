import { useEffect, useState } from "react"
import { GAME_SCREEN_HEIGHT, GAME_SCREEN_WIDTH } from "./Constants"
import GameScreen from "./GameScreen"
import Point from "./types/Point"

const App = () => {
    const [offset, setOffset] = useState<Point>({ x: GAME_SCREEN_WIDTH / 2, y: GAME_SCREEN_HEIGHT / 2 })

    return (
        <div className="App">
            <GameScreen offset={offset} onOffsetUpdated={setOffset} />
        </div>
    )
}

export default App