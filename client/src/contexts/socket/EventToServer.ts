import Point from "../../types/Point"

export enum EventToServerType {
    PLAYER_MOVING_TO = 0,
    PLAYER_CAST = 1,
    PLAYER_SET_USERNAME = 2
}

export type EventToServer = PlayerMovingToEvent | PlayerCastEvent | PlayerSetUsernameEvent

export type PlayerMovingToEvent = {
    type: EventToServerType.PLAYER_MOVING_TO
    data: Point
}

export type PlayerCastEvent = {
    type: EventToServerType.PLAYER_CAST
    data: Point
}

export type PlayerSetUsernameEvent = {
    type: EventToServerType.PLAYER_SET_USERNAME
    data: {
        username: string
    }
}
