import React, { useState, useRef }  from "react"
import { connect } from 'react-redux'
import { View, TouchableOpacity, Text, Dimensions, StyleSheet } from "react-native"
import { Audio } from 'expo-av'
import AdBanner from "./AdBanner"
import Instruction from './Instruction'
import { GameEngine } from "react-native-game-engine"
import { Hiyohina } from "./HiyohinaEntities/Hiyohina"
import { Target } from "./HiyohinaEntities/Target"
import { MoveHina } from "./HiyohinaSystems/MoveHina"
import { MoveHiyo } from "./HiyohinaSystems/MoveHiyo"
import { ShrinkBoard } from "./HiyohinaSystems/ShrinkBoard"
import { PushHina } from "./HiyohinaSystems/PushHina"
import { CheckCaught } from "./HiyohinaSystems/CheckCaught"
import { Board } from "./HiyohinaEntities/Board"
import { AdMobInterstitial } from 'expo-ads-admob'
import { addRetryCount } from '../reducer/retryCountReducer'
import ButtonBack from "./ButtonBack"
import Colours from "../Colours"
import { CheckTargetFallen } from "./HiyohinaSystems/CheckTargetFallen"
import { CheckStolen } from "./HiyohinaSystems/CheckStolen"

const screen = Dimensions.get('window')

const instructionText = "Control Hina to collect the targets while dodging from Hiyo!!"

const getEntities = () => {
	return {
        board: { position: [screen.width / 2,  screen.height / 2 ], size: [screen.width, screen.width * 1.5], renderer: <Board />},
        target: { position: [Math.floor(Math.random() * screen.width), Math.floor((Math.random() * 0.8 + 0.1) * screen.height)], score: 0, renderer: <Target />},
        hina: { position: [screen.width / 2,  screen.height / 2 ], char: "hina", renderer: <Hiyohina />},
        hiyo: { position: [Math.floor(Math.random() * screen.width), screen.height / 2 - screen.width * 3 / 8], char: "hiyo", renderer: <Hiyohina />}
    }
}

const Hi_GamePage = (props) => {
    const [stage, setStage] = useState('ready')
    const [isRunning, setIsRunning] = useState(false)
    const [buttonText, setButtonText] = useState('Start')
    const [score, setScore] = useState(0)
    const engine = useRef(null)
    const startSound = new Audio.Sound()
    const endSound = new Audio.Sound()

    const onEvent = async(e) => {
        if (e.type === "gameover") {
            try {
                await endSound.unloadAsync()
                await endSound.loadAsync(require('../sound/ganbaran.m4a'))
                await endSound.playAsync()
            } catch (error) {
                console.log("End Sound Playing Error", error)
            }
            setStage('ended')
            setIsRunning(false)
        }
        if (e.type === "stolen") {
            setScore(score + 1)
        }
    }

    const toggleStart = async () => {
        if (stage === 'ready') {
            setButtonText('Retry')
            setStage('started')
            try {
                await startSound.unloadAsync()
                await startSound.loadAsync(require('../sound/win.m4a'))
                await startSound.playAsync()
            } catch (error) {
                console.log("Start Sound Playing Error", error)
            }
            setIsRunning(true)
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
            engine.current.swap(getEntities())
            setButtonText('Start')
            setScore(0)
            setStage('ready')
        }
    }

    const finalScore = () => {
        if (stage === "ended") {
            return (
                <View style={styles.finalScore}>
                    <Text style={styles.scoreText}>Final Score</Text>
                    <Text style={styles.scoreText}>{score}</Text>
                </View>
            )
        }
    }

    const buttons = () => {
        if (stage !== "started") {
            return (
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.startButton} onPress={toggleStart}>
                            <Text style={styles.buttonText}>{buttonText}</Text>
                    </TouchableOpacity>
                    <ButtonBack navigation={props.navigation} />
                </View>
            )
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <GameEngine
                    style={styles.gameContainer}
                    systems={[MoveHina, MoveHiyo, ShrinkBoard, PushHina, CheckCaught, CheckTargetFallen, CheckStolen]}
                    entities={getEntities()}
                    running={isRunning}
                    onEvent={onEvent}
                    ref={engine}>
                </GameEngine>
            </View>
            {finalScore()}
            {buttons()}
            <AdBanner />
            <Instruction title="HinaHiyo Game" instruction={instructionText}/>
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
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    gameContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center'
    },
    buttons: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: screen.height*2/3
    },
    startButton: {
        borderWidth: 5,
        borderColor: Colours.THEME_VIOLET,
        width: screen.width/4,
        height: screen.width/4,
        borderRadius: screen.width/4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 24,
        color: Colours.THEME_VIOLET
    },
    finalScore: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: screen.height/2
    },
    scoreText: {
        fontSize: 36,
        color: Colours.THEME_RED
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

export default connect(mapStateToProps, mapDispatchToProps)(Hi_GamePage)