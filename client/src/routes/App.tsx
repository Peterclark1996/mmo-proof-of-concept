import Game from "./game/Game"
import Login from "./login/Login"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"
import { WebSocketProvider } from "../socket/WebSocketContext"

const App = () => {
    const [username, setUsername] = useState<string>("")

    return (
        <WebSocketProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login username={username} setUsername={setUsername} />} />
                    <Route path="/game" element={<Game username={username} />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        </WebSocketProvider>
    )
}

export default App
