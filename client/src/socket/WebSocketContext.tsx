import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from "react"
import { EventFromServer } from "./EventFromServer"
import { EventToServer } from "./EventToServer"

const getSocketUrl = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        return "ws://localhost:8080/ws"
    }
    return `wss://${window.location.host}/ws`
}

const limitedRetries = false
const maxRetries = 5

const WebSocketContext = createContext<{
    connect: (socketUrl: string, retriesRemaining?: number) => void
    disconnect: () => void
    on: (event: EventFromServer, func: (event: EventFromServer) => void) => void
    send: (event: EventToServer) => void
}>({
    connect: () => {},
    disconnect: () => {},
    on: () => {},
    send: () => {}
})

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
    const [connection, setConnection] = useState<WebSocket | undefined>()
    const [eventListeners, setEventListeners] = useState<{ [key: number]: (event: EventFromServer) => void }>({})
    const [hasFailedToConnect, setHasFailedToConnect] = useState(false)

    const onEventReceived = useCallback(
        (event: MessageEvent<any>) => {
            const eventObject: EventFromServer = JSON.parse(event.toString())
            const listener = eventListeners[eventObject.type]
            if (listener != undefined) listener(eventObject)
        },
        [eventListeners]
    )

    const addListenerToSocket = useCallback((event: EventFromServer, func: (event: EventFromServer) => void) => {
        if (eventListeners[event.type] !== undefined) return

        setEventListeners(eventListeners => ({
            ...eventListeners,
            [event.type]: func
        }))
    }, [])

    const sendToSocket = useCallback(
        (event: EventToServer) => {
            if (connection === undefined || connection.readyState !== WebSocket.OPEN) return

            connection.send(JSON.stringify(event))
        },
        [connection]
    )

    const disconnectFromSocket = () => {}

    const connectToSocket = useCallback(
        (socketUrl: string, retriesRemaining = maxRetries) => {
            if (hasFailedToConnect) return

            if (limitedRetries && retriesRemaining === 0) {
                setConnection(undefined)
                setHasFailedToConnect(true)
                return
            }

            if (
                connection !== undefined &&
                (connection.readyState === WebSocket.CONNECTING || connection.readyState === WebSocket.OPEN)
            ) {
                connection.onmessage = onEventReceived
                return
            }

            const reconnectToSocketOnClose = (reason: string, retries = maxRetries) => {
                if (limitedRetries && retries === 1) {
                    setConnection(undefined)
                    setHasFailedToConnect(true)
                    return
                }

                const nextAmountOfRetries = retries - 1
                setTimeout(() => {
                    connectToSocket(socketUrl, nextAmountOfRetries)
                }, 3000)
            }

            const newConnection = new WebSocket(socketUrl)

            newConnection.onopen = () => {
                setConnection(newConnection)
                setHasFailedToConnect(false)
                newConnection.onclose = event => reconnectToSocketOnClose(event.reason)
            }

            newConnection.onmessage = onEventReceived

            newConnection.onclose = event => reconnectToSocketOnClose(event.reason, retriesRemaining)

            newConnection.onerror = (error: Event) => {
                console.error("Socket error: ", error)
                newConnection.close()
            }
        },
        [connection, hasFailedToConnect, onEventReceived]
    )

    useEffect(() => {
        connectToSocket(getSocketUrl())
    }, [connectToSocket])

    const value = {
        connect: connectToSocket,
        disconnect: disconnectFromSocket,
        on: addListenerToSocket,
        send: sendToSocket
    }

    return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>
}

export const useWebSocket = () => useContext(WebSocketContext)
