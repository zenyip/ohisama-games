const scoreBoardReducer = (state = false, action) => {
    switch(action.type) {
        case 'SHOW_SCORE_BOARD': {
            return true
        }
        case 'HIDE_SCORE_BOARD': {
            return false
        }
        default:
            return state
    }
}

export const showScoreBoard = () => {
    return {
        type: 'SHOW_SCORE_BOARD',
    }
}

export const hideScoreBoard = () => {
    return {
        type: 'HIDE_SCORE_BOARD',
    }
}

export default scoreBoardReducer