import React, { Component } from 'react'
import MyText from './controls/MyText'
import FlipCard from './FlipCard'
import { Text, StyleSheet,  View, TextInput, Button,KeyboardAvoidingView , TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addCard} from '../actions'
import { white, gray, red, green } from '../utils/colors'

/**
* @description Represents the Decks view
* @constructor
*/
class Quiz extends Component {
  state = {
    index:1
  }



  render() {
    const {index} = this.state
    const {deck} = this.props
    const card = deck.questions[index]
    return (      
      <View style={styles.container}>
       
        <MyText>{index}/{deck.questions.length}</MyText>
        <FlipCard question={card.question} answer={card.answer}></FlipCard>
        <Button color={green} title="Correct"/>
        <Button color={red} title="Incorrect"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding:20,
  }
})

function mapStateToProps (state, { navigation }) {
  const { deckTitle } = navigation.state.params
  return {
    deckTitle,
    deck: state[deckTitle],
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  const { deckTitle } = navigation.state.params
  return {
    goBack: () => navigation.goBack(),
  }
}
// export default AddCard

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quiz)

