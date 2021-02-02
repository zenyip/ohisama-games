const retryCountReducer = (state = 0, action) => {
    switch(action.type) {
        case 'COUNT_RETRIES': {
            return (state + 1)
        }
        default:
            return state
    }
}

export const addRetryCount = () => {
    return {
        type: 'COUNT_RETRIES',
    }
}

export default retryCountReducer