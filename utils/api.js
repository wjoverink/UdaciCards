import { AsyncStorage } from 'react-native'
export const FLASHCARDS_STORAGE_KEY = 'UdaciCards:Cards'

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
    console.log("api.parseDecks")
    return (results) ? JSON.parse(results) : setDummyData()
}

function saveDecks(decks) {
    console.log("api.saveDecks")
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
}

export function clearDecks() {
    console.log("api.clearDecks")
    AsyncStorage.clear()
}

export function getDecksWithoutStorage() {
    console.log("api.getDecks")
    return new Promise((resolve, reject) => resolve(setDummyData()))
}

export function getDecks() {
    console.log("api.getDecks")
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(parseDecks)

}

export function getDeck(deckTitle) {
    getDecks().then((decks) => {
        decks[deckTitle]
    })
}

export function removeDeck(deckTitle) {
    getDecks().then((decks) => {
        delete decks[deckTitle]
        saveDecks(decks)
    })
}

export function updateDeckTitle(deckTitle, deck) {
    getDecks().then((decks) => {
        if (decks[deckTitle]) {
            delete decks[deckTitle]
            decks[newDeckTitle] = deck
            saveDecks(decks)
        }
    })
}


export function saveDeckTitle(deckTitle) {
    getDecks().then((decks) => {
        if (!decks[deckTitle]) {
            decks[deckTitle] = {
                title: deckTitle,
                questions: []
            }
            saveDecks(decks)
        }
    })
}


export function addCardToDeck(deckTitle, { question, answer }) {
    getDecks().then((decks) => {
        if (decks[deckTitle] && decks[deckTitle]['questions']) {
            decks[deckTitle]['questions'].push({ question, answer })
        }
        saveDecks(decks)
    })
}

export function removeCard(deckTitle, question) {
    getDecks().then((decks) => {
        if (decks[deckTitle] && decks[deckTitle]['questions']) {
            decks[deckTitle]['questions'] = {
                ...decks[deckTitle]['questions'].filter(x => x.question !== question)
            }
        }
        saveDecks(decks)
    })
}
