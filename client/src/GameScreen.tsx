import { Sprite, Stage, Text } from "@inlet/react-pixi"
import { TextStyle } from "@pixi/text"
import Character from "./assets/Character.png"

const GameScreen = () => (
    <Stage width={600} height={600} options={{ backgroundColor: 0x84DC8B, antialias: false }}>
        <Sprite image={Character} anchor={0.5} x={300} y={300} />
        <Text text="Pete" anchor={0.5} x={300} y={270} style={new TextStyle({ fontSize: 20 })} />
    </Stage>
)

export default GameScreen