import React, {Component} from 'react'
import { white, black } from '../utils/colors'
import { View, Text, StyleSheet,  TextInput, Button,KeyboardAvoidingView  } from 'react-native'
import { FormLabel, FormInput, } from 'react-native-elements'
import MyText from './MyText'
import { addDeck } from '../actions'
import { connect } from 'react-redux'

/**
* @description Represents the Decks view
* @constructor
*/
class NewDeck extends Component { 
  pressedSave = () => {
    console.log(this.deckTitle.text)
    // this.props.addDeck(this.deckTitle.value)
  }

  componentDidMount () {
   
  }

  render() {
     return (
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <MyText h1>Add a deck</MyText>
        <MyText>What is the title of your new deck?</MyText>
        <TextInput 
            autoFocus={true} 
            ref={(deckTitle) => {
                this.deckTitle = deckTitle;
            }} 
            underlineColorAndroid={'transparent'}
            editable 
            maxLength={40} />

        <View style={styles.saveButtonView}> 
          <Button onPress={this.pressedSave} title="Save"/>
        </View>
       
      </KeyboardAvoidingView >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding:20,
  },
  saveButtonView:{
    flex: 1,
    paddingBottom:20,
    justifyContent: 'flex-end',
    // position:"absolute",
    // bottom:100,
    // right:20,
  }
})

function mapStateToProps(decks) {
  return { decks }
}

export default connect(mapStateToProps, {
  addDeck
})(NewDeck)

