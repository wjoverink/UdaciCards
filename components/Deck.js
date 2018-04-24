import React, { Component } from 'react'
import { View, Text, StyleSheet,Button  } from 'react-native'
import { connect } from 'react-redux'
import MyText from './MyText'
import { white } from '../utils/colors'

class Deck extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deckTitle } = navigation.state.params    
        return {
          title: `${deckTitle}`
        }
      }

    addCardPressed = () => {
        this.props.navigation.navigate('AddCard', {deckTitle: this.props.title})
    }

    startQuizPressed = () => {
        this.props.navigation.navigate('Quiz', {deckTitle: this.props.title})
    }

    render() {
        const {deckTitle, deck} = this.props;
        
        return  <View style={styles.container}>
                    <MyText h1>{deckTitle}</MyText>
                    <MyText>{deck.questions.length} cards</MyText>
                    <Button onPress={this.addCardPressed} title={"Add Card"}></Button>
                    <Button onPress={this.startQuizPressed} title={"Start Quiz"}></Button>
                </View>
    }   
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: white,
      padding:20,
      alignItems: "center"
    },
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
      remove: () => dispatch(),
      getCard: () => dispatch(), //TODO: needed?
      goBack: () => navigation.goBack(),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Deck)

