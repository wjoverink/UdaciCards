import React, {Component} from 'react'
import { white, black } from '../utils/colors'
import { View, Text, StyleSheet,  TextInput, Button,KeyboardAvoidingView , TouchableOpacity } from 'react-native'
import { FormLabel, Input, } from 'react-native-elements'
import MyText from './MyText'
import { addDeck } from '../actions'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { loadDecks } from '../actions'

/**
* @description Represents the Decks view
* @constructor
*/
class NewDeck extends Component { 
  pressedSave = () => {
    console.log("pressedSave")

    this.props.addDeck(this.state.title)
    this.setState({ title: '' })
    this.props.navigation.dispatch(NavigationActions.back({key: 'NewDecks'}))
  }

  state = {
    title:'',

  }

  onTextChanged = (title) =>{
    this.setState({title})
  }

  componentDidMount () {
    this.props.loadDecks()
  }

  render() {
    const vals = Object.values(this.props.decks)
    const {title} = this.state
    const errorMessage = Object.values(this.props.decks).filter(item=> 
      item.title.toLowerCase() === this.state.title.toLowerCase()
      ).length>0 ? "Title already exists" : ""
       
     return (
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <MyText h1>Add a deck</MyText>
        <MyText>What is the title of your new deck?</MyText>
        <TextInput 
            autoFocus={true} 
            onChangeText={this.onTextChanged}
            value={title}
            underlineColorAndroid={'transparent'}
            editable 
            maxLength={40} />
        <View style={styles.saveButtonView}> 
          <MyText error>{errorMessage}</MyText>
          <Button disabled={errorMessage!=="" || title===""} onPress={this.pressedSave} title="Save"/>
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
  addDeck,
  loadDecks
})(NewDeck)

