import React, { Component } from 'react'
import { white, gray } from '../utils/colors'
import { View, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import MyText from './controls/MyText'
import { addDeck } from '../actions'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { loadDecks } from '../actions'
import MyButton from './controls/MyButton'
import PropTypes from 'prop-types'

/**
* @description Represents the Decks view
* @constructor
*/
class NewDeck extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    decks: PropTypes.object.isRequired,
  }

  state = {
    title: '',
  }

  pressedSave = () => {
    this.props.addDeck(this.state.title)
    this.setState({ title: '' })
    this.props.navigation.dispatch(NavigationActions.back({ key: 'NewDecks' }))
  }

  onTextChanged = (title) => {
    this.setState({ title })
  }

  componentDidMount() {
    this.props.loadDecks()
  }

  render() {
    const { title } = this.state
    const { decks } = this.props

    const errorMessage = Object.values(decks).filter(item =>
      item.title.toLowerCase() === title.toLowerCase()
    ).length > 0 ? "Title already exists" : ""

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <MyText h1>Add a deck</MyText>
        <View>
          <TextInput
            style={{ fontSize: 16, color: gray }}
            autoFocus={true}
            onChangeText={this.onTextChanged}
            value={title}
            underlineColorAndroid={'transparent'}
            editable
            placeholder={"What is the title of your new deck?"}
            maxLength={40} />
        </View>
        <MyText error>{errorMessage}</MyText>
        <View style={styles.saveButtonView}>
          <MyButton
            disabled={errorMessage !== "" || title === ""}
            onPress={this.pressedSave}
            title="Save" />
        </View>
      </KeyboardAvoidingView >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20,
  },
  saveButtonView: {
    alignItems: 'center',
    paddingTop: 40
  }
})

function mapStateToProps(decks) {
  return { decks }
}

export default connect(mapStateToProps, {
  addDeck,
  loadDecks
})(NewDeck)

