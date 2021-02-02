import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'
import { Audio } from 'expo-av'
import theme from '../theme'

const introSound = new Audio.Sound()
const INTROSOUND_Q1 = require('../sound/heart.m4a')
const INTROSOUND_Q2 = require('../sound/konjo.m4a')
const INTROSOUND_Q3 = require('../sound/suuki.m4a')
const INTROSOUNDS = [INTROSOUND_Q1, INTROSOUND_Q2, INTROSOUND_Q3]

const QkoButton = (props) => {
    const handlePress = async () => {
        var randomIntro = await Math.floor(Math.random() * 3)
        try {
            await introSound.unloadAsync()
            await introSound.loadAsync(INTROSOUNDS[randomIntro])
            await introSound.playAsync()
        } catch (error) {
            console.log("IntroSoundError", error)
        }
        setTimeout(() => {
            props.navigation.navigate('Game_Q')
        }, 1500)
    }

    return(
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Image
                style={styles.logo}
                source={require('../pic/logo_qko.png')}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colours.backgroundWhite,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width:150,
        height:150
    }
})

QkoButton.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default QkoButton