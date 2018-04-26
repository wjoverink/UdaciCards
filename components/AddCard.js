import React, { Component } from 'react'
import MyText from './controls/MyText'
import { View, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { white, gray } from '../utils/colors'
import Button from './controls/MyButtons'
import PropTypes from 'prop-types'

/**
* @description Represents the Decks view
* @constructor
*/
class AddCard extends Component {
  static propTypes = {
    deck: PropTypes.object.isRequired,
  }

  state = {
    question: '',
    answer: '',
    saving: false
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return !nextState.saving;
  }

  onTextQuestionChanged = (question) => {
    this.setState({ question })
  }

  onTextAnwserChanged = (answer) => {
    this.setState({ answer })
  }

  saveCard = (answer) => {
    this.setState({ saving: true })
    this.props.addCard({ question, answer } = this.state)
    this.props.goBack()
  }


  render() {
    const { question, answer } = this.state
    const errorMessageQuestion = this.props.deck.questions.filter(item =>
      item.question.toLowerCase() === question.toLowerCase()
    ).length > 0 ? "Title already exists" : ""

    return (
      <View style={styles.container}>
        <TextInput
          autoFocus={true}
          onChangeText={this.onTextQuestionChanged}
          value={question}
          underlineColorAndroid={'transparent'}
          editable
          style={styles.textInput}
          placeholder={"Type a question"}
          maxLength={100} />
        <MyText error>{errorMessageQuestion}</MyText>
        <TextInput
          autoFocus={false}
          onChangeText={this.onTextAnwserChanged}
          value={answer}
          underlineColorAndroid={'transparent'}
          editable
          style={styles.textInput}
          placeholder={"Type an answer"}
          maxLength={100} />
        <View style={[styles.container, { alignItems: 'center' }]}>
          <Button
            disabled={question === "" || answer === "" || errorMessageQuestion !== ""}
            title="Save"
            onPress={this.saveCard} />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20,
  },
  textInput: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: gray,
    height: 50
  }
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
    addCard: (card) =>
      dispatch(addCard(deckTitle, card)),
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCard)

