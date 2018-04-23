import * as Api from '../utils/api';

export const LOAD_DECKS = 'LOAD_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'


// export function loadDecks(decks) {
//   return {
//     type: LOAD_DECKS,
//     decks,
//   }
// }

export const loadDecks = () => dispatch => {
  console.log("loadDecks")
  dispatch({type: LOAD_DECKS})
  // console.log("loadDecks")
  //   Api.getDecks().then(payload => {
  //     console.log("getDecks")
  //     dispatch({type: LOAD_DECKS, decks: payload})
  //   })
  }

export function addDeck (deckTitle) {
  return {
    type: ADD_DECK,
    deckTitle,
  }
}

export function addCard (deckTitle, card) {
    return {
      type: ADD_CARD,
      deckTitle,
      card
    }
  }
