import { AsyncStorage } from 'react-native'
export const FLASHCARDS_STORAGE_KEY = 'UdaciCards:flashcards'

function setDummyData() {
    const dummies = {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        }

    }

    saveDecks(dummies)
    return dummies
}

function parseDecks(results) {
    return (results) ? JSON.parse(results) : setDummyData()
}

function saveDecks(decks) {
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
}

export function getDecks() {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(parseDecks)
}

export function getDeck(id) {
   //TODO
}

export function removeDeck(id) {
    //TODO
}

export function saveDeckTitle(deckTitle) {
    //TODO
    saveDecks(getDecks())
}


export function addCardToDeck(deckTitle, { question, answer }) {
    //TODO
}

export function removeCard(id) {
    //TODO
}
