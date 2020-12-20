import React, { useState } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, Switch, Dimensions, TouchableOpacity, Platform } from 'react-native'
import Clock from './Clock'
import ButtonBack from './ButtonBack'
import AdBanner from './AdBanner'
import Instruction from './Instruction'
import { AdMobInterstitial } from 'expo-ads-admob'
import { addRetryCount } from '../reducer/retryCountReducer'
import { Audio } from 'expo-av'
import Colours from '../Colours'

const screen = Dimensions.get('window')

const instructionText = "Stop the watch as close as the target time. \n\n (10s or 25s at your choice)"

const Q_GamePage = (props) => {
    const [is25s, setIs25s] = useState(false)
    const toggleSwitch = () => setIs25s(previousState => !previousState)

    const [isSwitchDisabled, setIsSwitchDisabled] = useState(false)

    const [buttonText, setButtonText] = useState('Start')

    const [startTime, setStartTime] = useState(null)
    
    const [timer, setTimer] = useState(0)

    const [currentInterval, setCurrentInterval] = useState(null)

    const [stage, setStage] = useState('ready')
    
    const startSound = new Audio.Sound()
    const stopSound = new Audio.Sound()
    
    const toggleStart = async () => {
        if (stage === 'ready') {
            var temp_startTime = Date.now()
            setStartTime(Date.now())
            setCurrentInterval(setInterval(()=>{
                setTimer((Date.now() - temp_startTime) / 1000)
            }, 100))
            setButtonText('Stop')
            setIsSwitchDisabled(true)
            setStage('started')
            try {
                await startSound.unloadAsync()
                await startSound.loadAsync(require('../sound/start.mp3'))
                await startSound.playAsync()
            } catch (error) {
                console.log("Start Sound Playing Error", error)
            }
        }
        if (stage === 'started') {
            clearInterval(currentInterval)
            setTimer((Date.now() - startTime)/1000)
            setButtonText('Retry')
            setStage('ended')
            try {
                await stopSound.unloadAsync()
                await stopSound.loadAsync(require('../sound/stop.mp3'))
                await stopSound.playAsync()
            } catch (error) {
                console.log("Stop Sound Playing Error", error)
            }
        }
        if (stage === 'ended') {
            if (props.retryCount % 5 === 4) {
                await AdMobInterstitial.setAdUnitID(Platform.select({
                    ios: 'ca-app-pub-3940256099942544/4411468910',
                    android: 'ca-app-pub-3940256099942544/1033173712'
                }))
                await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true})
                await AdMobInterstitial.showAdAsync()
            }
            props.addRetryCount()
            setTimer(0)
            setButtonText('Start')
            setIsSwitchDisabled(false)
            setStage('ready')
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.main}>
                <Clock target={is25s ? 25 : 10} time={timer} isEnded={stage === 'ended'}/>
                <View style={styles.switchBar}>
                    <Text style={is25s ? styles.switchText : styles.switchText_chosen}>10s</Text>
                    <View style={{padding: 10}}>
                        <Switch
                            trackColor = {{ false: Colours.THEME_PURPLE, true: Colours.THEME_VIOLET }}
                            thumbColor = {is25s ? Colours.THEME_PURPLE : Colours.THEME_PURPLE}
                            ios_backgroundColor = {Colours.THEME_VIOLET}
                            onValueChange={toggleSwitch}
                            value={is25s}
                            disabled={isSwitchDisabled}
                        />
                    </View>
                    <Text style={is25s ? styles.switchText_chosen : styles.switchText}>25s</Text>
                </View>
                <TouchableOpacity style={styles.startButton} onPress={toggleStart}>
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
                <ButtonBack navigation={props.navigation} disable={stage === 'started' ? true : false} />
            </View>
            <AdBanner />
            <Instruction title="Q-ko Challenge" instruction={instructionText}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    switchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 36,
        fontWeight: 'bold'
    },
    switchText: {
        fontSize: 24,
        color: Colours.LIGHT_GRAY
    },
    switchText_chosen: {
        fontSize: 24,
        color: Colours.THEME_RED
    },
    startButton: {
        borderWidth: 5,
        borderColor: Colours.THEME_PURPLE,
        width: screen.width/4,
        height: screen.width/4,
        borderRadius: screen.width/4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 24,
        color: Colours.THEME_PURPLE
    }
})

const mapStateToProps = (state) => {
	return {
        retryCount: state.retryCount
    }
}

const mapDispatchToProps = {
    addRetryCount
}

export default connect(mapStateToProps, mapDispatchToProps)(Q_GamePage)