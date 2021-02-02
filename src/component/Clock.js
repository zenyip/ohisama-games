import React, { useEffect } from 'react'
import { StyleSheet, View, Text} from 'react-native'
import theme from '../theme'
import { connect } from 'react-redux'
import { setFinalScore } from '../reducer/finalScoreReducer'

const grading = (diff) => {
    if (diff < 0.05) {
        return 'Godlike'
    }
    if (diff < 0.28) {
        return "U Beat Q-ko!"
    }
    if (diff < 1) {
        return "Not bad"
    }
    return "Far from Q-ko"
}


const Clock = (props) => {
    const diff = Number(Math.round((props.time - props.target)+'e3')+'e-3')
    const score = Math.abs(diff)

    useEffect(() => {
        props.setFinalScore(score)
    }, [props.isEnded])
    
    if (props.isEnded) {
        return (
            <View>
                <View style={styles.gradingBox}>
                    <Text style={styles.grades}>{grading(score)}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.text}>{props.time}s</Text>
                    <Text style={styles.diffText}>
                        {
                        diff > 0 ?
                        '+' + diff.toFixed(3) :
                        diff.toFixed(3)}s
                    </Text>
                </View>
            </View>
        )
    } else {
        return (
            <View>
                <View style={styles.gradingBox}></View>
                <Text style={styles.text}>{props.time >=3 ? "?" : props.time}s</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: theme.fontSize.huge,
    },
    diffText: {
        fontSize: theme.fontSize.small,
        color: theme.colours.violet,
        padding: 10
    },
    gradingBox: {
        padding: 20,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    grades: {
        fontSize: theme.fontSize.huge,
        fontWeight: 'bold',
        color: theme.colours.skyBlue,
        textShadowColor: theme.colours.lightViolet,
        textShadowRadius: 2,
        textShadowOffset: {width: 2, height:2}
    }
})

const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = {
    setFinalScore
}

export default connect(mapStateToProps, mapDispatchToProps)(Clock)