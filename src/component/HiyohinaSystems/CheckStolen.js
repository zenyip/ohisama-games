import { Dimensions } from "react-native"
const screen = Dimensions.get('window')

const CheckStolen = (entities, { dispatch }) => {
    let target = entities.target
    let hina = entities.hina

    if (Math.pow(hina.position[0] - target.position[0], 2) + Math.pow(hina.position[1] - target.position[1], 2) < Math.pow(screen.width * 3 / 40, 2)) {
        
        target.score += 1

        let newX = Math.floor(Math.random() * entities.board.size[0]/2 + screen.width/2 - entities.board.size[0]/2)
        let newY = Math.floor(Math.random() * entities.board.size[1]/2 + screen.height/2 - entities.board.size[1]/2)

        let newSqDistance = Math.pow(hina.position[0] - newX, 2) + Math.pow(hina.position[1] - newY, 2)
        
        while (newSqDistance < Math.pow(screen.width * 6 / 40, 2)) {
            newX = Math.floor(Math.random() * entities.board.size[0]/2 + screen.width/2 - entities.board.size[0]/2)
            newY = Math.floor(Math.random() * entities.board.size[1]/2 + screen.height/2 - entities.board.size[1]/2)
            newSqDistance = Math.pow(hina.position[0] - newX, 2) + Math.pow(hina.position[1] - newY, 2)
        }
        
        target.position = [newX, newY]

        dispatch({ type: "stolen"})
    }

    return entities
}

export { CheckStolen }