import { AsyncStorage } from 'react-native'
export const FLASHCARDS_STORAGE_KEY = 'UdaciCards:flashcards'

function setDummyData () {
  
    let dummyData = {}
    
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(dummyData))
  
    return dummyData
  }

export function formatCardsResults (results) {
    return results === null
      ? setDummyData()
      : results
  }
  