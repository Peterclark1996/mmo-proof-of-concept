export enum EventToServerType {
    PLAYER_MOVED = 0,
    PLAYER_CAST = 1
}

export type EventToServer = PlayerMovedEvent | PlayerCastEvent

export type PlayerMovedEvent = {
    type: EventToServerType.PLAYER_MOVED
    data: {
        x: number
        y: number
    }
}

export type PlayerCastEvent = {
    type: EventToServerType.PLAYER_MOVED
    data: {
        x: number
        y: number
    }
}
