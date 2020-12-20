import { Dimensions } from "react-native"

const screen = Dimensions.get('window')
const SPEED = screen.width / 190

const MoveHiyo = (entities) => {
    let hiyo = entities.hiyo
    let newX = hiyo.position[0]
    let newY = hiyo.position[1]
    if (entities.hina.position[0] < newX) {
        newX -= SPEED
    }
    if (entities.hina.position[0] > newX) {
        newX += SPEED
    }
    if (entities.hina.position[1] < newY) {
        newY -= SPEED
    }
    if (entities.hina.position[1] > newY) {
        newY += SPEED
    }
    hiyo.position = [
        newX, newY
    ]

    return entities
}

export { MoveHiyo }