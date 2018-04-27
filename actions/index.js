import * as Api from '../utils/api';

export const LOAD_DECKS = 'LOAD_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const UPDATE_DECK = 'UPDATE_DECK'


export const loadDecks = () => dispatch => {
  console.log("loadDecks")
    Api.getDecksWithoutStorage().then(payload => {
      console.log("getDecks")
      dispatch({type: LOAD_DECKS, decks: payload})
    })
  }

export function addDeck (deckTitle) {
  //TODO:API CALL
  return {
    type: ADD_DECK,
    deckTitle,
  }
}

export function updateDeck (deckTitle, card) {
  //TODO:API CALL
  return {
    type: UPDATE_DECK,
    deckTitle,
    card
  }
}

export function addCard (deckTitle, card) {
  console.log("addCard", deckTitle, card)
  //TODO:API CALL
    return {
      type: ADD_CARD,
      deckTitle,
      card
    }
  }
