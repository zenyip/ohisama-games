import React, { useState } from 'react';
import { Text, TextInput, TouchableWithoutFeedback, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Formik, useField } from 'formik'
import * as yup from 'yup'
import { summitScoreToServer } from '../reducer/scoresReducer'
import theme from '../theme'

const initialValues = {
    name: ''
}

const PlayerNameForm = ({onSubmit}) => {
    const [nameField, nameMeta, nameHelpers] = useField('name')

    return (
        <View>
            <TextInput
                placeholder="Your name (3-10 chars)"
                value={nameField.value}
                onChangeText={text => nameHelpers.setValue(text)}
                style={styles.textInput}
            />
            <TouchableWithoutFeedback onPress={onSubmit}>
                <Text style={styles.buttonText}> Summit Your Score </Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

const validationSchema = yup.object().shape({
    name: yup.string()
        .min(3, 'At least 3 chars')
        .max(10, 'No more than 10 chars')
        .required('Required')
})

const HighScoreSubmission = (props) => {
    const [summitButtonOn, setSummitButtonOn] = useState(props.summitButtonOn)

    const onSubmit = async (values) => {
        const player = values.name
        const score = props.score
        const game = props.game
        props.summitScoreToServer({player, score, game})
        setSummitButtonOn(false)
    }

    if (summitButtonOn) {
        return (
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ handleSubmit }) => <PlayerNameForm onSubmit={handleSubmit} />}
            </Formik>
        )
    } else {
        return null
    }
}

const styles = StyleSheet.create({
    buttonText: {
        fontSize: theme.fontSize.small,
        fontWeight: "bold",
        color: theme.colours.violet,
        padding: 10
    },
    textInput: {
        fontSize: theme.fontSize.small,
        backgroundColor: theme.colours.backgroundWhite
    }
})

const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = {
    summitScoreToServer
}

export default connect(mapStateToProps, mapDispatchToProps)(HighScoreSubmission)