import React from 'react'
import { AdMobBanner } from 'expo-ads-admob'
import { View, StyleSheet, Platform } from 'react-native'

const AdBanner = () => {
    return (
        <View style={styles.container}>
            <AdMobBanner
                bannerSize = "banner"
                adUnitID = {Platform.select({
                    ios: "ca-app-pub-3940256099942544/2934735716",
                    android: "ca-app-pub-3940256099942544/6300978111"
                })}
                servePersonalizedAds
                onDidFailToReceiveAdWithError={'bannerError'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default AdBanner