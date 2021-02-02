import scoresService from '../services/scores'

const scoresReducer = (state = [], action) => {
    switch(action.type) {
        case 'GET_SCORES_FROM_API': {
            return action.data
        }
        case 'SUMMIT_SCORE': {
            return action.data
        }
        default:
            return state
    }
}

export const getScoresFromApi = (game) => {
    return async dispatch => {
		const scores = await scoresService.getScores(game)
		dispatch({
			type: 'GET_SCORES_FROM_API',
			data: scores
		})
	}
}

export const summitScoreToServer = (props) => {
	return async dispatch => {
        const summitedScore = await scoresService.summitScore(props)
        const updatedScore = await scoresService.getScores(props.game)
		dispatch({
			type: 'SUMMIT_SCORE',
			data: updatedScore
		})
		return summitedScore
	}
}

export default scoresReducer