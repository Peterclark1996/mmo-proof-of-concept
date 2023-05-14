import Game from "./game/Game"
import Login from "./login/Login"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"
import { useUserSettings } from "../contexts/UserSettingsContext"
import Checkbox from "../library/Checkbox"

const App = () => {
    const { settings, updateSettings } = useUserSettings()

    const onDebugModeChange = () => {
        updateSettings({ isInDebugMode: !settings.isInDebugMode })
    }

    const [username, setUsername] = useState<string>("")

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login username={username} setUsername={setUsername} />} />
                <Route path="/game" element={<Game username={username} />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
            <div className="fixed bottom-0 right-0 flex bg-slate-500 rounded-tl py-1 px-2 text-white select-none items-center">
                <span className="me-2">Debug</span>
                <Checkbox checked={settings.isInDebugMode} onChange={onDebugModeChange} />
            </div>
        </BrowserRouter>
    )
}

export default App
