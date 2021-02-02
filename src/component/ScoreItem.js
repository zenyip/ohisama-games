import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import theme from '../theme'

const screen = Dimensions.get('window')

const ScoreItem = (props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.rankText}>{props.rank + 1}.</Text>
            <Text style={styles.playerText}>{props.data.player}</Text>
            <Text style={styles.scoreText}>Score: {props.data.score}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: theme.colours.skyBlue,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        alignSelf:'stretch',
        width: screen.width* 0.6
    },
    rankText: {
        flex: .1,
        fontSize: theme.fontSize.small
    },
    playerText: {
        flex: .45,
        fontSize: theme.fontSize.small
    },
    scoreText: {
        flex: .45,
        fontSize: theme.fontSize.small
    }
})

export default ScoreItem