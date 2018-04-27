import React, { Component } from 'react'
import { View, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import MyText from './controls/MyText'
import { white, blue } from '../utils/colors'
import Button, {IconButton} from './controls/MyButtons'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import PropTypes from 'prop-types'
import { MaterialIcons } from '@expo/vector-icons'

class Deck extends Component {
    static propTypes = {
        deckTitle: PropTypes.string.isRequired,
        deck: PropTypes.object.isRequired,
    }

   

    static navigationOptions = ({ navigation }) => {
        const { deckTitle } = navigation.state.params
        editPressed = () => {
            navigation.navigate('EditDeck', { deckTitle: deckTitle, navstate:navigation.state })
        }
        return {
            title: `${deckTitle}`,
            headerRight: <IconButton onPress={this.editPressed} name='edit' iconStyle={{marginRight:20}}  /> 
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
        const totalQuestions = deck ? deck.questions.length : 0

        return <View style={styles.container}>
            <View style={[styles.container, { justifyContent: "center" }]}>
                <MyText h1>{deckTitle}</MyText>
                <MyText>{totalQuestions} cards</MyText>
            </View>
            <Button invert onPress={this.addCardPressed} title={"Add Card"}></Button>
            <Button disabled={totalQuestions===0} onPress={this.startQuizPressed} title={"Start Quiz"}></Button>
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

