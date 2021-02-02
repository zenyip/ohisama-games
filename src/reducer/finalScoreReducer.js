const finalScoreReducer = (state = null, action) => {
    switch(action.type) {
        case 'SET_FINAL_SCORE': {
            return action.data
        }
        default:
            return state
    }
}

export const setFinalScore = (finalScore) => {
    return {
        type: 'SET_FINAL_SCORE',
        data: finalScore
    }
}

export default finalScoreReducer