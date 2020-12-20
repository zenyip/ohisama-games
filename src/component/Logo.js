import React from 'react'
import { StyleSheet, Image } from 'react-native'

const Logo = () => (
    <Image
        style={styles.logo}
        source={require('../pic/logo_hinamask.png')}
    />
)

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 200
    }
})

export default Logo