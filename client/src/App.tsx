import { useEffect, useState } from "react"
import GameScreen from "./GameScreen"
import Point from "./types/Point"

const App = () => {
    const [offset, setOffset] = useState<Point>({ x: 0, y: 0 })

    return (
        <div className="App">
            <GameScreen offset={offset} onOffsetUpdated={setOffset} />
        </div>
    )
}

export default App