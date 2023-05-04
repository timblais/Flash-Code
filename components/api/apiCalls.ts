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
  } catch (err) {
    console.log(err)
  }
}
