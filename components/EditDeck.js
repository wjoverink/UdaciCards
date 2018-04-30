import React, { Component } from 'react'
import { View, StyleSheet, Platform, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import MyText from './controls/MyText'
import { white, blue, gray, black, red } from '../utils/colors'
import Button, { IconButton } from './controls/MyButtons'
import PropTypes from 'prop-types'
import { updateDeck, deleteCard, deleteDeck } from '../actions'
import { NavigationActions } from 'react-navigation'
import Swipeout from 'react-native-swipeout';

class EditDeck extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deckTitle } = navigation.state.params
        const onPressed = navigation.state.params.saveCard || function () { }
        return {
            title: `Edit ${deckTitle}`,
            headerRight: <IconButton onPress={onPressed} name='save' iconStyle={{ marginRight: 20 }} />
        }
    }

    state = {
        newDeckTitle: '',
    }

    saveCard = () => {
        this.props.updateDeck(this.props.deckTitle, {
            ...this.props.deck,
            title: this.state.newDeckTitle
        })

        const setParamsAction = NavigationActions.setParams({
            params: { deckTitle: this.state.newDeckTitle },
            key: this.props.navstate.key,
        });
        this.props.navigation.dispatch(setParamsAction);

        this.props.navigation.dispatch(NavigationActions.back())

    }

    onTitleTextChanged = (title) => {
        this.setState({ newDeckTitle: title })
    }


    deleteDeck = () => {
        this.props.deleteDeck(this.props.deckTitle)
        this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Decks' }))
    //    this.props.navigation.navigate(
    //         'Decks',
    //       )
    }

    deleteCard = (index) => {
        this.props.deleteCard(this.props.deckTitle, this.props.deck.questions[index].question)
    }


    renderItem = ({ item, index }) => {
        let swipeBtns = [{
            text: 'Delete',
            backgroundColor: '#f44336',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => { this.deleteCard(index) }
        },
            // {
            //     text: 'Edit',
            //     backgroundColor: '#2196f3',
            //     underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            //     onPress: () => { this.editCard(index) }
            // }
        ]
        return <Swipeout style={styles.renderItemBorder} right={swipeBtns}
            autoClose={true}
            backgroundColor='transparent'>
            <TouchableHighlight>
                <View style={styles.renderItem}>
                    <View style={{ flex: 1 }}>
                        <MyText style={{ color: black }}>Q: {item.question}</MyText>
                        <MyText style={{ color: black }}>A: {item.answer}</MyText>
                    </View>
                </View>
            </TouchableHighlight>
        </Swipeout>


    }

    componentDidMount() {
        //WORKAROUND: somehow componentWillReceiveProps doesn't work with react-navigation
        if (this.props.deckTitle && this.props.deck) {
            this.setState({ newDeckTitle: this.props.deckTitle, deck: this.props.deck })
        }
        this.props.navigation.setParams({ saveCard: this.saveCard });
    }

    render() {
        const { deckTitle, deck } = this.props
        const { updatedState, newDeckTitle } = this.state
        const questions = deck && deck.questions ? deck.questions : []

        return <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
            <MyText h2>Deck name:</MyText>
            <TextInput
                style={{ fontSize: 16, color: gray }}
                onChangeText={this.onTitleTextChanged}
                value={newDeckTitle}
                underlineColorAndroid={'transparent'}
                editable
                placeholder={"What is the title of your new deck?"}
                maxLength={40} />

            {questions.length !== 0 && (
                <MyText style={{ marginTop: 20 }} h2>Questions and answers:</MyText>
            )}

            <FlatList
                style={{ flex: 1 }}
                data={questions}
                renderItem={this.renderItem}
            />
            <View style={{ alignItems: 'center' }}>
                <Button
                    disabled={newDeckTitle === ""}
                    title="Delete Deck"
                    color={red}
                    onPress={this.deleteDeck} />
                {/* <Button
                    disabled={newDeckTitle === ""}
                    title="Save"
                    onPress={this.saveCard} /> */}
            </View>
        </KeyboardAvoidingView >
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 20,
    },
    renderItem: {
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 2,
        paddingBottom: 10,
    },
    renderItemBorder: {
        borderColor: gray,
        borderBottomWidth: 1
    },
    iconButton: {
        paddingLeft: 8,
        alignSelf: "center",
        justifyContent: "center"
    }
})

function mapStateToProps(state, { navigation }) {
    const { deckTitle, navstate } = navigation.state.params
    return {
        deckTitle,
        deck: state[deckTitle],
        navstate
    }
}

export default connect(
    mapStateToProps, { updateDeck, deleteCard, deleteDeck }
)(EditDeck)

