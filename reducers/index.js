import { LOAD_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function entries (state = {}, action) {
  switch (action.type) {
    case LOAD_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK :
      return {
        ...state,
        [action.deckTitle] :{
            title: action.deckTitle,
            questions: []
        }
      }
    case ADD_CARD :
      return {
        ...state,
       
      }
    default :
      return state
  }
}

export default entries
