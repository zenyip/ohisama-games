import React from 'react'
import { StyleSheet, Text } from 'react-native'
import theme from '../theme'

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
        fontSize: theme.fontSize.small,
        padding: 5,
        color: theme.colours.violet
    },
    backButton_disabled: {
        fontSize: theme.fontSize.small,
        padding: 5,
        color: theme.colours.lightGrey
    }
})

export default ButtonBack