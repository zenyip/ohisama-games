import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import ButtonBack from './ButtonBack'
import QkoButton from './QkoButton'
import HiyohinaButton from './HiyohinaButton'
import AdBanner from './AdBanner'
import theme from '../theme'

const MenuPage = (props) => {
    return(
        <View style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.text}>Choose A Challenge</Text>
                <View style={styles.games}>
                    <QkoButton navigation={props.navigation} />
                    <HiyohinaButton navigation={props.navigation} />
                </View>
                <ButtonBack navigation={props.navigation} />
            </View>
            <AdBanner />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colours.backgroundWhite,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    games: {
        flexDirection: 'row',
        height: 250,
        paddingVertical: 50
    },
    text: {
        fontSize: theme.fontSize.large,
        fontWeight: 'bold'
    }
})

export default MenuPage