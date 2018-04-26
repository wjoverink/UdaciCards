import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import reducers from './reducers'
import { blue, white } from './utils/colors'
import Decks from './components/Decks'
import NewDeck from './components/AddDeck'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import thunk from 'redux-thunk'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { setLocalNotification } from './utils/helpers'

function CardsStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    },
  },
  NewDecks: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? blue : white,
    labelStyle: {
      fontSize: 16,
      fontWeight: 'bold'
    },
    style: {
      
      backgroundColor: Platform.OS === 'ios' ? white : blue,
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  EntryDetail: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      },
    }
  },
  AddCard: {   
    screen: AddCard,
    navigationOptions: {
      title:"Add card",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      },
    }
  },
  Quiz: {   
    screen: Quiz,
    navigationOptions: {
      title:"Quiz",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      },
    }
  }
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducers, applyMiddleware(thunk))}>
        <View style={{flex: 1}}>
          <CardsStatusBar backgroundColor={blue} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
