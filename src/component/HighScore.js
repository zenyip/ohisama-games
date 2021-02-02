import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import theme from '../theme'
import ScoreList from './ScoreList'
import { hideScoreBoard } from '../reducer/scoreBoardReducer'
import HighScoreSubmission from './HighScoreSubmission'

const screen = Dimensions.get('window')

const HighScore = (props) => {
    const handleClose = () => {
        props.hideScoreBoard()
    }

    if (props.scoreBoardOn) {
        return(
            <View style={styles.overall}>
                <View style={styles.background}/>
                <View style={styles.scoreBoard}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>
                            High Scores
                        </Text>
                        <Text style={styles.currentScoreText}>
                            Your Score: {props.finalScore}
                        </Text>
                    </View>
                    <View style={styles.highScores}>
                        <ScoreList game={props.game}/>
                    </View>
                    <View style={styles.button}>
                        <HighScoreSubmission summitButtonOn={props.summitButtonOn} game={props.game} score={props.finalScore}/>
                        <Text AccessibilityRole="Button" onPress={handleClose} style={styles.buttonText}>
                            Close High Scores
                        </Text>
                    </View>
                </View>
            </View> 
        )
    } else {
        return null
    }
}

const styles = StyleSheet.create({
    overall: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        height: screen.height,
        width: screen.width
    },
    scoreBoard: {
        opacity: 0.8,
        width: screen.width*3/4,
        height: screen.height*3/4,
        backgroundColor: theme.colours.skyBlue,
        borderColor: theme.colours.lightViolet,
        borderWidth: 4,
        borderRadius: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 32,
        color: theme.colours.lightViolet,
        fontWeight: "bold",
        textDecorationLine: "underline"
    },
    currentScoreText: {
        fontSize: theme.fontSize.normal,
        color: theme.colours.lightViolet,
        fontWeight: "bold",
    },
    highScoreText: {
        fontSize: theme.fontSize.normal,
        color: theme.colours.lightViolet,
        fontWeight: "bold",
    },
    buttonText: {
        fontSize: theme.fontSize.small,
        fontWeight: "bold",
        color: theme.colours.violet,
        padding: 10
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    highScores: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    background: {
        opacity: 0.5,
        backgroundColor: theme.colours.skyBlue,
        position: 'absolute',
        height: screen.height,
        width: screen.width
    }
})

const mapStateToProps = (state) => {
	return {
        scoreBoardOn: state.scoreBoardOn,
        finalScore: state.finalScore
    }
}

const mapDispatchToProps = {
    hideScoreBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(HighScore)