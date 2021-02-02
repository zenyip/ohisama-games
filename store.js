import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import retryCountReducer from './src/reducer/retryCountReducer'
import scoreBoardReducer from './src/reducer/scoreBoardReducer'
import finalScoreReducer from './src/reducer/finalScoreReducer'
import scoresReducer from './src/reducer/scoresReducer'

const reducer = combineReducers({
	retryCount: retryCountReducer,
	scoreBoardOn: scoreBoardReducer,
	finalScore: finalScoreReducer,
	scores: scoresReducer
})

const store = createStore(
	reducer,
	composeWithDevTools(
		applyMiddleware(thunk)
	)
)

export default store