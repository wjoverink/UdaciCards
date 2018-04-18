import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {loadDecks} from '../actions'
import {getDecks} from '../utils/api'
import { connect } from 'react-redux'
import { AppLoading} from 'expo'
import LoadingControl from './Loading'

/**
* @description Represents the Decks view
* @constructor
*/
class Decks extends Component {
  state = {
    ready: false,
  }


  componentDidMount () {
    const { loadDecks } = this.props
    //getDecks().then((decks) => loadDecks(decks)).then(() => this.setState(() => ({ready: true})))
  }

  render() {
    const { entries } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <LoadingControl />
    }
    return (
      <View>
        <Text>Decks view </Text>
      </View>
    )
  }
}

function mapStateToProps(decks) {
  return {decks}
}

export default connect(mapStateToProps, {
  loadDecks
})(Decks)
