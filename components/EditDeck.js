import React, { Component } from 'react'
import { View, StyleSheet, Platform, TouchableOpacity, FlatList, TextInput,KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import MyText from './controls/MyText'
import { white, blue, gray, black } from '../utils/colors'
import Button, { IconButton } from './controls/MyButtons'
import PropTypes from 'prop-types'
import { updateDeck } from '../actions'
import { NavigationActions } from 'react-navigation'

class EditDeck extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deckTitle } = navigation.state.params
        return {
            title: `Edit ${deckTitle}`,
        }
    }

    state = {
        newDeckTitle: '',
        deck: {},
        editQuestion:-1
    }

    saveCard = () => {
        this.props.updateDeck(this.props.deckTitle, {
            ...this.state.deck,
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

    onQuestionTextChanged = (question) => {
        const newQuestions = [...this.state.deck.questions]
        newQuestions[this.state.editQuestion].question = question
        this.setState((prevState) => ({
            deck:{
                ...prevState.deck,
                questions :[
                    ...this.state.deck.questions,
                    [this.state.editQuestion].question = question
                ]
            }
        }))
    }

    onAnswerTextChanged = (answer) => {
        //this.setState({ newDeckTitle: title })
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return nextState.editQuestion !== this.state.editQuestion || nextState.newDeckTitle!==this.state.newDeckTitle;
      }

    renderItem = ({ item, index }) => {
        console.log(this.state.editQuestion)
        if (index === this.state.editQuestion){
            console.log("index === this.state.editQuestion");
            return <View style={styles.renderItem}>
                <View style={{ flex: 1 }}>
                    <TextInput
                        style={{ fontSize: 16, color: gray }}
                        onChangeText={this.onQuestionTextChanged}
                        value={item.question}
                        underlineColorAndroid={'transparent'}
                        editable
                        multiline
                        autoFocus
                        numberOfLines={2}
                        placeholder={"What is the question?"}
                        maxLength={60} />
                    <TextInput
                        style={{ fontSize: 16, color: gray }}
                        onChangeText={this.onAnswerTextChanged}
                        value={item.answer}
                        underlineColorAndroid={'transparent'}
                        editable
                        multiline
                        numberOfLines={2}
                        placeholder={"What is the answer?"}
                        maxLength={60} />
                </View>
                <IconButton
                    style={styles.iconButton}
                    onPress={() => this.setState({ editQuestion: -1 })}
                    color={blue}
                    name='done' />
            </View>
        }
        return  <View style={styles.renderItem}>
                    <View style={{ flex: 1 }}>
                        <MyText style={{color: black}}>Q: {item.question}</MyText>
                        <MyText style={{color: black}}>A: {item.answer}</MyText>
                    </View>
                    <IconButton
                        style={styles.iconButton}
                        onPress={() => this.setState({ editQuestion: index })}
                        color={blue}
                        name='edit' />
                </View>
    }

    componentWillReceiveProps(props) {
        //Doesn't work
        console.log("componentWillReceiveProps")
    }
    getDerivedStateFromProps(nextProps, prevState) {
        console.log("getDerivedStateFromProps")
    }

    componentDidMount() {
        //WORKAROUND: somehow componentWillReceiveProps doesn't work with react-navigation
        if (this.props.deckTitle && this.props.deck) {
            this.setState({ newDeckTitle: this.props.deckTitle, deck: this.props.deck })
        }
    }

    render() {
        const { deckTitle, deck } = this.props
        const { updatedState, newDeckTitle } = this.state
        const questions = deck && deck.questions ? deck.questions : []

        return <View style={styles.container}>
            <MyText h2>Deck name:</MyText>
            <TextInput
                style={{ fontSize: 16, color: gray }}
                onChangeText={this.onTitleTextChanged}
                value={newDeckTitle}
                underlineColorAndroid={'transparent'}
                editable
                placeholder={"What is the title of your new deck?"}
                maxLength={40} />
            {/* </View> */}
            <MyText style={{ marginTop: 20 }} h2>Questions and answers:</MyText>
            <FlatList
                style={{ flex: 1 }}
                data={questions}
                renderItem={this.renderItem}
            />

            <View style={{ alignItems: 'center' }}>
                <Button
                    disabled={newDeckTitle === ""}
                    title="Save"
                    onPress={this.saveCard} />
            </View>
        </View>
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
    mapStateToProps, { updateDeck }
)(EditDeck)

