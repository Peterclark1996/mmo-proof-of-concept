import { Sprite, Text } from "@inlet/react-pixi"
import { TextStyle } from "@pixi/text"
import Character from "./../../assets/Character.png"
import Point from "../../types/Point"
import { SPRITE_HEIGHT } from "../../constants"
import PlayerPosition from "../../types/PlayerPosition"

type OtherPlayersProps = {
    playerPositions: PlayerPosition[]
    offset: Point
}

const OtherPlayers = ({ playerPositions, offset }: OtherPlayersProps) => {
    return (
        <>
            {playerPositions.map(playerPosition => (
                <>
                    <Sprite
                        key={`${playerPosition.playerId}-sprite`}
                        image={Character}
                        anchor={0.5}
                        x={offset.x + playerPosition.x}
                        y={offset.y + playerPosition.y - SPRITE_HEIGHT / 2}
                    />
                    <Text
                        key={`${playerPosition.playerId}-text`}
                        text={playerPosition.playerId}
                        anchor={0.5}
                        x={offset.x + playerPosition.x}
                        y={offset.y + playerPosition.y - SPRITE_HEIGHT - 15}
                        style={new TextStyle({ fontSize: 20 })}
                    />
                </>
            ))}
        </>
    )
}

export default OtherPlayers
