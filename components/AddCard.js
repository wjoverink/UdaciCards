import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MyText from './MyText'

/**
* @description Represents the Decks view
* @constructor
*/
class AddCard extends Component {
  render() {
    return (
      <View>
        <MyText h1>Add Card</MyText>
      </View>
    )
  }
}

export default AddCard
