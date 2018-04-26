import * as Api from '../utils/api';

export const LOAD_DECKS = 'LOAD_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export const loadDecks = () => dispatch => {
    console.log("loadDecks")
    Api.getDecks().then(payload => {
      console.log("getDecks")
      dispatch({type: LOAD_DECKS, decks: payload})
    })
  }

export function addDeck (deckTitle) {
  return {
    type: ADD_DECK,
    deckTitle,
  }
}

export function addCard (deckTitle, card) {
  console.log("addCard", deckTitle, card)
    return {
      type: ADD_CARD,
      deckTitle,
      card
    }
  }
