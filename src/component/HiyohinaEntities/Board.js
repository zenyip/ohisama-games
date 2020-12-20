import React, { PureComponent } from "react"
import { View } from "react-native"
import Colours from "../../Colours"

class Board extends PureComponent {
    render() {
        const x = this.props.position[0] - this.props.size[0]/2
        const y = this.props.position[1] - this.props.size[1]/2
        return (
            <View style={{
                width: this.props.size[0],
                height: this.props.size[1],
                borderWidth: 2,
                borderColor: Colours.THEME_VIOLET,
                backgroundColor: Colours.THEME_PURPLE,
                position: "absolute",
                left: x,
                top: y
            }} />
        )
    }
}

export { Board };