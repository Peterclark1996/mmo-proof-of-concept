import Point from "./types/Point"

export const GAME_SCREEN_WIDTH = 1200
export const GAME_SCREEN_HEIGHT = 800

export const PLAYER_SPEED = 5

export const mousePosToGamePos = (mousePos: Point, offset: Point) => ({
    x: offset.x + (GAME_SCREEN_WIDTH / 2) - mousePos.x,
    y: offset.y + (GAME_SCREEN_HEIGHT / 2) - mousePos.y
})

export const moveTowards = (current: Point, target: Point, maxDistanceDelta: number) => {
    const difference = { x: target.x - current.x, y: target.y - current.y }
    const magnitude = Math.sqrt(difference.x * difference.x + difference.y * difference.y)
    if (magnitude <= maxDistanceDelta || magnitude === 0) return target
    return {
        x: current.x + (difference.x / magnitude) * maxDistanceDelta,
        y: current.y + (difference.y / magnitude) * maxDistanceDelta
    }
}