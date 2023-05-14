export enum EventFromServerType {
    PLAYER_POSITIONS_UPDATED = 0,
    ABILITY_CAST = 1,
    PLAYER_USERNAME_REQUEST = 2
}

export type EventFromServer = PlayerPositionsUpdatedEvent | AbilityCastEvent | PlayerUsernameRequestEvent

export type PlayerPositionsUpdatedEvent = {
    type: EventFromServerType.PLAYER_POSITIONS_UPDATED
    data: {
        playerPositions: {
            playerId: string
            x: number
            y: number
        }[]
    }
}

export type AbilityCastEvent = {
    type: EventFromServerType.ABILITY_CAST
    data: {
        playerId: string
        x: number
        y: number
    }
}

export type PlayerUsernameRequestEvent = {
    type: EventFromServerType.PLAYER_USERNAME_REQUEST
    data: string
}
