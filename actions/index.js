import * as Api from '../utils/api';

export const LOAD_DECKS = 'LOAD_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const UPDATE_DECK = 'UPDATE_DECK'
export const DELETE_CARD = 'DELETE_CARD'
export const DELETE_DECK = 'DELETE_DECK'


export const loadDecks = () => dispatch => {
  Api.getDecks().then(payload => {
    console.log("getDecks")
    dispatch({ type: LOAD_DECKS, decks: payload })
  })
}

export function addDeck(deckTitle) {
  Api.saveDeckTitle(deckTitle)
  return {
    type: ADD_DECK,
    deckTitle,
  }
}

export function updateDeck(deckTitle, card) {
  Api.updateDeckTitle(deckTitle,card)
  return {
    type: UPDATE_DECK,
    deckTitle,
    card
  }
}

export function deleteCard(deckTitle, question) {
  Api.removeCard(deckTitle,question)
  return {
    type: DELETE_CARD,
    deckTitle,
    question
  }
}

export function deleteDeck(deckTitle) {
  Api.removeDeck(deckTitle)
  return {
    type: DELETE_DECK,
    deckTitle,
  }
}

export function addCard(deckTitle, card) {
  Api.addCardToDeck(deckTitle, card)
  return {
    type: ADD_CARD,
    deckTitle,
    card
  }
}
