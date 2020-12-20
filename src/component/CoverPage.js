import React, {useEffect} from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import Logo from './Logo'
import PropTypes from 'prop-types'

const CoverPage = (props) => {
    var timeout = null

    useEffect(() => {
        timeout = setTimeout(() => {
            props.navigation.navigate('Menu')
        }, 1500)
    }, [])

    const handlePress = () => {
        clearTimeout(timeout)
        props.navigation.navigate('Menu')
    }

    return(
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Text style={styles.text}>Ohisama Games</Text>
            <Logo />
            <Text style={styles.smallText}>by Rap. d. Beat</Text>
            <Text style={styles.smallText}>v. 1.0.4</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 36,
        fontWeight: 'bold'
    },
    smallText: {
        fontSize: 16,
    }
})

CoverPage.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default CoverPage