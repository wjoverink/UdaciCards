import React, { Component } from 'react'
import { View, StyleSheet, } from 'react-native'
import { connect } from 'react-redux'
import MyText from './controls/MyText'
import { white } from '../utils/colors'
import MyButton from './controls/MyButton'
import {clearLocalNotification, setLocalNotification} from '../utils/helpers'

class Deck extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deckTitle } = navigation.state.params
        return {
            title: `${deckTitle}`
        }
    }

    addCardPressed = () => {
        this.props.navigation.navigate('AddCard', { deckTitle: this.props.deckTitle })
    }

    startQuizPressed = () => {
        clearLocalNotification().then(setLocalNotification)
        this.props.navigation.navigate('Quiz', { deckTitle: this.props.deckTitle })
    }

    render() {
        const { deckTitle, deck } = this.props;

        return <View style={styles.container}>
            <View style={[styles.container, { justifyContent: "center" }]}>
                <MyText h1>{deckTitle}</MyText>
                <MyText>{deck.questions.length} cards</MyText>
            </View>
            <MyButton invert onPress={this.addCardPressed} title={"Add Card"}></MyButton>
            <MyButton onPress={this.startQuizPressed} title={"Start Quiz"}></MyButton>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 20,
        alignItems: "center"
    },
})


function mapStateToProps(state, { navigation }) {
    const { deckTitle } = navigation.state.params

    return {
        deckTitle,
        deck: state[deckTitle],
    }
}

function mapDispatchToProps(dispatch, { navigation }) {
    const { deckTitle } = navigation.state.params

    return {
        remove: () => dispatch(),
        getCard: () => dispatch(), //TODO: needed?
        goBack: () => navigation.goBack(),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Deck)

