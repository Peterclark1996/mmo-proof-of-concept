import { createContext, ReactNode, useContext, useState } from "react"

const UserSettingsContext = createContext<{
    settings: UserSettings
    updateSettings: (settings: UserSettings) => void
}>({
    settings: {
        isInDebugMode: false
    },
    updateSettings: () => undefined
})

type UserSettings = {
    isInDebugMode: boolean
}

type UserSettingsProps = {
    children: ReactNode
}

export const UserSettingsProvider = ({ children }: UserSettingsProps) => {
    const [settings, setSettings] = useState({
        isInDebugMode: false
    })

    const updateSettings = (updatedSettings: UserSettings) => {
        setSettings(settings => ({ ...settings, ...updatedSettings }))
    }

    return <UserSettingsContext.Provider value={{ settings, updateSettings }}>{children}</UserSettingsContext.Provider>
}

export const useUserSettings = () => useContext(UserSettingsContext)
