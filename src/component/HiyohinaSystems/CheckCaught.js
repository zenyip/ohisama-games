import { Dimensions } from "react-native"

const screen = Dimensions.get('window')
const RADIUS = screen.width / 19

const CheckCaught = (entities, { dispatch }) => {
    let hiyo = entities.hiyo
    let hina = entities.hina

    if (Math.pow(hina.position[0] - hiyo.position[0], 2) + Math.pow(hina.position[1] - hiyo.position[1], 2) < Math.pow(2 * RADIUS, 2)) {
        dispatch({ type: "gameover"})
    }

    return entities
}

export { CheckCaught }