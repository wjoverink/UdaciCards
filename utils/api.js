import { AsyncStorage } from 'react-native'
import { formatCalendarResults, FLASHCARDS_STORAGE_KEY } from './_udacicards'

export function fetchCalendarResults () {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(formatCardsResults)
}

export function submitEntry ({ entry, key }) {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}

export function removeEntry (key) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
    })
}