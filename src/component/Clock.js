import React from 'react'
import { StyleSheet, View, Text} from 'react-native'
import Colours from '../Colours'

const grading = (diff) => {
    diff = Math.abs(diff)
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
    if (props.isEnded) {
        return (
            <View>
                <View style={styles.gradingBox}>
                    <Text style={styles.grades}>{grading(props.time - props.target)}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.text}>{props.time}s</Text>
                    <Text style={styles.diffText}>
                        {
                        (props.time - props.target) > 0 ?
                        '+' + (props.time - props.target).toFixed(3) :
                        (props.time - props.target).toFixed(3)}s
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
        fontSize: 48,
    },
    diffText: {
        fontSize: 16,
        color: Colours.THEME_RED,
        padding: 10
    },
    gradingBox: {
        padding: 20,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    grades: {
        fontSize: 48,
        fontWeight: 'bold',
        color: Colours.THEME_PURPLE,
        textShadowColor: Colours.THEME_VIOLET,
        textShadowRadius: 2,
        textShadowOffset: {width: 2, height:2}
    }
})

export default Clock