import React from 'react'
import { StyleSheet, Text } from 'react-native'
import Colours from '../Colours'

const ButtonBack = (props) => {
    const handleBack = () => {
        if (props.disable !== true) {
            props.navigation.goBack()
        }
    }

    return(
        <Text AccessibilityRole="Button" onPress={handleBack} style={props.disable ? styles.backButton_disabled : styles.backButton}>
            Back
        </Text> 
    )
}

const styles = StyleSheet.create({
    backButton: {
        fontSize: 16,
        padding: 5,
        color: Colours.THEME_RED
    },
    backButton_disabled: {
        fontSize: 16,
        padding: 5,
        color: Colours.LIGHT_GRAY
    }
})

export default ButtonBack