import React, { PureComponent } from "react"
import { StyleSheet, View, Dimensions } from "react-native"

const screen = Dimensions.get('window')
const RADIUS = screen.width / 19

class Hiyohina extends PureComponent {
    render() {
        const x = this.props.position[0] - RADIUS
        const y = this.props.position[1] - RADIUS
        return (
            <View style={this.props.char === "hina" ? [styles.hina, { left: x, top: y }] : [styles.hiyo, { left: x, top: y }]} />
        )
    }
}

const styles = StyleSheet.create({
    hina: {
        borderColor: "#FF69B4",
        borderWidth: 4,
        borderRadius: RADIUS,
        width: RADIUS * 2,
        height: RADIUS * 2,
        backgroundColor: "yellow",
        position: "absolute"
    },
    hiyo: {
        borderColor: "orange",
        borderWidth: 4,
        borderRadius: RADIUS,
        width: RADIUS * 2,
        height: RADIUS * 2,
        backgroundColor: "white",
        position: "absolute"
    }
})

export { Hiyohina };