export enum EventFromServerType {
    PLAYER_POSITIONS_UPDATED = 0,
    ABILITY_CAST = 1
}

export type EventFromServer = PlayerPositionsUpdatedEvent | AbilityCastEvent

export type PlayerPositionsUpdatedEvent = {
    type: EventFromServerType.PLAYER_POSITIONS_UPDATED
    data: {}
}

export type AbilityCastEvent = {
    type: EventFromServerType.ABILITY_CAST
    data: {}
}
