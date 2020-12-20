import React, { PureComponent } from "react"
import { StyleSheet, View, Text, Dimensions } from "react-native"
import Colours from "../../Colours"

const screen = Dimensions.get('window')
const RADIUS = screen.width / 21

class Target extends PureComponent {
    render() {
        const x = this.props.position[0] - RADIUS
        const y = this.props.position[1] - RADIUS
        return (
            <View style={[styles.target, { left: x, top: y }]}>
                <Text style={styles.text}>{this.props.score}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    target: {
        borderColor: "purple",
        borderWidth: 4,
        borderRadius: RADIUS,
        width: RADIUS * 2,
        height: RADIUS * 2,
        backgroundColor: "purple",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 24,
        color: Colours.THEME_VIOLET
    }
})

export { Target }