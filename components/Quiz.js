import React, { Component } from 'react'
import MyText from './controls/MyText'
import { View, Text, StyleSheet,  TextInput, Button,KeyboardAvoidingView , TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addCard} from '../actions'
import { white, gray } from '../utils/colors'

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
    return (      
      <View style={styles.container}>
       
        <MyText>{index}/{deck.questions.length}</MyText>
        <MyText h1>{deck.questions[index]}</MyText>

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

