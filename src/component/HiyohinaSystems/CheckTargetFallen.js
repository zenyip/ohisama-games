import { Dimensions } from "react-native"
const screen = Dimensions.get('window')

const CheckTargetFallen = (entities) => {
    let borderLeft = screen.width/2 - entities.board.size[0]/2
    let borderRight = screen.width/2 + entities.board.size[0]/2
    let borderTop = screen.height/2 - entities.board.size[1]/2
    let borderBottom = screen.height/2 + entities.board.size[1]/2
    let target = entities.target

    let newX = target.position[0]
    let newY = target.position[1]

    if (newX < borderLeft || newX > borderRight || newY < borderTop || newY > borderBottom) {       
        newX = Math.floor(Math.random() * entities.board.size[0]/2 + borderLeft)
        newY = Math.floor(Math.random() * entities.board.size[1]/2 + borderTop)
        target.position = [newX, newY]
    }

    return entities
}

export { CheckTargetFallen }