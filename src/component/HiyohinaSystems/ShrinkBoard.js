import { Dimensions } from "react-native"

const screen = Dimensions.get('window')
const SPEED = screen.width / 1900

const ShrinkBoard = (entities) => {
    let board = entities.board
    board.size = [
        board.size[0] - SPEED, board.size[1] - SPEED
    ]

    return entities
}

export { ShrinkBoard }