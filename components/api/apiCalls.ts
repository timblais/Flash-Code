export const getUserDecks = async (user: string) => {
  console.log("getUserDecks called")
  try {
    const response = await fetch(
      `http://localhost:3000/api/decks/byuser/${user}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
    const data = await response.json()
    return data["decks"]
  } catch (error) {
    console.log(error)
  }
}

export const createNewDeck = async (
  user: string,
  deckTitle: string,
  language: string
) => {
  try {
    const response = await fetch("http://localhost:3000/api/decks", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        deckTitle: deckTitle,
        language: language,
        user: user,
      }),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getSingleDeck = async (deck: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/decks/viewdeck/${deck}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
    const data = await response.json()
    return data
  } catch (error) {}
}

export const createNewCard = async (
  user: string,
  cardTitle: string,
  deck: string,
  question: string,
  answer: string,
  language: string
) => {
  try {
    const response = await fetch("http://localhost:3000/api/cards", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        user: user,
        cardTitle: cardTitle,
        deckId: deck,
        question: question,
        answer: answer,
        language: language,
      }),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
