import React, { Component } from 'react'
import { Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { View } from 'react-native-animatable';
import { loadDecks } from '../actions'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import LoadingControl from './Loading'
import { white } from '../utils/colors'
import { SearchBar, Card } from 'react-native-elements'
import MyText from './MyText'
import ListCard from './ListCard'

/**
* @description Represents the Decks view
* @constructor
*/
class Decks extends Component {
  state = {
    ready: false,
  }

  handleRefresh = () => {
    this.setState({ ready: false })
    this.props.loadDecks()
  }

  componentWillReceiveProps(props) {
    if (props.decks) {
      this.setState({ ready: true })
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

  componentDidMount() {
    this.props.loadDecks()
  }

  renderHeader = ({ item }) => {
    return <SearchBar
            inputStyle={styles.searchBarInput}  
            containerStyle={styles.searchBar} 
            lightTheme 
            placeholder='Type Here...' />;
  };

  renderItem = ({item,index}) => {
    return <ListCard title={item.title} questions={item.questions.length} delay={index*30}></ListCard>;
  };

  render() {
    const { decks } = this.props
    const listDecks = Object.values(decks)
    const { ready } = this.state

    return (
      <View style={[styles.container, styles.viewContainer]}>
        <FlatList
          style={[styles.container]}
          data={listDecks}
          ListHeaderComponent={this.renderHeader}
          renderItem={this.renderItem}
          refreshing={!ready}
          onRefresh={this.handleRefresh}
          stickyHeaderIndices={[0]}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  viewContainer: {
    padding: 11,
  },
  searchBar: {
    backgroundColor: white,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  },
  searchBarInput:{
    backgroundColor: white,
    borderWidth:1,
    borderColor:"gray"
  },
});

function mapStateToProps(decks) {
  return { decks }
}

export default connect(mapStateToProps, {
  loadDecks
})(Decks)
