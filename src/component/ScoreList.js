import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import ScoreItem from './ScoreItem'
import { connect } from 'react-redux'
import { getScoresFromApi } from '../reducer/scoresReducer'

const ItemSeparator = () => <View style={styles.separator} />

const renderItem = ({ item, index }) => (
    <ScoreItem data={item} rank={index}/>
)


const ScoreList = (props) => {
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        props.getScoresFromApi(props.game)
        setLoading(false)
    }, [])

    if (isLoading) {
        return (
            <Text>Loading...</Text>
        )
    } else {
        return (
            <FlatList
                data={props.scores}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        )
    }
}

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
})


const mapStateToProps = (state) => {
	return {
        scores: state.scores
    }
}

const mapDispatchToProps = {
    getScoresFromApi
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreList)