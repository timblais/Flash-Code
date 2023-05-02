import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { getUserDecks } from "../../api/apiCalls"
import DeckHomePreview from "./DeckHomePreview"
import NewDeck from "./NewDeck"

const UserDecksHome = () => {
  const session = useSession()
  const user = session.data?.user.id || "no user"
  const [returnedDecks, setReturnedDecks] = useState([])
  const [fetchDecks, setFetchDecks] = useState(0)
  const decks = []

  // Callback for use in child newDeck form to refresh after submit
  function refreshDecks() {
    console.log("Refresh callback triggered")
    setFetchDecks(fetchDecks + 1)
  }

  // fetch decks from db
  useEffect(() => {
    const getdbDecks = async (user: string) => {
      const dbDecks = await getUserDecks(user)
      setReturnedDecks(dbDecks)
    }
    getdbDecks(user)
  }, [user, fetchDecks])

  // iterate over array of decks and push preview components to array decks
  if (returnedDecks) {
    for (const deck of returnedDecks) {
      decks.push(
        <DeckHomePreview
          deckId={deck["_id"]}
          deckName={deck["title"]}
          totalCards={deck["totalCards"]}
          language={deck["language"]}
        />
      )
    }
  }

  return (
    <section>
      <NewDeck deckRefresh={refreshDecks} />
      {decks}
    </section>
  )
}

export default UserDecksHome
