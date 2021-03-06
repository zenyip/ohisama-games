import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import theme from '../theme'

const screen = Dimensions.get('window')

const Instruction = (props) => {
    const [instructionOn, setInstructionOn] = useState(true)

    const handleAccept = () => {
        setInstructionOn(false)
    }

    if (instructionOn === true) {
        return(
            <View style={styles.overall}>
                <View style={styles.background}/>
                <View style={styles.instructionBoard}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>
                            {props.title}
                        </Text>
                    </View>
                    <View style={styles.instruction}>
                        <Text style={styles.instructionText}>
                            {props.instruction}
                        </Text>
                    </View>
                    <View style={styles.button}>
                        <Text AccessibilityRole="Button" onPress={handleAccept} style={styles.buttonText}>
                            Hide Instruction
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
    instructionBoard: {
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
    instructionText: {
        fontSize: theme.fontSize.normal,
        color: theme.colours.lightViolet,
        fontWeight: "bold",
    },
    buttonText: {
        fontSize: theme.fontSize.small,
        fontWeight: "bold",
        color: theme.colours.violet
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    instruction: {
        flex: 2,
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

export default Instruction