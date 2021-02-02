const baseUrl = 'https://ohisama-games.herokuapp.com/api/scores/'

const getScores = async (game) => {
    try {
        let response = await fetch(
            baseUrl + game
        )
        let scores = await response.json()
        return scores
    } catch (error) {
        console.error(error)
    }
}

const summitScore = async (props) => {
	const player = props.player
    const score = props.score
    const game = props.game
    try {
        let response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                player,
                score,
                game
            })
        })
        let summitedScore = await response.json()
        return summitedScore
    } catch (error) {
        console.error(error);
    }
}

export default { getScores, summitScore }