import Point from "./types/Point"

export const GAME_SCREEN_WIDTH = 1200
export const GAME_SCREEN_HEIGHT = 800

export const GAME_SCREEN_CENTER = { x: GAME_SCREEN_WIDTH / 2, y: GAME_SCREEN_HEIGHT / 2 }

export const SPRITE_HEIGHT = 30

export const BASE_PLAYER_SPEED = 100

export const moveTowards = (current: Point, target: Point, maxDistanceToTravel: number) => {
    const differenceX = target.x - current.x
    const differenceY = target.y - current.y
    const magnitude = Math.sqrt(differenceX * differenceX + differenceY * differenceY)
    if (magnitude <= maxDistanceToTravel) {
        return target
    } else {
        return {
            x: current.x + (differenceX / magnitude) * maxDistanceToTravel,
            y: current.y + (differenceY / magnitude) * maxDistanceToTravel
        }
    }
}
