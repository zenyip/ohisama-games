import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'
import { Audio } from 'expo-av'
import theme from '../theme'

const introSound = new Audio.Sound()
const INTROSOUND_H1 = require('../sound/ehehe.m4a')
const INTROSOUND_H2 = require('../sound/iine.m4a')
const INTROSOUND_H3 = require('../sound/yaho.m4a')
const INTROSOUNDS = [INTROSOUND_H1, INTROSOUND_H2, INTROSOUND_H3]

const HiyohinaButton = (props) => {
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
            props.navigation.navigate('Game_Hi')
        }, 1500)
    }

    return(
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Image
                style={styles.logo}
                source={require('../pic/logo_hiyohina.png')}
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

HiyohinaButton.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default HiyohinaButton