import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList,TouchableOpacity } from 'react-native'
import {loadDecks} from '../actions'
import {getDecks} from '../utils/api'
import { connect } from 'react-redux'
import { AppLoading} from 'expo'
import LoadingControl from './Loading'
import { white } from '../utils/colors'
import { SearchBar, Card } from 'react-native-elements'

/**
* @description Represents the Decks view
* @constructor
*/
class Decks extends Component {
  state = {
    ready: false,
  }

  handleRefresh = () => {
    this.setState({ready: false})
    this.props.loadDecks()
  }

  componentWillReceiveProps(props){
    if (props.decks){
      this.setState({ready: true})
    } 
  }

  // getDerivedStateFromProps(nextProps, prevState){
  //   console.log("getDerivedStateFromProps")
  //   if (nextProps.decks){
  //     return {
  //       ready:true
  //     }
  //   }
  // }

  componentDidMount () {
    this.props.loadDecks()
  }

  renderHeader = ({item}) => {
    return <SearchBar containerStyle={styles.searchBar} lightTheme placeholder='Type Here...'/>;
  };

  renderItem = ({item}) => {
    return    <TouchableOpacity>
        <Card containerStyle={styles.cardContainer} title={item.title}>
          <Text  style={styles.cardText}>
            {item.questions.length} cards
          </Text>
        </Card>
      </TouchableOpacity>;
  };

  render() {
    const { decks } = this.props
    const { ready } = this.state
    const listDecks = Object.values(decks)
    // if (ready === false) {
    //   return <LoadingControl />
    // }
    return (
        <FlatList
          style={styles.container}
          data={listDecks}
          ListHeaderComponent={this.renderHeader}
          renderItem={this.renderItem}
          refreshing={!ready}
          onRefresh={this.handleRefresh}
          stickyHeaderIndices={[0]}
        />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 0,
    margin:0
  },
  cardContainer: {
    margin:9
  },
  searchBar: {
    backgroundColor: white,    
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  },
  cardText: {
    textAlign: "center",
  }
});

function mapStateToProps(decks) {
  return {decks}
}

export default connect(mapStateToProps, {
  loadDecks
})(Decks)
