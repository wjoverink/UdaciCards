import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MyText from './MyText'

/**
* @description Represents the Decks view
* @constructor
*/
class Quiz extends Component {
  render() {
    return (
      <View>
        <MyText h1>Quiz</MyText>
      </View>
    )
  }
}

export default Quiz
