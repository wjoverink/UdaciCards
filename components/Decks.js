import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
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

  componentWillReceiveProps(props){
    if (props.decks){
      this.setState({ready: true})
    } 
  }

  componentDidMount () {
    this.props.loadDecks()
  }

  render() {
    const { entrie,decks } = this.props
    const { ready } = this.state

    const listDecks = Object.values(decks)
    if (ready === false) {
      return <LoadingControl />
    }
    return (
      <View>
        <Text>Decks view </Text>
        <FlatList
          data={listDecks}
          renderItem={({item}) => <Text>{item.title}</Text>}
        />
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
