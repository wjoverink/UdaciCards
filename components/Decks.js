import React, { Component } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { View } from 'react-native-animatable'
import { loadDecks } from '../actions'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { white } from '../utils/colors'
import { SearchBar } from 'react-native-elements'
import ListCard from './ListCard'
import { Platform } from 'react-native'
import PropTypes from 'prop-types'
import MyText from './controls/MyText'
import { SafeAreaView } from 'react-navigation'
if (Platform.OS === 'android') {
  SafeAreaView.setStatusBarHeight(0);
}


/**
* @description Represents the Decks view
* @constructor
*/
class Decks extends Component {
  static propTypes = {
    decks: PropTypes.object.isRequired,
    navigation:  PropTypes.object.isRequired,
  }

  state = {
    ready: false,
    searchText :''
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

  getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps")
  }

  componentDidMount() {
    this.props.loadDecks()
  }

  searchTextChanged = (text) => {
    this.setState({ searchText: text })
  }

  renderHeader = ({ item }) => {
    return <SearchBar
      onChangeText={this.searchTextChanged}
      inputStyle={styles.searchBarInput}
      containerStyle={styles.searchBar}
      lightTheme
      placeholder='Type Here...' />;
  }

  ListFooterComponent = ({ item }) => {
    return <ListCard title={"Test"} questions={0} />;
  }

  renderItem = ({ item, index }) => {
    return <ListCard
      onPress={this.itemPressed}
      dataItem={item}
      title={item.title}
      style={{ padding: 9 }}
      questions={item.questions.length}
      delay={index * 40}>
    </ListCard>;
  }

  itemPressed = (item) => {
    this.props.navigation.navigate('EntryDetail', { deckTitle: item.title })
  }

  render() {
    const { decks } = this.props
    const { ready, searchText } = this.state

    const  listDecks =  searchText ? Object.values(decks).filter(x => x.title.toLowerCase().includes(searchText.toLowerCase())) : Object.values(decks);
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
        //ListFooterComponent={this.ListFooterComponent}
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
  searchBarInput: {
    backgroundColor: white,
    borderWidth: 1,
    borderColor: "gray"
  },
});

function mapStateToProps(decks) {
  return { decks }
}

export default connect(mapStateToProps, {
  loadDecks
})(Decks)
