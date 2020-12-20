import { Dimensions } from "react-native"
const screen = Dimensions.get('window')

const PushHina = (entities) => {
    let borderLeft = screen.width/2 - entities.board.size[0]/2
    let borderRight = screen.width/2 + entities.board.size[0]/2
    let borderTop = screen.height/2 - entities.board.size[1]/2
    let borderBottom = screen.height/2 + entities.board.size[1]/2
    let hina = entities.hina
    let newX = hina.position[0]
    let newY = hina.position[1]
    if (newX < borderLeft) {
        newX = borderLeft
    }
    if (newX > borderRight) {
        newX = borderRight
    }
    if (newY < borderTop) {
        newY = borderTop
    }
    if (newY > borderBottom) {
        newY = borderBottom
    }

    hina.position = [
        newX, newY
    ]

    return entities
}

export { PushHina }