import { LOAD_DECKS, ADD_DECK, ADD_CARD, UPDATE_DECK, DELETE_CARD, DELETE_DECK } from '../actions'

function entries(state = {}, action) {
  switch (action.type) {
    case LOAD_DECKS:
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK:
      return {
        ...state,
        [action.deckTitle]: {
          title: action.deckTitle,
          questions: []
        }
      }
    case UPDATE_DECK:
      var newState = {
        ...state
      }
      delete newState[action.deckTitle]
      newState[action.card.title] = {
        ...action.card
      }
      return newState
    case ADD_CARD:
      return {
        ...state,
        [action.deckTitle]: {
          ...state[action.deckTitle],
          questions: [
            ...state[action.deckTitle].questions,
            action.card
          ]
        }
      }
    case DELETE_CARD:
      return {
        ...state,
        [action.deckTitle]: {
          ...state[action.deckTitle],
          questions: [
            ...state[action.deckTitle].questions.filter(x => x.question !== action.question),
          ]
        }
      }
    case DELETE_DECK:
      var newState = {
        ...state
      }
      delete newState[action.deckTitle]
      return newState
    default:
      return state
  }
}

export default entries
